const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const PORT = process.env.PORT || 3000;

//Library's about hashing password
const bcrypt = require("bcrypt");
const saltRounds = 13;
var jwt = require("jsonwebtoken");
const secret = "Mysecret_159";

const crypto = require("crypto");
const { error } = require("console");

// // Call the cryptr and create a secret key
// const Cryptr = require("cryptr");
// const cryptr = new Cryptr("Secretkey");

//Variable for conection to database
const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database: "project_mockup",
});

//Conection to database
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to My database");
  }
});

app.use(express.json());
app.use(cors());

//Login user
app.post("/login_user", (req, res) => {
  const reg_id = req.body.reg_id;
  const id_card = req.body.id_card;

  var query = `SELECT reg_id, id_card, course, candidate, prefix, name_lastnameTH, name_lastnameEN, nationality, tel, email, educational, branch, permission, receipt, gender,
  CONCAT( DATE_FORMAT( birthday , '%d' ), '/', DATE_FORMAT( birthday , '%m' ) , '/', DATE_FORMAT( birthday , '%Y' ) +543 ) AS Thaibirthday, provinces.name_th AS province_name, amphures.name_th AS amphure_name, districts.name_th AS district_name
  FROM member
  INNER JOIN provinces 
  ON member.province=provinces.id
  INNER JOIN amphures
  on member.amphure=amphures.id
  INNER JOIN districts
  on member.district=districts.id
  WHERE reg_id = ?`

  db.query(query, [reg_id], (err, result) => {
    
    if (result.length > 0) {
      bcrypt.compare(id_card, result[0].id_card, function (err, auth) {
        if (auth) {
          const token = jwt.sign(
            { id_card: result[0].id_card, reg_id: result[0].reg_id },
            secret,
            {
              expiresIn: "1h",
            }
          );
          res.json({
            status: "true",
            message: "id card has authorized already",
            token,
            id_card: id_card,
            result: result,
          });
        } else {
          res.json({ status: "false", err });
        }
      });
    } else {
      res.json({ status: "false", err });
    }
  });
});

//Pay
app.get("/check_payment/:id", (req, res) => {
  const reg_id = req.params.id
  const query = `SELECT reg_id, id_card, course, candidate, prefix, name_lastnameTH, name_lastnameEN, nationality, tel, email, educational, branch, permission, receipt, gender,
  CONCAT( DATE_FORMAT( birthday , '%d' ), '/', DATE_FORMAT( birthday , '%m' ) , '/', DATE_FORMAT( birthday , '%Y' ) +543 ) AS Thaibirthday, provinces.name_th AS province_name, amphures.name_th AS amphure_name, districts.name_th AS district_name
  FROM member
  INNER JOIN provinces 
  ON member.province=provinces.id
  INNER JOIN amphures
  on member.amphure=amphures.id
  INNER JOIN districts
  on member.district=districts.id
  WHERE reg_id = ?`

  db.query(query, [reg_id], (err, result) => {
    if(result){
      res.send(result)
    }
  })

})

app.post("/auth_if", (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token_auth = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token_auth, secret);
      res.json({ status: true, decoded });
      next();
    } catch (err) {
      res.json({ status: false, message: err.message });
    }
  }
});

app.get("/user_information/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM member WHERE id = ?", id, (err, result) => {
    if (err) {
      res.json({ ERROR: err });
    } else {
      res.json({ Status: "OK", result });
    }
  });
});

//Check_idcard and Insert a user Information into a database

