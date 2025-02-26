import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTokenType } from "../utils";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(name, price, category, company);
    const user = JSON.parse(localStorage.getItem("user"));
    const token =
      localStorage.getItem("token") || user?.stsTokenManager?.accessToken;
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization:
          getTokenType(token) === "jwt"
            ? `bearer ${JSON.parse(token)}`
            : `bearer ${token}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // const token = user?.stsTokenManager?.accessToken;
    const token =
      localStorage.getItem("token") || user?.stsTokenManager?.accessToken;
    console.log("Updating product with ID:", params.id);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "Application/json",
        authorization:
          getTokenType(token) === "jwt"
            ? `bearer ${JSON.parse(token)}`
            : `bearer ${token}`,
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
  };
  return (
    //form for add product with validation

    <div className="product">
      <h1>Update product</h1>
      <input
        type="text"
        placeholder="Enter product name "
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product price "
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product category "
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product company "
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />

      <button onClick={updateProduct} className="signupButton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
