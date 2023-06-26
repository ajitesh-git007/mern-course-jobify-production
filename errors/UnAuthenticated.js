import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError.js";

export default class UnAuthenticated extends CustomAPIError{
     constructor(message){
        super(message)

        this.statuscode = StatusCodes.UNAUTHORIZED
     }
}