import express from 'express';
import bodyParser from 'body-parser';
import childProcess from 'child_process';
import path from 'path';
import logger from './utils/logger'

const app = express();
const port = 6379
const exec = childProcess.execSync;

app.use(bodyParser.json());
app.all('/', (req, res) => {
  try {
    const { ref, repository, pusher } = req.body;
    if (ref === 'refs/heads/master') {
      logger.info(`${pusher.name} pushed to master on ${repository.name} repository`)
      logger.info("Stoping museek service")
      exec('service museek stop');
      if (repository.name === 'server') {
        logger.info("Start build and deploy server...")
        exec(`sh ${path.join(__dirname, '../scripts/build_and_deploy_server.sh')}`)
      }
      if (repository.name === 'client') {
        logger.info("Start build and deploy client...")
        exec(`sh ${path.join(__dirname, '../scripts/build_and_deploy_client.sh')}`)
      }
      logger.info("Starting museek service")
      exec('service museek start')
      logger.info("Everything is done!")
    }
  } catch (error) {
    logger.error(error)
  } finally {
    res.sendStatus(200);
  }

});

app.listen(port, () => console.log(`Webhook listener starts on port ${port}!`));

