import mongoose,{Schema} from "mongoose"

const achievementSchema=new Schema({
    committee:{
        type: Schema.Types.ObjectId,
        ref: 'Committee'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    contestDate:{
        type: Date
    },
    winners:{
        type: String,
    },
    year: {
        type: String,
        enum: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
        required: true,
      },
      department: {
        type: String,
        enum: ["CS", "IT", "ENTC", "EXTC"],
        required: true,
      }
},{timestamps: true})

export const Achievement=mongoose.model('Achievement',achievementSchema)