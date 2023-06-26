import UnAuthenticated from "../errors/UnAuthenticated.js"
import jwt from 'jsonwebtoken'



const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnAuthenticated('Invalid Authentication')
    }

    const token = authHeader.split(' ')[1]
    console.log(token)

    

    console.log(req.headers)

    try{
      const payload = jwt.verify(token, process.env.JWT_SECRET)
    //   // attach the user request object
    //   // req.user = payload
    req.user = {userId: payload.userId}
    console.log("here goes --------> ")
      next()
    }
    catch(error){
         throw new UnAuthenticated('Invalid Authentication')
    }
    
    // next()
}

export default auth

// import UnAuthenticated from "../errors/UnAuthenticated.js";
// import jwt from "jsonwebtoken";

// const auth = async (req, res, next) => {
//   console.log("Inside auth middleware"); // Add this line

//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     throw new UnAuthenticated("Invalid Authentication");
//   }

//   const token = authHeader.split(" ")[1];
//   console.log("Token:", token); // Add this line

//   console.log("Request headers:", req.headers); // Add this line

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { userId: payload.userId };
//     next();
//   } catch (error) {
//     throw new UnAuthenticated("Invalid Authentication");
//   }
// };

// export default auth;
