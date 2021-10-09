const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require("fs");


/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/


router.get('/home', (req,res) => {
  res.sendFile(path.join(__dirname+'/home.html'));
});

/*
- Return all details from user.json file to client as JSON format
*/

router.get('/profile', (req,res) => {
  fs.readFile('user.json', (err, data) => {
    if (err) throw error;
    let student = JSON.parse(data);
    res.send(student)
  });
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

router.get('/login', (req,res) => {
  const { username, password } = req.query;
  const data = fs.readFileSync('user.json');
  const user = JSON.parse(data);
  let get;
  if(user.username == username){
    if(user.password == password){
      get = {status: true, message: "User Is valid"};
    }else{
      get = {status: false, message:"Password is invalid"};
    }
  }else{
    get = {status: false, message:"Username is invalid"};
  }
  res.json(get);
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logout.<b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));