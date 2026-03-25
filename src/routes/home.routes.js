import { Router } from 'express';

export default function ({ homeController }) {
  const router = Router();

  router.get('/health', homeController.index);
  router.post('/capture', homeController.captureDataClient);

  return router;
}
