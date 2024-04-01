import { authMiddleware } from "../middleware/AuthenticationMiddleware";
import BaseRouter from "./BaseRouter";
import publicEnpointsController from "../controller/PublicEnpointsController"

class PublicEndPoints extends BaseRouter{
  routes(): void {
    this.router.get('/entries', authMiddleware, publicEnpointsController.entries );
    this.router.get('/random', authMiddleware, publicEnpointsController.random );
    this.router.get('/categories', authMiddleware, publicEnpointsController.categories );
    this.router.get('/healthCheck', publicEnpointsController.healthCheck);
  }
  
}

export default new PublicEndPoints().router;