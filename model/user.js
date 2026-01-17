import mongoose from"mongoose"

const cohortFourSchema = new mongoose.Schema(
  {
name:{type:String, required:true},
email:{type:String, required:true, unique:true},
phone:{type:String, required:true, unique:true},
password:{type:String, required:true},
country:{type:String, required:false},
state :{type:String, required:false},
address :{type:String, required:false}

  },
  {timestamps:true}
)
const cohortFour = mongoose.model("cohortFour",cohortFourSchema)
export default  cohortFour