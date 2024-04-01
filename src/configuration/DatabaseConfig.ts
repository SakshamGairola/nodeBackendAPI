import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Users } from '../models/UsersModel';

dotenv.config();

class Database {
	public sequelize: Sequelize | undefined;

	private POSTGRES_DB = process.env.POSTGRES_DB as string;
	private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
	private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
	private POSTGRES_USERNAME = process.env.POSTGRES_USERNAME as string;
	private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

	constructor() {
		this.connectToPostgreSQL();
	}

	private async connectToPostgreSQL() {
		this.sequelize = new Sequelize({
			database: this.POSTGRES_DB,
			username: this.POSTGRES_USERNAME,
			password: this.POSTGRES_PASSWORD,
			host: this.POSTGRES_HOST,
			port: this.POSTGRES_PORT,
			dialect: 'postgres',
			models: [Users],
			logging: false
		});

		await this.sequelize
			.authenticate()
			.then(() => {
				console.log('PostgreSQL Connection has been established successfully.');
			})
			.catch((err) => {
				console.log('Unable to connect to the PostgreSQL database:', err);
			});
	}
}

export default Database;
