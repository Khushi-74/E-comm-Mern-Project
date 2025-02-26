const express = require("express");
const cors = require("cors");
const admin = require("./FirebaseAdmin");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require("jsonwebtoken");
const JwtKey = 'e-comm'; //iske base pe token generate hota h , it should be secret

const app = express();
app.use(express.json());
app.use(cors());

const verifyToken = async (req, resp, next) => {
  console.log("Headers received:", req.headers);
  let token = req.headers["authorization"];
  token = token.split(" ")[1];

  try {
    // 🔹 First, Try Verifying as a Firebase Token
    const decodedFirebaseToken = await admin.auth().verifyIdToken(token);
    req.user = decodedFirebaseToken; // Attach user data
    return next();
  } catch (firebaseError) {
    console.log("Not a Firebase token, trying JWT...");

    try {
      // 🔹 If Firebase fails, Try Verifying as a JWT Token
      console.log(token);
      const decodedJwtToken = Jwt.verify(token, JwtKey);
      req.user = decodedJwtToken; // Attach user data
      return next();
    } catch (jwtError) {
      return resp.status(401).json({ message: "Invalid token" });
    }
  }
  // if (!token.startsWith("ey")) {

  //   const decodedToken = await admin.auth().verifyIdToken(token);
  //   req.user = decodedToken; // Attach Firebase user info to request
  //   next();
  //   // Jwt.verify(token, JwtKey, (err,succ)=>{
  //   //   if(err)
  //   //   {
  //   //     resp.status(401).send({result:"please provide valid token with header"})
  //   //   }
  //   //   else{
  //   //       next();
  //   //   }
  // } else {
  //   resp.status(403).send({ result: "please na add token with header" });
  // }
};

app.post("/signup", async (req, resp) => {
  console.log("Signup request received:", req.body);
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject(); // object me convert krke access kr diya or fir password hta diya
  delete result.password;
  Jwt.sign({ result }, JwtKey, (err, token) => {
    if (err) {
      console.error("JWT sign error:", err);
      return resp
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
    resp.status(201).json({ user, auth: token }); // ✅ Ensure "token" is included
  });
});

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, JwtKey, (err, token) => {
        if (err) {
          resp.send({ result: "spething went wrong , Please try again" });
        }
        resp.send({ user, auth: token });
      });
    } else resp.send({ result: "user not found" });
  } else {
    resp.send("Please enter missing field");
  }
});

app.post("/google-login", async (req, resp) => {
  const { token } = req.body;
  console.warn({ token });
  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, name, email } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email });
      await user.save();
    }

    // Generate a custom JWT for API authentication
    const jwtToken = Jwt.sign({ userId: user._id, email }, JwtKey, {
      expiresIn: "2h",
    });

    return resp.json({
      uid,
      name,
      email,
      token: jwtToken, // Send JWT token back to frontend
      message: "Google login successful",
    });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return resp.status(401).json({ message: "Invalid token" });
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

app.listen(5000);
