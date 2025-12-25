// Minimal in-memory stub to satisfy legacy routes during development.
// Implements the methods used by routes but does not persist data.

class PostModelStub {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  async save() {
    return this;
  }

  async deleteOne() {
    return;
  }

  static async create(data) {
    return new PostModelStub(data);
  }

  static async find() {
    return [];
  }

  static async findById(id) {
    return null;
  }
}

module.exports = PostModelStub;
