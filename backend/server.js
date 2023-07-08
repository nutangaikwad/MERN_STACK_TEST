const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
var moment = require('moment');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage:storage
})

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mydatabase"
})

//User Signup
app.post('/signup', (req, res) => {
    console.log(req.body)
    const sql = "INSERT INTO users (`name`, `email`, `gender`, `phone`,`password`,`status`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.gender,
        req.body.phone,
        req.body.password,
        req.body.status,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

//User Login
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";

    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        if(err) {
            return res.json('Error');
        } else {
            if(data.length > 0) {
                const id = data[0].id;
                const token = jwt.sign({id}, "jwtSecretKey", {expiresIn:300});
                if(data[0].status == 'deactivate'){
                    return res.json({Login: false});
                }
                return res.json({Login: true, token, data});
            } else {
                return res.json('Failed');
            }
        }
    })
})

//User Profile Pic Upload
app.post('/upload/profile/image', upload.single('image'), (req, res) => {
    const image = req.file.filename;
    const id = req.body.ID
    // changeStatus(id)
const status = 'active'
    // console.log(req.body.ID)
    const sql = `UPDATE users SET profile_pic = ? WHERE id = ?`;
    db.query(sql, [image,id], (err, result) => {
        if(err) return res.json({Message: "Error"});
        return res.json({Status: "Success"});
    })
    const sqlData = `UPDATE users SET status = ? WHERE id = ?`;
    db.query(sqlData, [status,id], (err, result) => {
        if(err) return res.json({Message: "Error"});
        console.log(result)
        // return res.json({Status: "Success"});
    })
})

app.post('/change/password', (req, res) => {
    let id = req.body.id;
    let password = req.body.new_password;
    const sql = "UPDATE users SET password = ? WHERE id = ? ";

    db.query(sql, [password,id], (err, data) => {
        if(err) {
            return res.json('Error');
        } else {
            console.log(data)
            if(data) {
                return res.json('Success');
            } else {
                return res.json('Failed');
            }
        }
    })
})

//Get user information
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if(err) return res.json("Error");
        return res.json(result);
    })
})

app.get('/get/user/:id', (req, res) => {
    let id = req.params.id;
    const sql = `SELECT * FROM users WHERE id =`+ id+ `;`;
    db.query(sql, (err, result) => {
        if(err) return res.json("Error");
        return res.json(result);
    })
})
var users
var totalCount

app.get('/index', (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;

      const {  limit, sort, filter } = req.query;
      const offset = (page - 1) * limit;
      let query = 'SELECT * FROM users';
      let countQuery = 'SELECT * FROM users';
  
      
      if (sort) {
        const [sortField, sortOrder] = sort.split(':');
        query += ` ORDER BY ${sortField} ${sortOrder}`;
      }
  
      if (filter) {
        const [filterField, filterValue] = filter.split(':');
        query += ` WHERE ${filterField} LIKE '%${filterValue}%'`;
        countQuery += ` WHERE ${filterField} LIKE '%${filterValue}%'`;
      }
  
      query += ` LIMIT ${limit} OFFSET ${offset}`;
  
    
    get_info( query, function(result){
        users = result;
     })
     getCount(countQuery,function(result){
        totalCount = result
     })

    let currentPage = page
    let totalPage =  Math.ceil(totalCount?.length / limit)
    res.render('index',{users:users,currentPage:currentPage,totalPages:totalPage,moment: moment }) 

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.listen(8081, () => {
    console.log('Listening');
})


function get_info(query, callback){
    db.query(query, function(err, results){
          if (err){ 
            throw err;
          }
          users = results; 

          return callback(results);
  })
}

function getCount(query, callback){
    db.query(query, function(err, results){
          if (err){ 
            throw err;
          }
        
          totalCount = results; 

          return callback(results);
  })
}

app.post('/upload/profile/image', upload.single('image'), (req, res) => {
    const image = req.file.filename;
    const id = req.body.ID
    // changeStatus(id)
const status = 'active'
    // console.log(req.body.ID)
    const sql = `UPDATE users SET profile_pic = ? WHERE id = ?`;
    db.query(sql, [image,status,id], (err, result) => {
        if(err) return res.json({Message: "Error"});
        return res.json({Status: "Success"});
    })
    const sqlData = `UPDATE users SET status = ? WHERE id = ?`;

    db.query(sqlData, [status,id], (err, result) => {
        if(err) return res.json({Message: "Error"});
        console.log(result)
        // return res.json({Status: "Success"});
    })
})


app.post('/deactivate/profile',(req, res) => {
    // const image = req.file.filename;
    const id = req.body.id
    // changeStatus(id)
    const status = 'deactivate'
    const sqlData = `UPDATE users SET status = ? WHERE id = ?`;
    db.query(sqlData, [status,id], (err, result) => {
        if(err) return res.json({Message: "Error"});
        // console.log(result)
        return res.json({Status: "Success"});
    })
})
