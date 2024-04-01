import express, { Application, Request, Response } from 'express';
import Database from './configuration/DatabaseConfig';
import AuthenticationRouter from './routers/AuthenticationRouter';
class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.dataBaseSync();
    this.plugins();
		this.routes();
	}

	protected routes(): void {
		this.app.route('/').get((req: Request, res: Response) => {
			res.send('welcome');
		});

		this.app.use('/api/v1/auth', AuthenticationRouter);
	}

	protected dataBaseSync(): void {
		const dbCon = new Database();
		dbCon.sequelize?.sync();
	}

  // add plugin
  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}

const port: number = 3000;
const app = new App().app;

app.listen(port, () => {
	console.log(`[server] listening on port ${port}`);
});
