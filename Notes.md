# Latest Concepts :-

- In Node js process.exit ()

1. Gracefully stopping on success = process.exit(0)
2. Exiting on error = process.exit(1)

- mongoose aggregate package is used for write aggregation queries

# Files :-

1. Index
2. DB
3. Models
4. Controllers
5. Routes
6. Middelwares
7. Utils

# Routes:

1. / : Home Route
2. /login : login Route
3. Total: 65,536 ports

# Steps:

1. npm init
2. Create package.json
3. Script Start
4. Install Express
5. Create Express Server
6. Install DotEnv : For Sensitive Data Store
7. Import Then env.config() Then We Can Use Info in the env file by Process.env
8. In case of import type is module

# Deploy Notes:

1. Here we can use Platform like aws, azure, digital Ocean
2. git ignore me node_modules and .env add krde
3. Push Code on Github
4. click on app get source code from github add git repository
5. webservice lena hai paid rhti hai then add env varibles
6. deploy hone ke baad url milta he

# FrontEnd BackEnd Connect:

1. Cors : used to connect fe and be
2. express.static is middleware used to add all frontend file inside backend folder as a dist folder
3. To avoid cors use proxy in vite.config.js

# Data Modeling

### Moon Modelar :- - Is a data Modeling tool for mongoDB

- Steps:- 1.import mongoose, 2.create new mongoose.schema, 3.export const User = mongoose.model("User", userSchema)
- The User or any other is converted into plural form and small alphabets in db (users) Todo ka (todos)
- created at and Updated at is the comman fields in mongoose so use timestamps true after in anoter object
- To refer type or data from another model use mongoose.Schema.Types.objectId aur uske baad ref: "jha se refer krna hai wo file"
- Subtodos ko todos ke andar refer hamesha array me krna best use practice
- Images Hamesha URL me store hote hai url as a string so we use cloudnary site use to convert image into url
- Enum is used to restrict a field to a set of predefined values. which is in array

# Boiler Plate code :-

                        import mongoose from 'mongoose';
                        const subTodoSchema = new mongoose.Schema({}, { timestamps: true });
                        export const SubTodo = mongoose.model('SubTodo', subTodoSchema);

## Tools:

- stackblitz, codesandbox, github codespaces:- it creates an environment which we want : installation ki grj nh

# Setup of Professional Backend Project:-

## Create Public folder:

- under that create an temp folder
- under that create gitkeep file

## Git Ignore file generator:

- It is tool used for create usefull .gitignore files for your project

## Create an .env file

- To keep secrets

## Create an Source Folder

- Under that create app.js, constants.js, index.js filess
- Source Folder Use to organize files

## Install Nodemon : -D

- It is in devDependancy which used in development of your project, not in production.

## Install Prettier : -D

- It also devdependancy
- It used to Auto-format your code

## prettierignore :-

- file ignore env, vs code settings as well node_modules

## Database Connection :-

- Using MongoDB Atlas
- Always allow Network Access means Ip
- database Acces me username dikhta he
- Then move to Clusters and tap connect
- Go to Drivers or Campass you got string copy it
- paste it into env mongodb_uri
- Hamesha DB try catch me Block karo good practice
- DB is always in another Continent so use async await because time lgta he
- DB ka name constant me save kre aur use db.js file me add kre while connecting database

## Mongoose :-

- Mongoose-aggregate-paginate-v2 package is used to write aggreagte queries in models
- It use with Schema like schema.plugin(m-a-p) then we write queries
- Mongoose allows us to write some middelware such as pre post it used to before saving and after saving data
- use of pre and post hook Schema.pre or post ("events", callback async func(next){LOGIC next()})
- Here callback me hamesha normal func use krna because arrow ke pass this ka reference nh hota

### Debugging DB :-

1. Check env file username and password
2. Check import .js is imp
3. check code and export

## Requirements:

1. dotenv
2. mongoose
3. Express
4. cookieparser
5. Cors
6. mongoose-aggregate-paginate-v2
7. bcryptjs
8. jwt
9. cloudinary
10. Multer

## Express:-

- req.params :- url se data lena h to
- req.body :- frontend se data lena h to
- req.cookies :- cookies se data lena h to

## Middelwares:-

- parse :- parse means convert data into useable structure
- Middleware in Express.js is a function that has access to the request, response
- In simple word its checking between request and response
- app.use matlab middelware
- Cookieparser :- is to make it easy to read and manage cookies in an Express.js
- urlencoded :- It parse form data means it parse incoming request by post request
- express.static :- It allows Express to serve those files directly as it is

## app.js Folder :-

- Isme humne express app create kiya hai aur use export kiya hai
- and We add some middelwares inside it like cookieparsrer, cors, express static, urlencoded, json, etc

## Index.js Folder :-

- Isme humne DB Import krke connect kr rkha hai aur env file add krkr rkha he

## Error Handeling :-

