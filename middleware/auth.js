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
    tanggal_daftar: new Date(),
  };

  var query = "SELECT email from ?? where ??";
  var table = ["users", "email", post.email];

  query = mysql.format(query, table);

  connetion.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        var query = "INSERT into ?? SET ??";
        var table = ["users"];
        query = mysql.format(query, table);
        connetion.query(query, post, function (error, rows, fields) {
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
