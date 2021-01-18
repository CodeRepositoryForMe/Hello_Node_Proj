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

app.use((req, res, next) => {
  console.log(req.loggedUser.id);
  console.log("Cart -- > ");
//   return req.loggedUser
//     .getCart()
//     .then((cart) => {
//       console.log("Cart--->");
//       console.log(cart.id);
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });

    return Cart.findOne({ Where: { UserId: req.loggedUser.id } })
      .then((cart) => {
        console.log("---->");
        console.log(cart.id);
        req.loggedUserCart = cart;
        next();
      })
      .catch((err) => {
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
  //.sync({ force: true })
  .sync()
  .then(() => {
    //console.log(result);
    //return User.findAll({ raw: true });
    return User.findOrCreate({
      where: {
        name: "Test",
      },
      defaults: {
        id: uuidv4(),
        name: "Test",
        email: "Test@gmail.com",
        Cart: {
          id: uuidv4(),
        },
      },
    });
  })
  //   .then((user) => {
  //     console.log("Check for User Exist");
  //     console.log(user[0]);
  //     if (!user[0]) {
  //       return User.create({
  //         id: uuidv4(),
  //         name: "Test",
  //         email: "Test@gmail.com",
  //       });
  //     } else {
  //       return user[0];
  //     }
  //   })
  .then((user) => {
    console.log("Check for Cart Exist from DB");
    console.log(user[0]);
    console.log(user[0].id);
    return Cart.findOrCreate({
      where: { UserId: user[0].id },
      defaults: { id: uuidv4(), UserID: user[0].id },
    });
  })
  .then((cart) => {
    console.log(cart);
    server.listen(3000, function () {
      console.log("Server started !!!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
