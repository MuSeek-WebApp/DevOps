import express from 'express';
import path from 'path';

const app = express();
const port = 80
app.use(express.static(path.join(__dirname, '../view')));

app.all('/', (req, res) => {
  res.sendfile(path.join(__dirname, '../view/index.html'));
});

app.listen(port, () => console.log(`maintenance listener starts on port ${port}!`));

