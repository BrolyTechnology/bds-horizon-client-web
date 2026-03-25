import { responseCreate, responseNoContent, responseOk } from '../utils/reponse.util';

export default class DummyController {
  constructor({ dummyService }) {
    this._service = dummyService;

    this.findAll = this.findAll.bind(this);
  }

  async findAll(req, res) {
    responseOk(res, await this._service.findAll());
  }

  async findById(req, res) {
    const { id } = req.params;
    responseOk(res, await this._service.findById(id));
  }

  async create(req, res) {
    responseCreate(res, await this._service.create(req.body));
  }

  async update(req, res) {
    const { id } = req.params;
    responseNoContent(res, await this._service.update(id, req.body));
  }

  async delete(req, res) {
    const { id } = req.params;
    responseNoContent(res, await this._service.delete(id));
  }
}
