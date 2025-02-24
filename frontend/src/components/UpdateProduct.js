import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
const UpdateProduct = ()=>{

    const[name,setName] = useState("");
    const[price,setPrice] = useState("");
    const[category,setCategory] = useState("");
    const[company,setCompany ] = useState("");
    const params = useParams();
    const navigate = useNavigate()   
    useEffect(()=>{
       
        getProductDetails();
    },[])

   const  getProductDetails = async()=>{
    console.warn(name,price,category,company)
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    result = await result.json()
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)
   }

    const updateProduct = async()=>{

        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':"Application/json",
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
                
            }
          });
          result = await result.json();
          console.warn(result)
          navigate("/")
         
    }
    return (

        //form for add product with validation 

        
        <div className="product">
            <h1>Update product</h1>
            <input type="text" placeholder="Enter product name " className="inputBox"
            value = {name} onChange={(e)=>{setName(e.target.value)}}
            />
        
             <input type="text" placeholder="Enter product price " className="inputBox"
           value = {price}   onChange={(e)=>{setPrice(e.target.value)}}
            />
              
             <input type="text" placeholder="Enter product category " className="inputBox"
             value = {category}  onChange={(e)=>{setCategory(e.target.value)}}
            />

             <input type="text" placeholder="Enter product company " className="inputBox"
             value = {company}  onChange={(e)=>{setCompany(e.target.value)}}
            />
              

            <button onClick={updateProduct} className="signupButton">Update Product</button>
        </div>
    )
}

export default UpdateProduct