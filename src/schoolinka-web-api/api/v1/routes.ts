import { Request, Response, Router } from "express";
import { config } from '../../config';

import authRoute from "../../../schoolinka-auth/api/routes/index";
// import taskRoute from "../../../schoolinka-post/api/routes/index";
import userRoute from "../../../schoolinka-accounts/user/api/routes/index";
import adminRoute from "../../../schoolinka-accounts/admin/api/routes/index";

const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req: Request, res: Response) =>
    res.send({ check: 'FamWork server is live!. 📦 🧧 💪🏾' }),
);

// api docs route
router.route('/docs').get((_req: Request, res: Response) => res.redirect(config.apiDocs));

// all route
router.use("/auth", authRoute);
// router.use("/task", taskRoute);
router.use("/user", userRoute);
router.use("/admin", adminRoute);


export default router;
