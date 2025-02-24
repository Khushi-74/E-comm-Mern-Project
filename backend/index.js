const express = require("express");
const cors = require("cors");


require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require("jsonwebtoken")
const JwtKey = 'e-comm';  //iske base pe token generate hota h , it should be secret 


const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject(); // object me convert krke access kr diya or fir password hta diya
  delete result.password;
  Jwt.sign({result},JwtKey, {expiresIn:"2h"},(err, token )=>{
    if(err)
    {
      resp.send({result: "something went wrong , Please try again"})
    }
    resp.send({user,auth:token});
})});

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({user},JwtKey, {expiresIn:"2h"},(err, token )=>{
        if(err)
        {
          resp.send({result: "spething went wrong , Please try again"})
        }
        resp.send({user,auth:token});
      })
     
    } else resp.send({ result: "user not found" });
  } else {
    resp.send("Please enter missing field");
  }
});

app.post("/addProduct", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products",verifyToken, async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ msg: "no products found " });
  }
});

//deleting product base don id
app.delete("/product/:id", verifyToken ,async (req, resp) => {
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
app.put("/product/:id", verifyToken , async (req, resp) => {
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
      { company: { $regex: req.params.key } }
    ],
  });
  resp.send(result);

});

function verifyToken(req,resp,next){
  let token = req.headers['authorization']
  if(token)
  {
    token = token.split(' ')[1];
    Jwt.verify(token, JwtKey, (err,succ)=>{
      if(err)
      {
        resp.status(401).send({result:"please provide valid token with header"})
      }
      else{
          next();
      }
    })
  }
  else{
      resp.status(403).send({result:"please add token with header"})
  }
}

app.listen(5000);
