const express = require('express');
const axios = require('axios');
const app = express()
const port = 6000;
const mysql = require('mysql');

// con.connect((err) => {
//     if(err){
//         console.log(err)
//         console.log('Error connecting to Db');
//         return;
//     }

//     console.log('Connection established');
// });

let users = [
    {
        "user_id": 1,
        "email": "brenden.prieto@yahoo.com",
        "password": "12345"
    },
    {
        "user_id": 2,
        "email": "abc@gmail.com",
        "password": "2344"
    },
    {
        "user_id": 3,
        "email": "zzyzyx@hotmail.com",
        "password": "1111"
    }
];

app.get('/', (req, res) => {
    res.sendFile(__dirname +  '/.index.html');
});

app.get('/db', (req, res) => {
    const con = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PWD,
        database: 'outletprototype_website'
    });

    con.connect((err) => {
        if(err){
            console.log(err)
            console.log('Error connecting to Db');
            return;
        }
    
        console.log('Connection established');
    });

    con.query('SELECT * FROM users limit 20', (err,rows) => {
        if(err) {
            console.log(err)
            return
        };
      
        console.log('Data received from Db:');
        res.send(rows);
    });

    con.end();
});

app.get('/api/test', (req, res) => res.json({hello: true}));

app.get('/api/userLogin/', (req, res) => {
    const usn = req.query.email;
    const pwd = req.query.pwd;

    let user_id = null;
    users.forEach(user => {
        if (user.email === usn && user.password === pwd) {
            user_id = user.user_id;
        }
    });

    if (user_id) {
        res.json({"user_id": user_id});
    } else {
        res.status(400).json({"message": "User Not Found"});
    }
});

app.get("/api/homes", (req, res) => {
    const homes = [{
        "address": "2291 N Glennwood St",
        "zipcode": 92865,
        "favorite": 0,
        "distance": 2.1,
        "rating_stars": 4
    },
    {
        "address": "23414 N Dians St",
        "zipcode": 92865,
        "favorite": 0,
        "distance": 3.1,
        "rating_stars": 4
    },
    {
        "address": "114 W Commonwealth St",
        "zipcode": 92849,
        "favorite": 0,
        "distance": 2.1,
        "rating_stars": 4
    }];
    res.json(homes);
});

app.get("/api/userCars", (req, res) => {
    const cars = [
        {
            "vehicleid": 1234,
            "lpn": '3VER720',
            "year": 2008,
            "make": 'Toyota',
            "model": 'Prius',
            "plugType": 'Type A',
            "isDefault": true
        },
        {
            "vehicleid": 2224,
            "lpn": '8WRS230',
            "year": 2018,
            "make": 'Tesla',
            "model": 'Model S',
            "plugType": 'Type B',
            "isDefault": false
        },
        {
            "vehicleid": 3333,
            "lpn": '5WER234',
            "year": 2010,
            "make": 'Chevrolet',
            "model": 'Bolt',
            "plugType": 'Type A',
            "isDefault": false
        }
    ];
    res.json(cars);
});

app.get('/api/ip', (req, res) => {
    res.json({"ip": req.ip});
});

app.get('/api/vehicle/years', (req, res) => {
    
})

app.get('/api/vehicle/makes', (req, res) => { 
    // require year
    if (req.query.year) {
        const con = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: process.env.DB_USER_NAME,
            password: process.env.DB_USER_PWD,
            database: 'outletprototype_website'
        });
    
        con.connect((err) => {
            if(err){
                console.log(err)
                console.log('Error connecting to Db');
                return;
            }
        
            console.log('Connection established');
        });

        const query = 'SELECT distinct make_name FROM Vehicle where model_year=' + req.query.model_year;
    
        con.query(query, (err,rows) => {
            if(err) {
                console.log(err)
                return
            };
          
            res.send(rows);
        });
    } else {
        res.status(400).json({'message': 'A year must be provided in the parameters'});
    }
})

app.get('/api/vehicle/models', (req, res) => {
    // require year and make
    if (req.query.model_year && req.query.make_name) {
        const con = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: process.env.DB_USER_NAME,
            password: process.env.DB_USER_PWD,
            database: 'outletprototype_website'
        });
    
        con.connect((err) => {
            if(err){
                console.log(err)
                console.log('Error connecting to Db');
                return;
            }
        
            console.log('Connection established');
        });

        const query = 'SELECT distinct model_name FROM Vehicle where model_year=' + req.query.model_year + " and make_name=" + req.query.make_name;
    
        con.query(query, (err,rows) => {
            if(err) {
                console.log(err)
                return
            };
          
            res.send(rows);
        });
    } else {
        res.status(400).json({'message': 'A model year and make name must be provided in the parameters'});
    }
})

app.post('/api/register/newUser', (req, res) => {
    let user_exists = false;
    let max_user_id = 0;
    console.log(req.query.email);
    users.forEach(user => {
        max_user_id = user.user_id;
        console.log(user.email);
        if (req.query.email === user.email) {
            user_exists = true;
        }
    });
    console.log(user_exists);
    if (user_exists) {
        res.status(404).json({"message": "User already exists"});
    } else {
        res.json({"user_id": max_user_id + 1});
    }
});

app.post('/api/register/vehicle/:user_id', (req, res) => {
    res.json("message", "ok");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))