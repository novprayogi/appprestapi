"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);

  // alurnya buat koneksi ke db pake koneksi.js kemudian buat controller untuk menghubungkn setelahnya di init di routes
  app.route("/tampilmhs").get(jsonku.tampilsemuamahasiswa);

  app.route("/tampilmhs/:id").get(jsonku.tampilidmahasiswa);
};
