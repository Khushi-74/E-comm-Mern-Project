const express = require("express");
const cors = require("cors");
const admin = require("./FirebaseAdmin");

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require("jsonwebtoken");
const JwtKey = "e-comm"; //iske base pe token generate hota h , it should be secret

const app = express();
app.use(express.json());
app.use(cors());

app.post("/google-login", async (req, res) => {
  try {
    console.log("hello");
    console.log(req);
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    //get details from decoded token
    const { email, name } = decodedToken;
    //check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      // If user does not exist, create a new user
      user = new User({
        name,
        email,
      });
      //add to db
      await user.save();
    }
    //send back user as json
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: "Invalid Firebase Token" });
  }
});

app.post("/signup", async (req, resp) => {
  let user = new User(req.body);

  const{name,email,password} = req.body;
  let existingUser = await User.findOne({ name });

    if (existingUser) {
        return resp.status(400).json({ message: "User already exists" });
    }


  let result = await user.save();
  result = result.toObject(); // object me convert krke access kr diya or fir password hta diya
  delete result.password;
  Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "something went wrong , Please try again" });
    }
    resp.send({ user, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ result: "spething went wrong , Please try again" });
        }
        resp.send({ user, auth: token });
      });
    } else 
    resp.status(404).json({ message: "Please Signup first , then login " });
  } else {
    resp.send("Please enter missing field");
  }
});

app.post("/addProduct", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", verifyToken, async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ msg: "no products found " });
  }
});

//deleting product base don id
app.delete("/product/:id", verifyToken, async (req, resp) => {
  // resp.send(req.params.id)
  const result = await Product.deleteOne({ _id: req.params.id });
  console.warn(result);
  resp.send(result);
});

//get product details by id api
app.get("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No records found" });
  }
});

//update product api
app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    {
      _id: req.params.id,
    },

    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

async function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    try {
      verifyJWTToken(token);
    } catch (error) {
      try {
        verifyFirebaseToken(token);
      } catch (error) {
        console.error("Invalid Token Format:", error.message);
        throw new Error("Invalid token");
      }
    } finally {
      next();
    }
  } else {
    resp.status(403).send({ result: "please add token with header" });
  }
}

async function verifyFirebaseToken(token) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Valid Firebase Token:", decodedToken);
    return { valid: true, type: "Firebase" };
  } catch (error) {
      console.error("invalid token");
  }
}

function verifyJWTToken(token) {
  try {
    Jwt.verify(token, JwtKey);
    return { valid: true, type: "JWT" };
  } catch (error) {
    console.error("Invalid JWT Token:", error.message);
  }
}

app.listen(5000);
