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


app.get('/api/userLogin/', (req, res) => {
    const email = req.query.email;
    const pwd = req.query.pwd;

    let query = "select * from Users where email_addr='" + email + "' and pwd='" + pwd + "'";
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
        let limit = 10;
        if (req.query.show) {
            limit = req.query.show;
        }
        // let query = "SELECT *, round((3959 / 1509 * acos(cos(radians(" + req.query.latitude + ")) * cos(radians(geo_latitude)) * cos(radians(geo_longitude) - radians(" + req.query.longitude + ")) + sin(radians(" + req.query.latitude + ")) * sin(radians(geo_latitude )))), 2) AS distance_miles FROM Home ORDER BY distance_miles limit 10";
        // let query = "select *, round(distance_meters / 1509, 3) as distance_miles \
        //             from ( \
        //                 SELECT h.*, uh.user_home_id, uh.avg_rating,  \
        //                 6371000 * acos(sin(radians(geo_latitude)) * sin(radians(" + req.query.latitude + ")) + cos(radians(geo_latitude)) * cos(radians(" + req.query.latitude + ")) * cos(radians(" + req.query.longitude + " - geo_longitude))) as distance_meters  \
        //                 from Home h \
        //                     join UserHome uh on (uh.home_id = h.home_id) \
        //             ) as a \
        //             order by distance_miles asc \
        // limit " + limit; 
        let query = "call findNearestHomes(" + req.query.latitude + ", " + req.query.longitude + ", " + limit + ")";
        console.log(query);
        con.query(query, (err, rows) => {
            res.json(rows[0]);
        });
    } else {
        res.status(400).json({"message": "a latitude and logitude must be passed to search for homes"});
    }
});

app.get("/api/userCars", (req, res) => {
    if (req.query.user_id) {
        const query = 'SELECT v.vehicle_id, uv.user_vehicle_id, Lpn, model_year, \
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

app.get("/api/vehicleId", (req, res) => {
    if (req.query.model_year && 
        req.query.make_name && 
        req.query.model_name &&
        req.query.plugType) {
        const query = 'SELECT vehicle_id from Vehicle v join PlugType p on (p.plug_type_id = v.plug_type_id) where model_year=' + req.query.model_year +
                      " and make_name='" + req.query.make_name + "' and model_name='" + req.query.model_name +
                      "' and p.name='" + req.query.plugType + "'";
        con.query(query, (err, rows) => {
            if (err) {
                res.status(400).json({"message": "error in vehicle Id"});
            }
            res.json(rows);
        })
    } else {
        res.status(400).json({"message": "vehicle id query requires model year make name model name and plug type"})
    }
})

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
        let query_str = 'SELECT distinct make_name FROM Vehicle where model_year=' + req.query.model_year;
        con.query(query_str, (err,rows) => {
            if(err) {
                console.log(err)
                res.status(400).json({"message": "sample user query issue"});
            };
          
            res.json(rows);
        });
    } else {
        let query_str = 'SELECT distinct make_name FROM Vehicle';
        con.query(query_str, (err,rows) => {
            if(err) {
                console.log(err)
                res.status(400).json({"message": "sample user query issue"});
            };
            
            res.json(rows);
        });
    }
})

app.get('/api/vehicle/models', (req, res) => {
    // require year and make
    if (req.query.model_year && req.query.make_name) {
        let models = 'SELECT distinct model_name FROM Vehicle where model_year = ' + req.query.model_year + " and make_name = '" + req.query.make_name + "'";
        
        con.query(models, (err,rows) => {
            if(err) {
                console.log(err)
                res.status(400).json({"message": "sample user query issue"});
            };
          
            res.json(rows);
        });
    } else {
        let models = 'SELECT distinct model_name FROM Vehicle';
        
        con.query(models, (err,rows) => {
            if(err) {
                console.log(err)
                res.status(400).json({"message": "sample user query issue"});
            };
            
            res.json(rows);
        });
    }
    
})

app.get('/api/vehicle/plugTypes', (req, res) => {
    if (req.query.model_year && req.query.make_name && req.query.model_name) {
        let query = "select distinct name as plugType \
        from Vehicle v join PlugType p on p.plug_type_id = v.plug_type_id \
        where model_year = " + req.query.model_year + " and make_name = '" + req.query.make_name + "' and model_name='" + req.query.model_name + "'";
        
        con.query(query, (err,rows) => {
            if(err) {
                console.log(err)
                res.status(400).json({"message": "plug types query had an issue"});
            };
            res.json(rows);
        });
    } else {
        let query = 'select distinct name as plugType from PlugType'        
        con.query(query, (err,rows) => {
            if(err) {
                console.log(err)
                res.status(400).json({"message": "plug types query had an issue"});
            };
            res.json(rows);
        });
    }
})


