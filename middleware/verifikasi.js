const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

function verifikasi(roles) {
  return function (req, res, next) {
    // cek authorization header
    var tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      var token = tokenWithBearer.split(" ")[1];
      // verifikasi
      jwt.verify(token, config.secret, function (error, decoded) {
        if (error) {
          return res.status(401).send({ auth: false, message: "Token tidak terdaftar!" });
          console.log(error);
        } else {
          if (roles == 2) {
            req.auth = decoded;
            next();
          } else {
            return res.status(401).send({ auth: false, message: "Gagal mengotorisasi Role Anda!" });
          }
        }
      });
    } else {
      return res.status(401).send({ auth: false, message: "Token tidak tersedia!" });
    }
  };
}

module.exports = verifikasi;
