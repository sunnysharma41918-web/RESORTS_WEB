/**
 * Abstract AIProvider interface for LLM operations.
 * Enables switching or plugging alternate AI providers (OpenAI, Claude, Ollama, etc.)
 * without altering business logic or RAG pipeline.
 */
class AIProvider {
  /**
   * Generates a conversational response.
   * @param {Object} options
   * @param {string} options.prompt - Current user message
   * @param {string} [options.systemPrompt] - System instructions
   * @param {Array<{role: string, content: string}>} [options.conversationHistory] - Previous turns
   * @param {number} [options.temperature] - Sampling temperature (0.0 to 1.0)
   * @param {number} [options.maxTokens] - Max output tokens
   * @returns {Promise<{text: string, usage?: Object}>}
   */
  async generateResponse(options) {
    throw new Error('Method generateResponse() must be implemented by AIProvider subclass');
  }

  /**
   * Generates vector embeddings for a given text or array of texts.
   * @param {string|string[]} text - Input text or array of texts
   * @returns {Promise<number[]|number[][]>} Vector embedding array(s)
   */
  async generateEmbeddings(text) {
    throw new Error('Method generateEmbeddings() must be implemented by AIProvider subclass');
  }
}

module.exports = AIProvider;
