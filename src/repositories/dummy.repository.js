export default class DummyRepository {
  constructor({ dummyModel }) {
    this._dummyModel = dummyModel;
  }

  async 

  async findById(_id) {
    return this._dummyModel.findOne({ _id });
  }

  async create(input) {
    const result = await this._dummyModel.create(input);
    return { id: result._id };
  }

  async update(_id, input) {
    await this._dummyModel.updateOne({ _id }, input);
  }

  async delete(_id) {
    await this._dummyModel.delete({ _id });
  }
}
