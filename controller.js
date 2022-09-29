"use strict";

var response = require("./res");
var connection = require("./koneksi");

exports.index = function (req, res) {
  response.ok("Aplikasi REST Api Berjalan", res);
};

//menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (error, rows, fields) {
    if (error) {
      connection.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menamplkan semua data mahasiswa berdasarkan id
exports.tampilidmahasiswa = function (req, res) {
  let id = req.params.id;
  connection.query("SELECT * FROM mahasiswa where id_mahasiswa = ?", [id], function (error, rows, fields) {
    if (error) {
      connection.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// menambahkan data mahasiswa
exports.tambahMahasiswa = function (req, res) {
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query("INSERT into mahasiswa (nim,nama,jurusan) VALUES (?,?,?)", [nim, nama, jurusan], function (error, rows, fields) {
    if (error) {
      connection.log(error);
    } else {
      response.ok("Berhasil menambahkan data", res);
    }
  });
};

// mengubah data berdasarkan id mahassiswa
exports.ubahMahasiswa = function (req, res) {
  var id = req.body.id_mahasiswa;
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query("UPDATE mahasiswa SET nim=?,nama=?,jurusan=? WHERE id_mahasiswa=?", [nim, nama, jurusan, id], function (error, rows, fields) {
    if (error) {
      connection.log(error);
    } else {
      response.ok("Berhasil mengubah data", res);
    }
  });
};

// menghapus data berdasarkan id mahasiswa
exports.hapusMahasiswa = function (req, res) {
  var id = req.body.id_mahasiswa;

  connection.query("DELETE FROM mahasiswa where id_mahasiswa=?", [id], function (error, rows, fields) {
    if (error) {
      connection.log(error);
    } else {
      response.ok("Berhasil menghapus data", res);
    }
  });
};
