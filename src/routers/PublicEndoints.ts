import { authMiddleware } from "../middleware/AuthenticationMiddleware";
import BaseRouter from "./BaseRouter";
import publicEnpointsController from "../controller/PublicEnpointsController"

class PublicEndPoints extends BaseRouter{
  routes(): void {
    this.router.get('/entries', publicEnpointsController.entries );
    this.router.get('/random', publicEnpointsController.random );
    this.router.get('/categories', publicEnpointsController.categories );
    this.router.get('/healthCheck', authMiddleware, publicEnpointsController.healthCheck);
  }
  
}

export default new PublicEndPoints().router;