app.post("/add_member", (req, res) => {
  const id_card = req.body.id_card;
  const reg_id = req.body.reg_id;
  const name_lastnameTH = req.body.name_lastnameTH;
  const name_lastnameEN = req.body.name_lastnameEN;
  const gender = req.body.gender;
  const religion = req.body.religion;
  const status = req.body.status;
  const permission = req.body.permission;
  const receipt = req.body.receipt;
  const course = req.body.course;
  const candidate = req.body.candidate;
  const prefix = req.body.prefix;
  const nationality = req.body.nationality;
  const birthday = req.body.birthday;
  const tel = req.body.tel;
  const email = req.body.email;
  const address = req.body.nationality;
  const educational = req.body.educational;
  const branch = req.body.branch;
  const province = req.body.province;
  const amphure = req.body.amphure;
  const district = req.body.district;

  const query =
    `INSERT INTO member (reg_id , id_card, course, candidate, prefix, name_lastnameTH, name_lastnameEN, nationality, birthday, tel, email, address, educational, branch, province, amphure, district, gender, status, permission, receipt) 
    VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  bcrypt.hash(id_card, saltRounds, function (err, hash) {
    db.query(
      query,
      [
        reg_id,
        hash,
        course,
        candidate,
        prefix,
        name_lastnameTH,
        name_lastnameEN,
        nationality,
        birthday,
        tel, 
        email, 
        address,
        educational,
        branch,
        province,
        amphure,
        district,
        gender,
        status,
        permission,
        receipt,
      ],
      (err, result) => {
        if (err) {
          res.json({ ERROR: err });
        } else {
          // res.json({ STATUS: "ลงทะเบียนเสร็จสิ้น", decrypt: decrypt });
          res.send(result);
        }
        console.log(result)
      }
    );
  });
});

//Get_provinces
app.get("/get_provinces", (req, res) => {
  db.query(
    "SELECT id, name_th FROM provinces ORDER BY name_th ASC",
    (err, result) => {
      if (result.length === 0) {
        res.json({ Error: "Failed" });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/get_amphures/:province_id", (req, res) => {
  const province_id = req.params.province_id;
  db.query(
    "SELECT * FROM amphures WHERE province_id = ?",
    [province_id],
    (err, result) => {
      if (err) throw error;

      res.send(result);
    }
  );
});

app.get("/get_districts/:amphure_id", (req, res) => {
  const amphure_id = req.params.amphure_id;
  db.query(
    "SELECT * FROM districts WHERE amphure_id  = ?",
    [amphure_id],
    (err, result) => {
      if (err) throw error;

      res.send(result);
    }
  );
});

//---------------------------------------------------------------------------------------------------------------
//For admin

app.get("/do_not_pay", (req, res) => {
  db.query(
    "SELECT * FROM member WHERE permission = 'รอชำระเงิน'",
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    }
  );
});

app.post("/admin_login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("Error executing Mysql Query:", err);
      res.status(500).json({ error: "An error occurred" });
    }
    if (result.length === 0) {
      res.json({
        Error: "กรุณาเข้าสู่ระบบใหม่อีกครั้ง Username หรือ Password ไม่ตรงกัน",
      });
    } else {
      res.json({ Status: "OK", result });
    }
  });
});

app.get("/display_all_user", (req, res) => {
  db.query("SELECT * FROM member", (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length === 0) {
      res.json({ ERROR: "You can not access to data" });
    } else {
      res.send(result);
    }
  });
});

//Get single user
app.get("/edit_user_info/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM member WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length === 0) {
      res.json({ ERROR: "You can not access to data" });
    } else {
      res.send(result);
    }
  });
});

//Delete member
app.delete("/delete_member/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM member WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result.length === 0) {
      res.json({ ERROR: "Failed" });
    } else {
      res.send(result);
    }
  });
});

//Update informations
app.put("/update_user_info", (req, res) => {
  const id = req.body.id;
  const id_card = req.body.id_card;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const province = req.body.province;
  const gender = req.body.gender;
  const religion = req.body.religion;
  const status = req.body.status;
  const permission = req.body.permission;
  const receipt = req.body.receipt;

  const sql_update =
    "UPDATE member SET id_card = ?, name = ?, lastname = ?, province = ?, gender = ?, religion = ?, status = ?, permission = ?, receipt = ? WHERE id = ?";

  db.query(
    "UPDATE member SET id_card = ?, name = ?, lastname = ?, province = ?, gender = ?, religion = ?, status = ?, permission = ?, receipt = ? WHERE id = ?",
    [
      id_card,
      name,
      lastname,
      province,
      gender,
      religion,
      status,
      permission,
      receipt,
      id,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

//update_permission
app.put("/update_permission", (req, res) => {
  const id = req.body.id;
  const permission = req.body.permission;

  db.query(
    "UPDATE member SET permission = ? WHERE id = ?",
    [permission, id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(PORT, () => console.log("Server is running on port 3000"));
