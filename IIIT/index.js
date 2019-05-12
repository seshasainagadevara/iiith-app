/**************developed by seshasai nagadevara- imagtorel@gail.com***** */
/************server*************** */

const express = require('express');
const app = express();
const sqlString = require('sqlstring');
const Server = require('ws').Server;  //Websocket for server
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multerS3 = require('multer-s3'); 
const PORT = process.env.PORT || 5000;
const database = "C6Kadx4H2s", username ="C6Kadx4H2s", password="pN43oL7baX";
const serv = require('http').createServer();
const backend = new Server({server:serv});
const AWS = require('aws-sdk');
const bucketName = 'iiithdb';
const bucketRegion = 'us-east-1';
const IdentityPoolId = 'us-east-1:24c2dd32-1780-479d-bacb-0ffc3754ff27';// authentication using amazon cognito
//connecting to free online mysql database
const connection = mysql.createConnection({
  host: "remotemysql.com",
  port:3306,
  user: username,
  password: password,
  database: database
});



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

//connecton to server
connection.connect((err)=> {
  if (err) {
    return console.error('error: ' + err.message);
  }
  // QUERY TO CREATE TABLE - table created
// connection.query("CREATE TABLE IIITH(id INT AUTO_INCREMENT PRIMARY KEY,"+ 
// "who VARCHAR(255), message VARCHAR(255), timeStamp VARCHAR(255))", (error, resp)=>{
// if(error) throw error;
// console.log("created "+ resp);
// });
  console.log('Connected to the MySQL server');
});


// MAKING CHATBOT- without NLP but with basic maths & regex, arrays
//Small datasets for pattern matching
const greet = ["hi", "hello", "How are you?", "how can i help you?", "What can i do for you?", 
                "What's your name?", "What's your query?" 
             ];
const wishes = ["Good Morning", "Good Afternoon", "Good evening"];
const thank = ["Thank You","ok","See you again"];
const resp = ["Sorry! soon will respond to you", "I'm learning...", "Under crafting"];
serv.on('request', app);
backend.on('connection', (ws)=>{
  //to query the table IIITH
    // connection.query("select * from IIITH",(er,res,fields)=>{
    //   if(er) throw er;
      //console.log(res);
      // console.log(fields);
      
      // const chat = res.map((obj)=>
      //   [{who: obj.who, 
      //   message:obj.message
      //   }]
       
      //   );
        // console.log(chat); 
      //ws.send(chat);
      
    // });
    
  ws.on('message', (message)=>{
       const text = message.toString();
       let qry_data = {
            who: 'client',
            message: text,
            timeStamp: dateTime()
       };
       let sql = query(qry_data);
      //  "INSERT INTO IIITH (who, message, timeStamp) VALUES('client','"+text+"',"+dateTime()+")"
       connection.query(sql,(err, res,fields)=>{
             if(err) throw err;
             console.log("client inserted successfully"+ res);
       });
       const respns = parser(text);
       let qry_resp = {
        who: 'server',
        message: respns,
        timeStamp: dateTime()
       }
       let sql_r = query(qry_resp);
      //  "INSERT INTO IIITH (who, message, timeStamp) VALUES('server',"+respns+","+dateTime()+")"
      connection.query(sql_r,(err, res,fields)=>{
        if(err) throw err;
        console.log("server inserted successfully"+ res);
        console.log(respns);
        ws.send(respns);
      });
       console.log("received" + message);
       

  });
  ws.on('close', ()=>{
    console.log("disconnected");

     
  });
 
});

connection.on("error",()=>{
  connection.end();
});

const query=(qry_data) => sqlString.format('INSERT INTO IIITH SET ?',qry_data );
    
const dateTime = ()=> Date(Date.now()).toString();
const parser=(msg)=>{
  let temp = msg.toString().trim();
  if (/(hi|hello|hey|bot|hii)/ig.test(temp))
  {
        return greet[Math.floor((Math.random()*greet.length))];
  }
  else if(/(Good morning|Good afternoon|Good evening)/ig.test(temp))
  {
      return  wishes[Math.floor((Math.random()*wishes.length))];
  }else if(/(Bye|Thank you|ok|thanks|tnq|thankyou)/ig.test(temp)){
    return  thank[Math.floor((Math.random()*thank.length))];
  }
  else{
    return  resp[Math.floor((Math.random()*resp.length))];
  }
}


serv.listen(PORT, ()=> {

  console.log('App running on port '+ PORT);

});