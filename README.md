# Shopping Cart Application

## Overview
This is a **full-stack shopping cart application** built with **Node.js, Express, MongoDB, and JWT authentication**. Users can **log in with Google OAuth**, add products, manage their shopping cart, and view available products. 

## Features
✅ Google OAuth authentication  
✅ Add, update, and delete products  
✅ Add products to the cart  
✅ View cart with total price calculation  
✅ Remove individual products from the cart  
✅ Clear the entire cart  
✅ Secure API routes with JWT authentication  

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** Passport.js (Google OAuth), JWT
- **Database:** MongoDB Atlas

## Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/YOUR_USERNAME/shopping-cart-app.git
cd shopping-cart-app
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4️⃣ Start the Server
```sh
node server.js
```
The server will run on `http://localhost:5000`.

## API Endpoints
### **Authentication Routes**
- **`GET /auth/google`** → Redirects to Google OAuth login.
- **`GET /auth/google/callback`** → Handles Google OAuth callback and generates JWT.

### **Product Routes**
- **`POST /products`** → Add a new product (Requires authentication).
- **`GET /products`** → Get all products.
- **`PUT /products/:id`** → Update a product by ID (Requires authentication).
- **`DELETE /products/:id`** → Delete a product by ID (Requires authentication).

### **Cart Routes**
- **`POST /cart`** → Add a product to the cart (Requires authentication).
- **`GET /cart`** → Get all cart items (Requires authentication).
- **`DELETE /cart/:productId`** → Remove a specific product from the cart (Requires authentication).
- **`DELETE /cart`** → Clear the entire cart (Requires authentication).

## Testing with Postman
1. **Login via Google OAuth** and retrieve the token.
2. **Use the token in Postman** (Authorization header: `Bearer YOUR_TOKEN`).
3. **Test the API endpoints** using valid requests.

## Future Improvements
🔹 Improve frontend with a UI framework like React.js  
🔹 Implement order history and checkout functionality  
🔹 Add role-based authentication (Admin vs User)  

## Author
**Quang Bui**  

## License
MIT License
