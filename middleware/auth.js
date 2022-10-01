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
    tanggal_daftar: req.body.tanggal_daftar,
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
