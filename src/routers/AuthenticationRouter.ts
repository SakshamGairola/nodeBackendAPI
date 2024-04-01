import authenticationController from '../controller/AuthenticationConntroller';
import BaseRouter from './BaseRouter';

class AuthenticationRoutes extends BaseRouter {
	routes(): void {
		this.router.post('/login', authenticationController.login);
		this.router.post('/register', authenticationController.register);
	}
}

export default new AuthenticationRoutes().router;
