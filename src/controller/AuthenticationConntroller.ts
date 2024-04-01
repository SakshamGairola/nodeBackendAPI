import { Request, Response } from 'express';
import AuthenticationService from '../service/AuthenticationService';

class AuthenticationController {
	// login controller
	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const token = await new AuthenticationService().login(email, password);

			if (token === '') {
				res.send(403).json({
					status: 'Forbidden!',
					message: 'Wrong email or password!',
				});
			}

			return res.status(200).json({
				status: 'OK!',
				message: 'login successful!',
				result: token,
			});
		} catch (error) {
			res.status(500).json({
				status: 'Internal server error!',
				message: `${error}`,
			});
		}
	}

	// register controller
	async register(req: Request, res: Response) {
		try {
			const { name, username, email, password } = req.body;

			await new AuthenticationService().register(name, email, username, password);

			return res.status(200).json({
				status: 'OK!',
				message: 'Successfully registerd users!',
			});
		} catch (error) {
			res.status(500).json({
				status: 'Internal server error!',
				message: `${error}`,
			});
		}
	}
}

export default new AuthenticationController();
