const express = require("express");
const bodyParser = require("body-parser");

// fungsi morgan untuk mengambil data http
var morgan = require("morgan");
const app = express();

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// dipanggil lanjutan dari middleware
app.use(morgan("dev"));

// panggil routes (alurnya routes <- controller <- res)
var routes = require("./routes");
routes(app);

// daftarkan menu routes dari index di dalam folder middleware
app.use("/auth", require("./middleware"));

// function availableRoutesString() {
//   return app._router.stack
//     .filter((r) => r.route)
//     .map((r) => Object.keys(r.route.methods)[0].toUpperCase().padEnd(7) + r.route.path)
//     .join("\n");
// }

// console.log(availableRoutesString());

app.listen(3000, () => {
  console.log("server start on port 3000");
});
