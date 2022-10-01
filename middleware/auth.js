var connetion = require("../koneksi");
var mysql = require("mysql");
var md5 = require("md5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

// bikin controller register
exports.registrasi = function (req, res) {
  var post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: req.body.tanggal_daftar, //coba ubah nanti jadi new Date()
  };
  //fungsi ? untuk memberi petik (') dan ?? untuk memberi petik (`)
  var query = "SELECT ?? from ?? where ??=?";
  var table = ["email", "users", "email", post.email];

  query = mysql.format(query, table);

  connetion.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      var keys = Object.keys(post);
      console.log(keys[0]);
      if (rows.length == 0) {
        var query = "INSERT into ?? (username,email,password,role,tanggal_daftar) VALUES (?)";
        // var query = "INSERT into ?? SET ??";
        var table = ["users", [post.username, post.email, post.password, post.role, post.tanggal_daftar]];
        // var table = ["users"];

        query = mysql.format(query, table);
        connetion.query(query, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            response.ok("Berhasil menambahkan data user", res);
          }
        });
      } else {
        response.ok("email telah terdaftar didatabase", res);
      }
    }
  });
};

// controller login

exports.login = function (req, res) {
  var post = {
    email: req.body.email,
    password: req.body.password,
  };

  var query = "SELECT * from ?? where ??=? AND ??=?";
  var table = ["users", "email", post.email, "password", md5(post.password)];

  query = mysql.format(query, table);

  connetion.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, {
          expiresIn: 1440, //expiresIn menggunakan second atau detik
        });
        id_user = rows[0].id_users;

        var data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address(),
          username: rows[0].username,
          tanggal_daftar: rows[0].tanggal_daftar,
        };

        var query = "INSERT into ??(id_user,access_token,ip_address) values(?)";
        var table = ["akses_token", [data.id_user, data.access_token, data.ip_address]];

        query = mysql.format(query, table);
        connetion.query(query, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "Token JWT tergenerate!",
              token: token,
              currUser: { id: data.id_user, username: data.username, daftar: data.tanggal_daftar },
            });
          }
        });
      } else {
        res.json({ error: true, message: "Email Atau Password salah!" });
      }
    }
  });
};

// controller cek halaman
exports.cekhalaman = function (req, res) {
  response.ok("Halaman ini untuk mengecek jika rolenya adalah 2", res);
};
