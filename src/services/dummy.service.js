export default class DummyService {
  constructor({ dummyRepository, dattebayoProxy }) {
    this._repository = dummyRepository;
    this._dattebayoProxy = dattebayoProxy;
  }

  async findAll() {
    const response = await this._dattebayoProxy.findAllClans();
    return response;
  }

  async findById(id) {
    return this._repository.findById(id);
  }

  async create(req) {
    const entry = {
      name: req.name,
      isEnabled: req.isEnabled,
    };

    return this._repository.create(entry);
  }

  async update(id, req) {
    const entry = {
      name: req.name,
      isEnabled: req.isEnabled,
    };

    return this._repository.update(id, entry);
  }

  async delete(id) {
    return this._repository.delete(id);
  }
}
