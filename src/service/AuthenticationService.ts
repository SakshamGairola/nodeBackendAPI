import { Users } from '../models/UsersModel';
import { UsersRepo } from '../repository/UsersRepository';
import Authentication from '../util/Authentication';

interface IAuthenticationService {
	login(email: string, password: string): Promise<string>;

	register(name: string, email: string, username: string, password: string): Promise<void>;
}

class AuthenticationService implements IAuthenticationService {
	async login(email: string, password: string): Promise<string> {
		try {
			const userRepo = new UsersRepo();
			const user = await userRepo.findByEmail(email);

			if (!user) {
				throw new Error('User not found');
			}
			// check password
			let isValidPassword = await Authentication.checkPassword(password, user.password);

			// generate token
			if (isValidPassword) {
				const authToken = Authentication.generateToken(user.id, user.name, user.email, user.username);
				return authToken;
			}
			return '';
		} catch (error) {
			throw new Error(`Error occured during login ${error}`);
		}
	}

	async register(name: string, email: string, username: string, password: string): Promise<void> {
		try {
			const userRepo = new UsersRepo();
			const user = await userRepo.findByEmail(email);
			if (user) {
				throw new Error(`User already exists`);
			}

			const hashedPassword = await Authentication.hashPassword(password);
			const new_user = new Users();
			new_user.name = name;
			new_user.email = email;
			new_user.username = username;
			new_user.password = hashedPassword;

			await userRepo.save(new_user);
		} catch (error) {
			throw new Error(`Error occured during registration ${error}`);
		}
	}
}

export default AuthenticationService;
