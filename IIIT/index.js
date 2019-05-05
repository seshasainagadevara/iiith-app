/**************developed by seshasai nagadevara- imagtorel@gail.com***** */
/************server*************** */

const express = require('express');
const app = express();
const Server = require('ws').Server;  //Websocket for server
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const multerS3 = require('multer-s3'); 
const PORT = process.env.PORT || 5000;

const serv = require('http').createServer();
const backend = new Server({server:serv});
const AWS = require('aws-sdk');
const bucketName = 'iiithdb';
const bucketRegion = 'us-east-1';
const IdentityPoolId = 'us-east-1:24c2dd32-1780-479d-bacb-0ffc3754ff27';// authentication using amazon cognito
//middle ware
app.use(bodyParser.json());
app.use(cors());
/*******secure way of aws s3 authentication using AWS cognito identity credentials ************/

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});
const s3 = new AWS.S3({
  
  params: {Bucket: bucketName}
});

AWS.config.credentials.get(function(err) {
	if (err) {
		console.log("Error: "+err);
		return;
	}
  // console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
  
});


//********************uploading****************** */

//creating file to uplaod
const upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: bucketName,
      key: function (req, file, cb) {
          console.log(file);
          cb(null,  file.originalname+ "   :" + "Accessed on-"+ Date(Date.now()).toString()); //use Date.now() for unique file keys
      }
  })
});

//used by upload form
app.post('/upload', upload.single('file'), (req, res, next) => {

  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400
    return next(error)
  }
 
   return res.status(200).send(file);
});


//********************Listing********************** */
//Listing all files of bucket
// app.get('/', (req,res)=>{res.send("<h1>hello</h1>")});

app.get('/listall', (req, res) => {
	const params = {
		Bucket: bucketName,
	};

	const keys = [];
	s3.listObjectsV2(params, (err, data) => {
        if (err) {
			console.log(err, err.stack); // an error occurred
			res.send("error -> "+ err);
        } else {
            const contents = data.Contents;
            contents.forEach(function (content) {
                keys.push(content.Key);
      });
      //console.log("keysass",  keys);
    
			res.send(keys);
		}
  });
});
const path = require('path')

// Serve static files from the React frontend app
console.log(__dirname);
app.use(express.static(path.resolve(__dirname, 'clint/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'clint/build', 'index.html'))
})

serv.on('request', app);

backend.on('connection', (ws)=>{
  ws.on('message', (message)=>{
       console.log("received" + message);
       ws.send("IIITH BOT process query soon 👨‍💻");
      
  })
  ws.on('close', ()=>{
    console.log("disconnected");
  })
 
});



serv.listen(PORT, ()=> {

  console.log('App running on port '+ PORT);

});