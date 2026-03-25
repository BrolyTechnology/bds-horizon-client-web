export function responseOk(res, data) {
  res.status(200).send({ status: 200, data });
}

export function responseCreate(res, id) {
  res.status(201).send({ status: 201, data: { id } });
}

export function responseNoContent(res) {
  res.status(204).send({ status: 204 });
}
