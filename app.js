const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// Routes
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const userRouter = require("./routes/user");
const defaultRoute = require("./routes/default");

// DB
//const db = require("./util/database");
const sequelizeObj = require("./util/database");

// Controllers
const errorController = require("./controllers/Error");

const app = express();

// For ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// db.execute('SELECT * FROM product')
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use("/", (req, res, next) => {
  console.log("This always Executes !!!");
  console.log(req.body);
  next();
});

app.use(adminRouter.routes);
app.use(shopRouter);
app.use("/user/", userRouter);
app.use(defaultRoute);

app.use(errorController.errorPageNotFound);

const server = http.createServer(app);

sequelizeObj
  .sync()
  .then((result) => {
    console.log(result);
    server.listen(3000, function () {
      console.log("Server started !!!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
