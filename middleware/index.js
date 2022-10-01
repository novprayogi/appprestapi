var express = require("express");
var auth = require("./auth");
const verifikasi = require("./verifikasi");
var router = express.Router();

// pada saat mendaftarkan url seperti dibawah /api/ jgn api/ dia bakal not found
//daftarkan menu regis
router.post("/api/v1/register", auth.registrasi);
router.post("/api/v1/login", auth.login);

// url yang perlu di otorisasi/authorization
router.get("/api/v1/cekhalaman", verifikasi(2), auth.cekhalaman);

module.exports = router;
