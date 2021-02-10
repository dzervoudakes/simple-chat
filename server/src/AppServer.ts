import express from 'express';
// import cors from 'cors';
import chalk from 'chalk';

class AppServer {
  private app = express();

  constructor() {
    this.setupApp();
  }

  private setupApp(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(cors({ orogin: process.env.CLIENT_ORIGIN || '' }));
  }

  public start(): void {
    const PORT = process.env.PORT || 3000;

    this.app.listen(PORT, () => {
      console.log(chalk.cyan(`Server running on port ${PORT}.`));
    });
  }
}

export default AppServer;
