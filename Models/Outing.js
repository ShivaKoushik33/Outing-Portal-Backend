const mongoose=require("mongoose");

const outingSchema=new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:"Student",
        required:true
    },
    careTakerId:{
        type:mongoose.Schema.ObjectId,
        ref:"CareTaker"
    },
    year:{
            type:String,
            enum:["P1","P2","E1","E2","E3","E4"],
            required:true
        
    },
    reason:{
        type:String,
        required:true
    },
    
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
      },
    requestDate:{
        type:Date,
        default:Date.now
    },
    outingDate:{
        type:Date,
        required:true,
        validate:{
            validator:function(value){
                const dateStr =new Date();
                const today=new Date(Date.parse(dateStr));
                const oneWeekFromNow=new Date();
                oneWeekFromNow.setDate(today.getDate()+7);
                const after7days=new Date(Date.parse(oneWeekFromNow));
                return value>=today && value<=after7days;
            },
            message:"Outing date must be within 1 week from today"
        }
    },
    slot:{
        type:String,
        enum:['morning','afternoon','evening'],
        default:'morning'
    }

})

const Outing=mongoose.model("Outing",outingSchema);
module.exports=Outing;