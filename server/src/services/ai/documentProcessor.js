const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const KnowledgeDocument = require('../../models/KnowledgeDocument');
const KnowledgeChunk = require('../../models/KnowledgeChunk');
const VectorStore = require('./VectorStore');
const GeminiProvider = require('./GeminiProvider');

const gemini = new GeminiProvider();

/**
 * Text extraction router for supported file types.
 */
async function extractTextFromFile(filePath, fileType, rawContent = '') {
  if (fileType === 'manual_text') {
    return rawContent || '';
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at path: ${filePath}`);
  }

  const fileBuffer = fs.readFileSync(filePath);

  switch (fileType.toLowerCase()) {
    case 'pdf': {
      const data = await pdfParse(fileBuffer);
      return data.text || '';
    }
    case 'docx': {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value || '';
    }
    case 'txt': {
      return fileBuffer.toString('utf-8');
    }
    case 'csv': {
      const content = fileBuffer.toString('utf-8');
      const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length === 0) return '';
      const headers = lines[0].split(',').map((h) => h.trim());
      const formattedRows = lines.slice(1).map((line) => {
        const values = line.split(',').map((v) => v.trim());
        return headers.map((h, i) => `${h}: ${values[i] || ''}`).join(' | ');
      });
      return formattedRows.join('\n');
    }
    default:
      return fileBuffer.toString('utf-8');
  }
}

/**
 * Splits sanitized text into overlapping chunks.
 */
function chunkText(text, chunkSize = 600, overlap = 100) {
  const clean = text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[^\x20-\x7E\n\u0900-\u097F]/g, ' ') // Preserves ASCII and Devanagari Hindi
    .trim();

  if (!clean) return [];

  const paragraphs = clean.split(/\n\n+/);
  const chunks = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    const trimmedPara = para.trim();
    if (!trimmedPara) continue;

    if ((currentChunk + '\n\n' + trimmedPara).length <= chunkSize) {
      currentChunk = currentChunk ? currentChunk + '\n\n' + trimmedPara : trimmedPara;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
      }
      // If single paragraph is longer than chunkSize, split it by sentences
      if (trimmedPara.length > chunkSize) {
        let start = 0;
        while (start < trimmedPara.length) {
          let end = start + chunkSize;
          if (end < trimmedPara.length) {
            const lastSpace = trimmedPara.lastIndexOf(' ', end);
            if (lastSpace > start + chunkSize / 2) {
              end = lastSpace;
            }
          }
          chunks.push(trimmedPara.slice(start, end).trim());
          start = end - overlap;
        }
        currentChunk = '';
      } else {
        currentChunk = trimmedPara;
      }
    }
  }

  if (currentChunk && currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter((c) => c.length >= 20);
}

/**
 * Asynchronous background worker to process and embed a KnowledgeDocument.
 */
async function processDocument(documentId) {
  try {
    const doc = await KnowledgeDocument.findById(documentId);
    if (!doc) return;

    doc.status = 'PROCESSING';
    doc.errorMessage = '';
    await doc.save();

    // 1. Extract raw text
    const extractedText = await extractTextFromFile(doc.filePath, doc.fileType, doc.rawContent);

    if (!extractedText || extractedText.trim().length === 0) {
      doc.status = 'FAILED';
      doc.errorMessage = 'Extracted document content is empty.';
      await doc.save();
      return;
    }

    doc.rawContent = extractedText;

    // 2. Chunk text
    const textChunks = chunkText(extractedText);

    if (textChunks.length === 0) {
      doc.status = 'FAILED';
      doc.errorMessage = 'No valid text chunks generated from document.';
      await doc.save();
      return;
    }

    // 3. Remove any previous chunks for this document
    await VectorStore.deleteByDocumentId(doc._id);

    // 4. Generate embeddings and save chunks
    const chunkObjects = [];

    for (let i = 0; i < textChunks.length; i++) {
      const chunkTextContent = textChunks[i];
      let embedding = [];
      try {
        embedding = await gemini.generateEmbeddings(chunkTextContent);
      } catch (embErr) {
        embedding = gemini._generateDeterministicFallbackEmbedding(chunkTextContent);
      }

      chunkObjects.push({
        documentId: doc._id,
        content: chunkTextContent,
        embedding,
        chunkIndex: i,
        metadata: {
          title: doc.title,
          category: doc.category,
          destination: doc.destination,
          visibility: doc.visibility,
          version: doc.version,
          isActive: doc.isActive,
        },
      });
    }

    await VectorStore.upsertChunks(chunkObjects);

    // 5. Mark document as READY
    doc.status = 'READY';
    doc.chunksCount = chunkObjects.length;
    await doc.save();
  } catch (error) {
    console.error(`Error processing document ${documentId}:`, error);
    try {
      await KnowledgeDocument.findByIdAndUpdate(documentId, {
        status: 'FAILED',
        errorMessage: error.message || 'Unknown processing error',
      });
    } catch (updateErr) {
      console.error('Failed to update document status to FAILED:', updateErr);
    }
  }
}

module.exports = {
  extractTextFromFile,
  chunkText,
  processDocument,
};
