# credit-card-system

This is a credit card system with reactjs as a frontend and node.js as backend. Express is used for 
API endpoints.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ashganga/credit-card-system.git

# Go inside the directory
cd credit-card-system

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```

## Documentation

### Folder Structure

All the source code will be inside **src** directory. Inside src, there is client and server directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js/Express code will be in the server directory.
src/server/index.js is entrypoint to backend.

### Other information
As there are only 2 API, all backend code is in index.js file. But in rea life scenarios I would 
have implemented controllers, router, Error handlers. Express Middleware can be used. Also, only credit card Luhn validation is handlled at backend all other validations I have handlled at frontend.

To keep it simple, I have used mock json file data.js instead calling any DB. But in real life I would store the data in DB using MERN stack (MongoDB,Express,React and Node.js)

### Testing
I have added test cases only for backend, for front end enzyme jest, snapshot testing can be used.
Postman can be used for API testing

GET all credit cards:
localhost:8080/api/getAll

POST to add new credit card:
localhost:8080/api/add
content-type: application/json;
Request Payload:
{"name":"Ash","cardNumber":"4532012937625444","limit":"3000","balance":"0"} 