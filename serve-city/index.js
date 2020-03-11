require('dotenv').config()
const express = require('express')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING , SESSION_SECRET,
    S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env
const app = express()
const aws = require('aws-sdk') 
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const carCtrl = require('./controllers/carController')
const cors = require('cors')
app.use(express.json())
app.use(cors())


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 100 * 60 * 60}
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db running')
    app.listen(SERVER_PORT, () => console.log(`server is laying waste to its enemies on ${SERVER_PORT}`))
}).catch(err => console.log(err))

app.get('/api/signs3', (req,res) => {
    aws.config = {
        region: 'us-west-1', 
        accessKeyId:AWS_ACCESS_KEY_ID, 
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }; 
    const s3 = new aws.S3(); 
    const fileName = req.query['file-name']; 
    const fileType = req.query['file-type']; 
    const s3Params = { 
        Bucket: S3_BUCKET,
        Key: fileName, 
        ContentType: fileType, 
        ACL: 'public-read'
    }; 
    s3.getSignedUrl('putObject', s3Params, (err,data)=> { 
        if(err){ 
            console.log(err); 
            return res.end(); 
        }
        const returnData = { 
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        }; 
        return res.send(returnData)
    })
})

// auth endpoints
app.post('/auth/register', authCtrl.register); 
app.post('/auth/login', authCtrl.login); 
app.post('/auth/logout', authCtrl.logout);
app.post('/auth/profile', authCtrl.editProfile); 

// car endpoints
app.post('/api/car', carCtrl.postCar)
app.get('/api/user/cars', carCtrl.getMyCars)
app.post('/api/maintenance', carCtrl.addMaintenance)
app.post('/api/sale', carCtrl.addForSale)
