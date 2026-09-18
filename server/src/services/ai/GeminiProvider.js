const AIProvider = require('./AIProvider');

class GeminiProvider extends AIProvider {
  constructor(options = {}) {
    super();
    this.apiKey = options.apiKey || process.env.GEMINI_API_KEY;
    this.modelName = options.modelName || process.env.GEMINI_MODEL || 'gemini-3.7-flash';
    this.candidateModels = ['gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];
    this.embeddingModel = options.embeddingModel || 'gemini-embedding-001';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
  }

  /**
   * Safe fetch with timeout
   */
  async _fetchWithTimeout(url, options = {}, timeoutMs = 18000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * Generates a conversational response using Google Gemini REST API.
   */
  async generateResponse({
    prompt,
    systemPrompt = '',
    conversationHistory = [],
    temperature = 0.25,
    maxTokens = 300,
  }) {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is not configured on the server.');
    }

    // Format conversation history for Gemini API
    const contents = [];

    // Include recent conversation turns (last 4 for high-speed response)
    const recentHistory = conversationHistory.slice(-4);
    for (const msg of recentHistory) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: prompt }],
    });

    const requestBody = {
      contents,
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
        topP: 0.85,
      },
    };

    if (systemPrompt && systemPrompt.trim()) {
      requestBody.systemInstruction = {
        parts: [{ text: systemPrompt.trim() }],
      };
    }

    const modelsToTry = [this.modelName, ...this.candidateModels.filter((m) => m !== this.modelName)];
    let lastError = null;

    for (const currentModel of modelsToTry) {
      const endpoint = `${this.baseUrl}/${currentModel}:generateContent?key=${this.apiKey}`;
      try {
        const response = await this._fetchWithTimeout(
          endpoint,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
          },
          16000
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errMsg = errorData.error?.message || response.statusText;
          lastError = new Error(`Gemini API error (${response.status}) on ${currentModel}: ${errMsg}`);
          continue; // Try next candidate model
        }

        const data = await response.json();
        const candidate = data.candidates?.[0];
        const text =
          candidate?.content?.parts?.map((p) => p.text).join('') ||
          "I'm here to help with your luxury holiday planning. How may I assist you further?";

        return {
          text: text.trim(),
          usage: data.usageMetadata || {},
        };
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error('All Gemini candidate models failed to generate response');
  }

  /**
   * Generates a vector embedding for a single text chunk.
   */
  async generateEmbeddings(text) {
    if (!this.apiKey) {
      return this._generateDeterministicFallbackEmbedding(text);
    }

    const cleanText = (text || '').trim();
    if (!cleanText) {
      return new Array(768).fill(0);
    }

    const endpoint = `${this.baseUrl}/${this.embeddingModel}:embedContent?key=${this.apiKey}`;
    const requestBody = {
      model: `models/${this.embeddingModel}`,
      content: {
        parts: [{ text: cleanText.slice(0, 4000) }],
      },
    };

    try {
      const response = await this._fetchWithTimeout(
        endpoint,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        },
        10000
      );

      if (!response.ok) {
        // Fallback to deterministic vector if embedding API is unconfigured/rate-limited
        return this._generateDeterministicFallbackEmbedding(cleanText);
      }

      const data = await response.json();
      if (data.embedding?.values && Array.isArray(data.embedding.values)) {
        return data.embedding.values;
      }

      return this._generateDeterministicFallbackEmbedding(cleanText);
    } catch (err) {
      return this._generateDeterministicFallbackEmbedding(cleanText);
    }
  }

  /**
   * Resilient deterministic 768-dim embedding generator
   * Used when network/API quota is unavailable to prevent ingestion or search failures.
   */
  _generateDeterministicFallbackEmbedding(text, dimensions = 768) {
    const vector = new Array(dimensions).fill(0);
    const normalized = text.toLowerCase().replace(/[^\w\s]/g, ' ');
    const tokens = normalized.split(/\s+/).filter(Boolean);

    if (tokens.length === 0) return vector;

    for (let i = 0; i < tokens.length; i++) {
      const word = tokens[i];
      let hash = 0;
      for (let j = 0; j < word.length; j++) {
        hash = (hash << 5) - hash + word.charCodeAt(j);
        hash |= 0;
      }
      const primaryIdx = Math.abs(hash) % dimensions;
      const secondaryIdx = Math.abs(hash * 31) % dimensions;
      vector[primaryIdx] += 1.0;
      vector[secondaryIdx] += 0.5;
    }

    // Normalize vector (L2 norm)
    let sumSq = 0;
    for (let i = 0; i < dimensions; i++) {
      sumSq += vector[i] * vector[i];
    }
    const norm = Math.sqrt(sumSq) || 1;
    for (let i = 0; i < dimensions; i++) {
      vector[i] = vector[i] / norm;
    }

    return vector;
  }
}

module.exports = GeminiProvider;
