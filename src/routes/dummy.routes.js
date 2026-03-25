import { Router } from 'express';

export default function ({ dummyController }) {
  const router = Router();

  router.get('', dummyController.findAll);

  return router;
}
