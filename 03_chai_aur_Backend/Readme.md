# chai aur Backend 

/*
## Algorithm :-
1. Get user details from frontend req.body postmen
2. validation user data - not empty
3. Check if user alredy exist using unique data like username or email
4. Check for images, check for avtar
5. upload them to cloudinary - udhr se url milega and some check
6. Hashed Password
7. Create user object - create entry in db
8. Remove password and refresh token field from response
9. Check for user Creation
10. Return response

|File Handeling Steps| :-
1. Import multer in user Router
2. post request ke baad aur registeruser jane se phle multer middelware pe milke jana upload.fields
3. fields method accepts array
4. hame 2 fields chahiye avtar and cover img so create 2 objects usme name maxCount set krde
*/