import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface Payload {
	userId: number;
	name: string;
	email: string;
	username: string;
}

class Authentication {
	public static hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	public static async checkPassword(password: string, encryptedpassword: string): Promise<boolean> {
		return bcrypt.compare(password, encryptedpassword);
	}

	public static generateToken(id: number, name: string, email: string, username: string): string {
		const secretKey: string = process.env.JWT_SECRET_KEY || 'MY-SECRET-KEY';
		const payload: Payload = {
			userId: id,
			email: email,
			name: name,
			username: username,
		};

		const option = { expiresIn: process.env.JWT_EXPIRES_IN };

		return jwt.sign(payload, secretKey, option);
	}

	public static validateToken(token: string): Payload | null {
		try {
			const secretKey: string = process.env.JWT_SECRET_KEY || 'MY-SECRET-KEY';
			return jwt.verify(token, secretKey) as Payload;
		} catch (err) {
			return null;
		}
	}
}

export default Authentication;
