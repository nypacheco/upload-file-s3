import express from 'express';
import fs from 'fs';
import s3fs from 's3fs';
import multiparty from 'connect-multiparty';

let s3fsImpl = new s3fs('testUpload123', {
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
});

let multipartyMiddleware = multiparty();
let router = express.Router();

s3fsImpl.create();

router.use(multipartyMiddleware);

router.post('/upload', (req, res) => {
    let file = req.files.null;
    let stream = fs.createReadStream(file.path);
    return s3fsImpl.writeFile(file.originalFilename, stream).then(() => {
        fs.unlink(file.path, (err) => {
            if(err) {
                console.log(err);
            }
        });
        res.redirect('/');
    });
});

router.post('/destroy', (req, res) => {
    return s3fsImpl.destroy().then(() => {
        console.log('All files within the bucket and bucket are deleted!');
    }, (err) => {
        console.log(err);
    });
});

export default router;