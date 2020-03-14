const express = require('express');
const axios = require('axios');
const app = express()
const port = 6000;
const mysql = require('mysql');

let con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PWD,
    database: 'outletprototype_website'
});

/*
let insertVehicle = "INSERT INTO UserVehicle (user_vehicle_id, user_id, Vehicle_id, Lpn, default_vehicle) VALUES ('"   \
+ req.query.user_vehicle_id + "'," + req.query.user_id + "'," + req.query.Vehicle_id + "'," + req.query.Lpn + "',"  \
+ req.query.default_vehicle + ")";

let deleteVehicle = 'DELETE FROM UserVehicle WHERE user_vehicle_id = ' + req.query.user_vehicle_id;

let searchVehicle = 'SELECT * FROM UserVehicle U,Vehicle V WHERE V.Vehicle_id = U.Vehicle_id AND U.user_vehicle_id = ' + req.query.user_vehicle_id;
*/

con.connect((err) => {
    if(err){
        console.log(err)
        console.log('Error connecting to Db');
        return;
    }

    console.log('Connection established');
});

let query = 'select * from Users limit 20';
con.query(query, (err,rows) => {
    if (err) {
        console.log("error")
    };
    
    console.log(rows);
});

app.get('/api/sampleUsers', async (req, res) => {
    let limit = 10;
    if (req.query.limit) {
        limit = req.query.limit;
    }

    let query = 'select * from Users limit ' + limit;
    con.query(query, (err,rows) => {
        if (err) {
            res.status(400).json({"message": "sample user query issue"});
        };
      
        res.json(rows);
    });
})


app.get('/api/userLogin/', (req, res) => {
    const email = req.query.email;
    const pwd = req.query.pwd;

    let query = "select * from Users where email_addr='" + email + "' and pwd=" + pwd;
    con.query(query, (err, rows) => {
        if (err) {
            res.status(400).json({"message": "User Not Found"});
        } else {
            res.json(rows);
        }
    })
});

app.get("/api/search/homes", (req, res) => {
    if (req.query.latitude && req.query.longitude) {
        let limit = 30;
        if (req.query.show) {
            limit = req.query.show;
        }
        let query = "select *, round(distance_meters / 1509, 3) as distance_miles \
                    from ( \
                        SELECT *,  \
                        6371000 * acos(sin(radians(geo_latitude)) * sin(radians(" + req.query.latitude + ")) + cos(radians(geo_latitude)) * cos(radians(" + req.query.latitude + ")) * cos(radians(" + req.query.longitude + " - geo_longitude))) as distance_meters  \
                        from Home \
                    ) as a \
                    order by distance_miles asc \
        limit " + limit; 
        con.query(query, (err, rows) => {
            res.json(rows);
        });
    } else {
        res.status(400).json({"message": "a latitude and logitude must be passed to search for homes"});
    }
});

app.get("/api/userCars", (req, res) => {
    if (req.query.user_id) {
        const query = 'SELECT v.vehicle_id, Lpn, model_year, \
        make_name, model_name, default_vehicle as isDefault, pt.name as plugType \
        FROM Vehicle v \
            JOIN UserVehicle uv on (uv.Vehicle_id = v.Vehicle_id) \
            JOIN PlugType pt on (pt.Plug_type_id = v.plug_type_id) \
        where uv.user_id=' + req.query.user_id;
     
        con.query(query, (err,rows) => {
            if (err) {
                console.log(err)
                res.status(400).json({"message": "sample user query issue"});
            };
          
            res.json(rows);
        });
    } else {
        res.status(400).json({"message": "user id required"});
    }
});

app.get('/api/ip', (req, res) => {
    res.json({"ip": req.ip});
});

app.get('/api/vehicle/years', (req, res) => {
    let query_str = 'select distinct model_year from Vehicle';
    con.query(query_str, (err,rows) => {
        if(err) {
            console.log(err)
            res.status(400).json({"message": "sample user query issue"});
        };
      
        res.json(rows);
    });
})

app.get('/api/vehicle/makes', (req, res) => { 
    // require year
    if (req.query.model_year) {
        const query_str = 'SELECT distinct make_name FROM Vehicle where model_year=' + req.query.model_year;
        con.query(query_str, (err,rows) => {
            if(err) {
                console.log(err)
                res.status(400).json({"message": "sample user query issue"});
            };
          
            res.json(rows);
        });
    } else {
        res.status(400).json({'message': 'A year must be provided in the parameters'});
    }
})

app.get('/api/vehicle/models', (req, res) => {
    // require year and make
    if (req.query.model_year && req.query.make_name) {
        const models = 'SELECT distinct model_name FROM Vehicle where model_year = ' + req.query.model_year + " and make_name = '" + req.query.make_name + "'";
        
        con.query(models, (err,rows) => {
            if(err) {
                console.log(err)
                res.status(400).json({"message": "sample user query issue"});
            };
          
            res.json(rows);
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
