const express = require('express');
const expressHBS = require('express-handlebars');
const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
app.set('view engine', '.hbs');
app.engine('.hbs',expressHBS({

    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main'
}));
const upload = multer({
        storage: storage,
        fileFilter(req, file, cb) {
            const isPhoto = file.mimetype;
            console.log(isPhoto)
            if (isPhoto == 'image/jpeg') {
                cb(null, true);
            } else {
                cb('loi file', false);
            }
        },

        limits: {fileSize: 2 * 1024 * 1024}
}).array('photos', 5);

app.get('/', function (req, res){
    res.render('upload');
});

app.post('/photos/upload',function (req ,res,next){

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.send('Kich thuoc file lon hon 2MB');
        } else if (err) {
            return res.send('file khong xac dinh');
        }
        console.log(req.files, req.body)
        res.send("Thanh Cong");
    })
})
app.listen(process.env.PORT || '3000');
