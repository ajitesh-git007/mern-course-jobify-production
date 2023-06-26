import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
// import CustomAPIError from '../errors/CustomAPIError.js'
import  BadRequestError  from '../errors/BadRequestError.js'
import NotFoundError from '../errors/NotFoundError.js'
import UnAuthenticated from '../errors/UnAuthenticated.js'




const register = async  (req, res) =>{
  
       const {name, email, password} = req.body
       
       if(!name || !email || !password){
        throw new BadRequestError('Please provide all the fields')
       }

       const UserAlreadyExists = await User.findOne({email})

       if(UserAlreadyExists){
        throw new BadRequestError("Email already in use")
       }

       const user = await User.create({name, email, password}) // this line it uses schema, and as soon as this line hits, it sends the content of request to the databse
       const token = user.createJWT()
       res.status(StatusCodes.CREATED).json({ user:{email:user.email, lastName: user.lastName, location: user.location, name: user.name}, token, location: user.location })
    
   
}

const login = async (req, res) =>{
    // res.send('login user')
    const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError("Please fill all the values")
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        throw new UnAuthenticated("Invalid Credentials")
    }
    console.log(user)

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnAuthenticated("Invalid Credentials")
    }
    const token = user.createJWT()
    user.password = undefined


    res.status(StatusCodes.OK).json({user, token, location: user.location})
}

const updateUser = async (req, res) =>{
    // console.log(req.user)
    
    const { email, name, lastName, location } = req.body

    if(!email || !name || !lastName ||  !location){
        throw new NotFoundError('Please provide all values!')
    }

    const user = await User.findOne({_id:req.user.userId});

    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location

    await user.save()

     const token = user.createJWT()

     res.status(StatusCodes.OK).json({user, token})


    res.send('updateUser')
}

export { register, login, updateUser } 