import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs' // functions uses any component from this library must be async/await function
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },

    email : {
        type: String,
        required: [true, 'Please provide email'],
        validate:{
            validator: validator.isEmail,
            message: "Please provide a valid email"
        },
        unique: true,
    },

    password : {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false, // when we query or, when we try to fetch something from the database , if select --> false, then password will be exempted from the response of the mongodb
    },

    lastName : {
        type: String,
        default: 'lastName',
        maxlength: 20,
        trim: true,
    },

    location : {
        type: String,
        default: 'location',
        maxlength: 20,
        trim: true,
    },


})

UserSchema.pre('save', async function (){ // UserSchema.pre('save' --> ye basically function chlana h bss ekk before creating schema in database
   // everytime we invoke the schema to enter a new req.body in database, 'function' will be executed first --> basically to hash the password and then save it to database

    if(!this.isModified('password')) return 

   const salt = await bcrypt.genSalt(10);  // you have to be cautioues when the time comes in the update User functionallity in authController, when we do user.save() there ..password doest not come while querying, but in ---> this.password it takes password, therefore code will be blew up

   this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function() {
    
    return jwt.sign({userId : this._id }, process.env.JWT_SECRET,  {expiresIn : process.env.JWT_LIFETIME})
} 

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model('User', UserSchema) // User ke name se schema ko export kiya hai