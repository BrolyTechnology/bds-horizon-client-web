export function responseOk(res, data) {
  res.status(200).send({ status: 200, data });
}

export function responseViewOk(res, html) {
  res.status(200).header('Content-Type', 'text/html').send(html);
}

export function responseCreate(res, id) {
  res.status(201).send({ status: 201, data: { id } });
}

export function responseNoContent(res) {
  res.status(204).send({ status: 204 });
}
