import { Request, Response, Router } from "express";
import { config } from '../config';

import productRoute from "../../schoolinka-products/api/routes/index";

const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req: Request, res: Response) =>
    res.send({ check: 'E-commerces server is live!. 📦 🧧 💪🏾' }),
);

// api docs route
router.route('/docs').get((_req: Request, res: Response) => res.redirect(config.apiDocs));

// product route
router.use("/product", productRoute)


export default router;
