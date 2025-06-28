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
