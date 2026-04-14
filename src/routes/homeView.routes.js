import { Router } from 'express';

export default function ({ homeController }) {
  const router = Router();

  router.get('', homeController.viewRender);
  router.get('/resultados-onpe-2026', homeController.resultOnpeRender);

  return router;
}
