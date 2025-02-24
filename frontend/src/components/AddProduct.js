import React, { useState } from "react";

const AddProduct = ()=>{

    const[name,setName] = useState("");
    const[price,setPrice] = useState("");
    const[category,setCategory] = useState("");
    const[company,setCompany ] = useState("");
    const[err,setError] = useState(false);
    const addProduct = async ()=>{

        if(!name || !price || !category || !company)
        {
            setError(true)
            return false
        }

        console.warn(name,price,category,company)
       
        const userId = JSON.parse(localStorage.getItem('user'))._id;
       
        let result = await fetch("http://localhost:5000/addProduct", {
            method: "post",
            body: JSON.stringify({ name, price , category , company , userId}), //spelling should be consistent with the schema `
            headers: {
              "Content-Type": "application/json",
               authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
          })
          result = await result.json();

          console.warn(result);
      
    }
    return (

        //form for add product with validation 


        <div className="product">
            <h1>Add product</h1>
            <input type="text" placeholder="Enter product name " className="inputBox"
            value = {name} onChange={(e)=>{setName(e.target.value)}}
            />
          {err && !name &&  <span className="invalid-input">Enter valid name</span> }

             <input type="text" placeholder="Enter product price " className="inputBox"
           value = {price}   onChange={(e)=>{setPrice(e.target.value)}}
            />
                {err && !price &&  <span className="invalid-input">Enter valid price</span> }

             <input type="text" placeholder="Enter product category " className="inputBox"
             value = {category}  onChange={(e)=>{setCategory(e.target.value)}}
            />
                {err && !category &&  <span className="invalid-input">Enter valid category</span> }

             <input type="text" placeholder="Enter product company " className="inputBox"
             value = {company}  onChange={(e)=>{setCompany(e.target.value)}}
            />
                {err && !company &&  <span className="invalid-input">Enter valid company</span> }

            <button onClick={addProduct} className="signupButton">Add Product</button>
        </div>
    )
}

export default AddProduct