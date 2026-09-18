const KnowledgeChunk = require('../../models/KnowledgeChunk');

/**
 * Calculates cosine similarity between two numeric vectors.
 */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

class VectorStore {
  /**
   * Upsert chunks with embeddings into MongoDB.
   * @param {Array<{documentId: string, content: string, embedding: number[], chunkIndex: number, metadata: Object}>} chunks
   */
  async upsertChunks(chunks) {
    if (!chunks || chunks.length === 0) return [];
    const operations = chunks.map((chunk) => ({
      updateOne: {
        filter: {
          documentId: chunk.documentId,
          chunkIndex: chunk.chunkIndex,
        },
        update: {
          $set: {
            content: chunk.content,
            embedding: chunk.embedding,
            metadata: chunk.metadata || {},
          },
        },
        upsert: true,
      },
    }));

    return await KnowledgeChunk.bulkWrite(operations);
  }

  /**
   * Searches for top-K relevant chunks using vector cosine similarity.
   * Enforces security filtering: only active and public chunks for public requests.
   *
   * @param {Object} options
   * @param {number[]} options.queryEmbedding - Query embedding vector
   * @param {string} [options.queryText] - Raw text for lexical keyword boost
   * @param {number} [options.topK=4] - Max chunks to return
   * @param {number} [options.scoreThreshold=0.35] - Minimum similarity score
   * @param {Object} [options.filter={}] - Metadata filters
   * @returns {Promise<Array<{content: string, score: number, metadata: Object}>>}
   */
  async search({
    queryEmbedding,
    queryText = '',
    topK = 4,
    scoreThreshold = 0.35,
    filter = { 'metadata.isActive': true, 'metadata.visibility': 'public' },
  }) {
    // 1. Fetch candidate chunks matching security filter
    const chunks = await KnowledgeChunk.find(filter)
      .select('content embedding metadata chunkIndex documentId')
      .lean();

    if (!chunks || chunks.length === 0) {
      return [];
    }

    const queryKeywords = (queryText || '')
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const scored = [];

    for (const chunk of chunks) {
      let score = 0;

      // Cosine vector similarity
      if (
        queryEmbedding &&
        queryEmbedding.length > 0 &&
        chunk.embedding &&
        chunk.embedding.length === queryEmbedding.length
      ) {
        score = cosineSimilarity(queryEmbedding, chunk.embedding);
      }

      // Keyword boost
      if (queryKeywords.length > 0 && chunk.content) {
        const lowerContent = chunk.content.toLowerCase();
        let matchCount = 0;
        for (const kw of queryKeywords) {
          if (lowerContent.includes(kw)) {
            matchCount++;
          }
        }
        if (matchCount > 0) {
          const keywordBoost = Math.min(0.25, (matchCount / queryKeywords.length) * 0.25);
          score = score * 0.75 + keywordBoost;
        }
      }

      if (score >= scoreThreshold) {
        scored.push({
          id: chunk._id,
          content: chunk.content,
          score: Math.round(score * 1000) / 1000,
          metadata: chunk.metadata || {},
          chunkIndex: chunk.chunkIndex,
        });
      }
    }

    // Sort descending by score and pick topK
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
  }

  /**
   * Delete all chunks for a given document ID.
   * @param {string} documentId
   */
  async deleteByDocumentId(documentId) {
    return await KnowledgeChunk.deleteMany({ documentId });
  }

  /**
   * Update active status for all chunks of a document.
   * @param {string} documentId
   * @param {boolean} isActive
   */
  async setDocumentChunksActive(documentId, isActive) {
    return await KnowledgeChunk.updateMany(
      { documentId },
      { $set: { 'metadata.isActive': isActive } }
    );
  }
}

module.exports = new VectorStore();
