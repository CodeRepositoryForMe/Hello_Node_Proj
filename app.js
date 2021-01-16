const http = require("http");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

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

// Add Modules
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");

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

// Add middleware to get user
app.use((req, res, next) => {
  User.findAll({ limit: 1, raw: true })
    .then((user) => {
      //console.log(user);
      req.loggedUser = user[0];
      console.log("Logged User =>" + req.loggedUser.name);
      next();
    })
    .catch((err) => {
      console.log("Logged User not found");
      console.log(err);
    });
});

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

// Add data relations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// This code executes at first time only
sequelizeObj
  .sync({force : true})
//   .sync()
  .then((result) => {
    //console.log(result);
    return User.findAll({ limit: 1, raw: true });
  })
  .then((user) => {
    console.log("user ------ >");
    console.log(user);
    if (!user || user.length == 0) {
      return User.create({
        id: uuidv4(),
        name: "Test",
        email: "Test@gmail.com",
      });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    server.listen(3000, function () {
      console.log("Server started !!!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
