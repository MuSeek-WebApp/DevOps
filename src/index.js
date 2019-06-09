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
    const { ref, repository, pusher } = req.body;
    if (ref === 'refs/heads/master') {
      console.log(`${pusher.name} pushed to master on ${repository.name} repository`)
      console.log("Stoping museek service")
      exec('service museek stop');
      if (repository.name === 'server') {
        console.log("Start build and deploy server...")
        exec(`sh ${path.join(__dirname, '../scripts/build_and_deploy_server.sh')}`)
      }
      if (repository.name === 'client') {
        console.log("Start build and deploy client...")
        exec(`sh ${path.join(__dirname, '../scripts/build_and_deploy_client.sh')}`)
      }
      console.log("Done!")
      exec('service museek start')
    }
  } catch (error) {
    console.log(error)
  } finally {
    res.sendStatus(200);
  }

});

app.listen(port, () => console.log(`Webhook listener starts on port ${port}!`));

