import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
    company : {
        type: String,
        required: [true, 'Please provide company name'],
        minlength: 3,
        
        
    },

    position : {
        type: String,
        required: [true, 'Please provide position name'],
        minlength: 3,
        
        
    },

    status : {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
        minlength: 3,
        maxlength: 100,
        
    },

    jobType : {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time',
        minlength: 3,
        maxlength: 100,
        
    },

    jobLocation : {
        type: String,
        // required: [true, 'Please provide the job location'],
        minlength: 3,
        maxlength: 100,
        
        
    },

    createdBy: {    // to establish the relationship between the created job and the creator, who created this job, createdBy --> will contain the ObjectId that mongodb will generate for each user
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide User'],

    },

},

    {timestamps: true}


)

export default mongoose.model('Job', JobSchema)