import  Job  from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/BadRequestError.js'
import NotFoundError from '../errors/NotFoundError.js'
import UnAuthenticated from '../errors/UnAuthenticated.js'
import checkPermissions from '../utlis/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'



const createJob = async (req, res) =>{
    // res.send('create job')

    const { company, position, jobLocation } = req.body

    if(!company || !position){
        throw new BadRequestError('Please provide all values')
    }

    req.body.createdBy = req.user.userId


    const job = await Job.create(req.body)

    res.status(StatusCodes.CREATED).json({job})


}



const getAllJobs = async (req, res) =>{
    
    const jobs = await Job.find({createdBy: req.user.userId })

    res.status(StatusCodes.OK).json({jobs, totalJobs: jobs.length, numOfPages: 1})
    
    // res.send('get all job')
}

const updateJob = async (req, res) =>{
    
    const { id: jobId } = req.params

    const { company, position } = req.body

    if(!company || !position){
        throw new BadRequestError(`Please provide all values!`)
    }

    const job = await Job.findOne({ _id: jobId });

    if(!job){

        throw new NotFoundError(`No job with id: ${jobId}`)
        
    }


    checkPermissions(req.user, job.createdBy)
    
    
    const updatedJob = await Job.findOneAndUpdate({_id: jobId}, req.body, {new: true, runValidators: true})
    res.status(StatusCodes.OK).json({updatedJob})
    
    
}

const deleteJob = async (req, res) =>{
   
    const { id: jobId } = req.params

    const job = await Job.findOne({ _id: jobId });

    if(!job){

        throw new NotFoundError(`No job with id: ${jobId}`)
        
    }


    checkPermissions(req.user, job.createdBy);

    // await job.remove()
    await Job.deleteOne({ _id: jobId });

    res.status(StatusCodes.OK).json({msg: `Success! job removed`})



}

const showStats = async (req, res) =>{
    let stats = await Job.aggregate([    // seggregating the jobs in the database on the basis of their ids that they combine and provide all the jobs created by a that user
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId)}}, // The new mongoose.Types.ObjectId() is used to convert the userId into a valid MongoDB ObjectId for the matching.

        { $group: { _id: `$status`, count: { $sum: 1} } } //The _id field specifies the grouping key, and the count field stores the count of jobs in each group.
    ])

    stats = stats.reduce((acc, curr) => {
         
         const { _id: title, count } = curr
         acc[title] = count
        
        return acc
    },{})

    const defaultStats = {
        pending: stats.declined || 0,
        interview: stats.interview || 0,
        declined: stats.pending || 0,
    }

    let monthlyApplications = await Job.aggregate([

      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId)}},

      { $group: { _id: { year: { $year: `$createdAt` }, month: { $month: `$createdAt` }}, count: {$sum: 1},  } },

      {$sort: { '_id.year': -1, '_id.month': -1 }}, // because i want to take latest 6 months

      { $limit: 6 },


    ])


    monthlyApplications = monthlyApplications.map((item) => {

    const { _id: {year, month }, count } = item

    const date = moment().month(month-1).year(year).format('MMM Y')
    
    return {date, count}


    }).reverse()




    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
}


export { createJob, deleteJob, getAllJobs, updateJob, showStats }