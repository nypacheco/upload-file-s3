import express from 'express';
import test from './routes/test';

let app = express();

app.use('/test', test);

app.get('/', (req, res) => {
    res.send('It\'s a simple test uploading file in S3');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});