import { Request, Response, Router } from "express";
import { config } from '../../config';

// import authRoute from "../../../famwork-auth/api/routes/index";
// import taskRoute from "../../../famwork-task/api/routes/index";
// import userRoute from "../../../famwork-accounts/user/api/routes/index";
// import adminRoute from "../../../famwork-accounts/admin/api/routes/index";

const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req: Request, res: Response) =>
    res.send({ check: 'FamWork server is live!. 📦 🧧 💪🏾' }),
);

// api docs route
router.route('/docs').get((_req: Request, res: Response) => res.redirect(config.apiDocs));

// all route
// router.use("/auth", authRoute);
// router.use("/task", taskRoute);
// router.use("/user", userRoute);
// router.use("/admin", adminRoute);


export default router;