- humne error handel krne ke liye utilities create kiya hai
- asyncHandeler me handeler function ke errors handel honge
- ApiHandeler me Api req ke errors handel honge
- ApiResHandeler me Api res ke errors handel honge

## bcryptjs or bcrypt :-

- Install bcrypt.js
- A library helps to hashed your Password
- eg.mySecret123 converted into $2a$10$gWUvR8b2z9XBqp6lBQcBze4mC. This string stored in DB
- It used before storing pass in db so use pre middeleware
- this.password = bcrypt.hash(this.password, 10)
- har baar check kro ki password modified h ya nh nh to hr baar password save hoga
- After bcrypt password check password is correct or not by using bcrypt.compare which gives jo user dega wo password or dusra jo bcrypt ne save kiya
- it takes time so use await and return

## JWT :-

- Install Jwt json web token
- JWT is secure way to transmit data between two parties
- A JWT has 3 parts, separated by dots (.)
- A jwt is bearer type of token jo bh bhejega use data bhej dega
- In env file Access_Token_Secret = get from secret key genrator in google
- In env file Access_Token_Expiry = 1d, 1hr
- REFRESH TOKEN :- A Refresh Token is a special kind of JWT that lets the user stay logged in after the access token expires, without forcing them to log in again.

# Boiler Plate :-

                 userSchema.methods.generateAccessToken = function () {
                    return jwt.sign(
                        {
                        _id: this._id,
                        email: this.email,
                        username: this.username,
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
                        }
                    );
                    };

## Flow Of JWT :-

- user log-in, If user valid, server generates jwt sends to client
- client stores jwt in cookies or localstorage
- after client login second time It creates new jwt token unless old token expires

### Header : It use Hs256 algorithm and type jwt

### Payload : It Contains data about user and issued and expired timestamp

### Signature : It has Secret Key

# File Upload Or Handeling:-

## Step-by-Step Flow:-

- User uploads a file (image/pdf/video) from frontend.
- Use Multer to store it temporarily
- File is sent to your Node.js backend.
- Backend uses Cloudinary SDK to upload the file to Cloudinary.
- Cloudinary returns a URL, which is stored in MongoDB.
- You serve that URL to the frontend to display the image.

- Here We Use Cloudinary Site For Uploading and Handeling Files
- We also use Multer or express.js file upload packages
- Cloudinary ham Utilities me rakhte hai
- In cloudinary think alredy the file is in local server hame bs ise path deke cloudinary pe upload krna he uske baad cloudinary use aws ya upr server upload krega

## Steps :-

- import cloudinary and fs
- env me clodinary name , API key, API secret store krde
- then cloudinary config ({ process.env}) krke info fill up krdo
- then uploadonCloudinary name ka func banao usme phle check kro ki localpath hai ya nh then he to cloudinary.uploder.upload lagake usme url daldo aur resourse type : auto krdo aur succefull msg print krdo
- async await aur try catch lgado in sabko response me store krdo
- In catch section : error ane pr bh file to bnti h isliye fs.unlink krne ka

## Multer :-

- It is a middleware part
- Use of multer is to parse files qki express me ye nh file parse nh hota

# HTTP Crash Course :-

- Hyper text Transfer protocol
- HTTP Headres:- Its a metadata (key-value) pairs sent along with req & res
- Use with caching, Authentication, Manage states
- Req Headers -> From Client, Res Headres -> From Server, Represn Header -> Encoding, Payload headers -> Data(id, email)

### Most Comman Headers:-

                        - Accept : which type of data accept json/applicaton
                        - User Agent : postmen / which browser send req
                        - Authorization : Bearer or jwt token
                        - Content Type : img, pdf
                        - Set-Cookie :Used by server to send cookies
                        - Cache-Control : kitne der baad data expire krna h

### Cors Headers :-

                        - Origin :
                        - credentials :
                        - methods :

# HTTP Methods :-

- Basic Set Of Operations That Can Be Used To Interact With Server - Get : retrieve a resource - Head : No msg body (response headers only) - Options : What operations are avaliable - Trace : get some dat - Delete : remove a resource - Put : Replace a Resource - Post : Interact with resource (mostly add) - Patch : Change part of Resource

# HTTP Status Code :-

                        - 1xx - Informational
                        - 2xx - Success
                        - 3xx - redirection
                        - 4xx - Client Error
                        - 5xx - Server Error

# API :-

- Application Programming Interface

# Router And Controller :-

## Steps Router :-

            1. In Router Folder We create an User.routes Router
            2. Then import Router from express then create router and export
            3. Then In app.js Import user router
            4. Then create router api (http://localhost:8000/api/v1/users/register) and give an controller name
            5. Then control goes to router file where we can add requests by using router.route("/register").post(registeruser)
            6.Then control goes to register controller
            7. To check response mil rha ya nh use postman or thunder client vs code extension on google
