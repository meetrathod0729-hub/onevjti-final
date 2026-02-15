import mongoose, {Schema} from "mongoose"

const eventRegistrationSchema=new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    event:{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    fullName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
    registrationId: {
        type: String,
        required: true
    },
    registeredAt:{
        type: Date,
        default: Date.now
    }
},{timestamps: true})

export const EventRegistration=mongoose.model('EventRegistration',eventRegistrationSchema )