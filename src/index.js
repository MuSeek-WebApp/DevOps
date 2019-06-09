import express from 'express';
import bodyParser from 'body-parser';
import childProcess from 'child_process';
import path from 'path';

const app = express();
const port = 6379
const exec = childProcess.exec;

app.use(bodyParser.json());

app.all('/', (req, res) => {
  try {
    const { ref, repository } = req.body;
    if (ref === 'refs/heads/master') {
      exec('service museek stop');
      if (repository.name === 'server') {
        exec(`sh ${path.join(__dirname, '../scripts/build_and_deploy_server.sh')}`)
      }
      if (repository.name === 'client') {
        exec(`sh ${path.join(__dirname, '../scripts/build_and_deploy_client.sh')}`)
      }
      exec('service museek start')
    }
  } catch (error) {
    console.log(error)
  }

});

app.listen(port, () => console.log(`Webhook listener starts on port ${port}!`));

