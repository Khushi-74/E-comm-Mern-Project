import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    if (!result) {
      console.warn("no product found");
    } else {
      result = await result.json();
      setProducts(result);
    }
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("record is deleted");
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setProducts(result);
    } else {
      getProducts();
    }
  };

  return (
    //html render krvana ke liey return
    <div className="product-list">
      <h3>product list</h3>
      <input
        type="text"
        className="search-product-box"
        placeholder="search Product"
        onChange={searchHandle}
      ></input>
      <ul>
        <li>S. no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>

      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/" + item._id}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No record found </h1>
      )}
    </div>
  );
};

export default ListProduct;
