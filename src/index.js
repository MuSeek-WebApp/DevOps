import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 6379;

app.use(bodyParser.json());

app.all('/',(req,res)=> {
  console.log(req.body);
  res.sendStatus(200);
});
app.listen(port,() => console.log(`app listens on port ${port}!`));

  