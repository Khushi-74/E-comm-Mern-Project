# 🚀 Project Setup Guide  

Follow these steps to set up and run the project locally.  


## 📌 Step 1: Clone the Repository  


git clone https://github.com/Khushi-74/E-comm-Mern-Project.git//
cd E-comm-Mern-Project.git//
vs code -> code .



## 📌 Step 2: Install Dependencies for entire project

npm install

### Navigate to the backend and install dependencies
cd backend
npm install

### Navigate to the frontend and install dependencies
cd frontend
npm install

## 📌 Step 3: Set Up Database Connection
Ensure MongoDB is installed and running locally

## 📌 Step 4: Run the backend
cd backend
nodemon index.js

## 📌 Step 5: Run the frontend
cd frontend
npm start

## 📌 Step 6: Add Products via Postman  

Follow these steps to add a product using **Postman**: 
1. **Open Postman** and create a **POST** request.  
2. First you have to "Signup" with "Name" and "Password" using the **Post** request and upon submitting the request, a token will be generated in the Postman console and copy the token.
3. Create a new Post Request and in the **Header** tab search for the key **Authorization** and set the value as the above copied token
4. Set the **Request URL** to:  
    http://localhost:5000/addproduct
5. Go to the **Body** tab and select **raw** → **JSON** format.  
6. Add the following JSON data:  

{
  "name": "Product Name",
  "price": 100,
  "category": "Electronics",
  "company": "Company Name"
}
Click Send, and the product will be added to the database.
Check the response to confirm that the product has been successfully added.

## 📌 Useful Commands  

| Command              | Description                     |
|----------------------|--------------------------------|
| `npm install`       | Install dependencies           |
| `nodemon index.js`  | Start the backend server       |
| `npm start`        | Start the frontend React app    |



