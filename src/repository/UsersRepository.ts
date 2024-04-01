import e from 'express';
import { Users } from '../models/UsersModel';

interface IUserRepository {
	save(users: Users): Promise<void>;
	update(users: Users): Promise<void>;
	delete(usersId: number): Promise<void>;
	getById(usersId: Users): Promise<Users>;
	getAll(): Promise<Users[]>;
	findByEmail(email: string): Promise<Users | null>;
}

export class UsersRepo implements IUserRepository {
	async save(users: Users): Promise<void> {
		try {
			await Users.create({
				name: users.name,
				email: users.email,
				username: users.username,
				password: users.password,
			});
		} catch (error) {
			throw new Error('Failed to create a new user');
		}
	}

	async update(users: Users): Promise<void> {
		try {
			//  find existing users
			const new_user = await Users.findOne({
				where: {
					id: users.id,
				},
			});

			if (!new_user) {
				throw new Error('User not found');
			}

			// update
			new_user.name = users.name;
			new_user.username = users.username;
			new_user.password = users.password;
			new_user.email = users.email;

			await new_user.save();
		} catch (error) {
			throw new Error('Failed to update user');
		}
	}

	async delete(usersId: number): Promise<void> {
		try {
			//  find existing users
			const new_users = await Users.findOne({
				where: {
					id: usersId,
				},
			});

			if (!new_users) {
				throw new Error('User not found');
			}

			// delete
			await new_users.destroy();
		} catch (error) {
			throw new Error('Failed to delete users!');
		}
	}

	async getById(usersId: Users): Promise<Users> {
		try {
			//  find existing users
			const user = await Users.findOne({
				where: {
					id: usersId,
				},
			});

			if (!user) {
				throw new Error('User not found');
			}
			// return user
			return user;
		} catch (error) {
			throw new Error('Failed to delete user');
		}
	}

	async getAll(): Promise<Users[]> {
		try {
			return await Users.findAll();
		} catch (error) {
			throw new Error('Failed to feacth all data!');
		}
	}

	async findByEmail(useremail: string): Promise<Users | null> {
		try {
			const new_user = await Users.findOne({
				where: {
					email: useremail,
				},
			});
			// if (!new_user) {
			// 	throw new Error('Users not found!');
			// }
			return new_user;
		} catch (error) {
			console.log(error)
			throw new Error('Failed to fetch data by email!');
		}
	}
}