app.get('/api/userPurchases/:user_id', (req, res) => {
    // select t.*, 
    // v.model_year, 
    // v.make_name,
    // v.model_name,
    // p.name as plugType,
    // h.street_addr,
    // h.zipcode,
    // h.state
    // from Transactions t 
    //     join UserVehicle uv on (uv.user_vehicle_id = t.user_vehicle_id) 
    //      join Vehicle v on (v.vehicle_id = uv.vehicle_id) 
    //      join PlugType p on (p.plug_type_id = v.plug_type_id) 
    //      join UserHome uh on (uh.user_home_id = t.user_home_id) 
    //      join Home h on (h.home_id = uh.home_id) 
    //  where uv.user_id =	userId;
    let query = "call getUserTransactions(" + req.params.user_id + ")";

    con.query(query, (err, rows) => {
        if (err) {
            res.status(400).json({"message": "couldn't get transactions for user id: " + req.params.user_id});
        }
        res.json(rows);
    })
});

app.get('/api/userSales/:user_id', (req, res) => {
    let query = "select t.*, \
    v.model_year, \
    v.make_name,\
    v.model_name,\
    p.name as plugType,\
    h.street_addr,\
    h.zipcode,\
    h.state\
    from Transactions t \
        join UserVehicle uv on (uv.user_vehicle_id = t.user_vehicle_id) \
        join Vehicle v on (v.vehicle_id = uv.vehicle_id) \
        join PlugType p on (p.plug_type_id = v.plug_type_id) \
        join UserHome uh on (uh.user_home_id = t.user_home_id) \
        join Home h on (h.home_id = uh.home_id) \
    where uh.user_id = " + req.params.user_id;

    con.query(query, (err, rows) => {
        if (err) {
            res.status(400).json({"message": "couldn't get transactions for user id: " + req.params.user_id});
        }
        res.json(rows);
    })
})

app.post('/api/register/vehicle', (req, res) => {
    if (req.query.user_id && req.query.vehicle_id && req.query.Lpn && req.query.isDefault) {
        let new_user_vehicle_id_query = 'select max(user_vehicle_id) + 1 as user_vehicle_id from UserVehicle';
        
        con.query(new_user_vehicle_id_query, (err, rows) => {
            if (err) {
                res.status(400).json({"message": "issue getting new id"});
            }
            let new_user_vehicle_id = rows[0].user_vehicle_id;
            
            let submit_new_vehicle_query = "insert into UserVehicle values (?,?,?,?,?);";
            let prepared_statement = mysql.format(submit_new_vehicle_query, [new_user_vehicle_id, req.query.user_id,req.query.vehicle_id,req.query.Lpn, req.query.isDefault]);
            console.log(prepared_statement);
            con.query(prepared_statement, (err, rows) => {
                if (err) {
                    res.json({"message": "issue posting new vehicle"});
                }
                let vehicle_info_query = "SELECT v.vehicle_id, uv.user_vehicle_id, Lpn, model_year, \
                make_name, model_name, default_vehicle as isDefault, pt.name as plugType \
                FROM Vehicle v \
                    JOIN UserVehicle uv on (uv.Vehicle_id = v.Vehicle_id) \
                    JOIN PlugType pt on (pt.Plug_type_id = v.plug_type_id) \
                where uv.user_vehicle_id = " + new_user_vehicle_id;
                console.log(vehicle_info_query);
                con.query(vehicle_info_query, (err, rows) => {
                    console.log(err);
                    console.log(rows);
                    if (err) {
                        res.json({"message": "issue getting user vehicle"});
                    }
                    res.json(rows);
                });
            })
        })
    }
    
});

app.post('/api/remove/user_vehicle/:user_vehicle_id', (req, res) => {
    const query = "delete from UserVehicle where user_vehicle_id=" + req.params.user_vehicle_id;
    
    con.query(query, (err, rows) => {
        if (err) {
            res.status(400).json({"message": "error deleting vehicle"});
        }
        console.log(rows);
        res.json({"message": "ok"});
    })
})

app.post('/api/update/user_vehicle/:user_vehicle_id', (req, res) => {

    if (req.query.vehicle_id && req.query.Lpn && req.query.isDefault) {
        const query = 'update UserVehicle \
                       set vehicle_id=' + req.query.vehicle_id + 
                        ", Lpn='" + req.query.Lpn + "', " +
                        "default_vehicle=" + req.query.isDefault + 
                        " where user_vehicle_id=" + req.params.user_vehicle_id;
        
        con.query(query, (err, rows) => {
            if (err) {
                res.status(400).json({"message": "issue updating vehicle"});
            }
            res.json({"message": "update successful"});
        })
    }
});

app.post('/api/register/newUser', (req, res) => {
    let user_exists = false;
    let max_user_id = 0;

    users.forEach(user => {
        max_user_id = user.user_id;
      
        if (req.query.email === user.email) {
            user_exists = true;
        }
    });

    if (user_exists) {
        res.status(400).json({"message": "User already exists"});
    } else {
        res.json({"user_id": max_user_id + 1});
    }
});

app.post('/api/newTransaction', (req, res) => {
    let query = "insert into Transactions \
                 select max(trans_id) + 1," + req.query.user_vehicle_id + ", " 
                 + req.query.user_home_id 
                 + ", current_date, " 
                 + req.query.sale_price + ", " 
                 + req.query.time_charging + ", " 
                 + req.query.rating + 
                 " from Transactions";
    con.query(query, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({"message": "issue inserting transaction"});
        }
        res.json({"message": "update successful"});
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

