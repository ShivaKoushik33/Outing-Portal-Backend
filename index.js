const express=require("express");
const mongoose=require("mongoose");
const dotEnv=require("dotenv");
const port =process.env.PORT || 3000;
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.json());
const cors=require("cors");
const careTakerRoutes=require("./Routers/careTakerRouter");
const studentRoutes=require("./Routers/studentRouter");
const outingRoutes=require("./Routers/outingRouter");

app.use(cors({
    origin: 'https://outing-portal-frontend.vercel.app',
    methods: ['GET', 'POST',"PUT","DELETE"]  // Allow only GET and POST requests
  }));

//   app.use(cors({
//     // origin: 'https://outing-portal-frontend.vercel.app',
//     // methods: ['GET', 'POST',"PUT","DELETE"]  // Allow only GET and POST requests
//   }));

dotEnv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Mongoose Connected Successfully");
})
.catch((error)=>{
    console.log(error);
})


app.listen(port,()=>{
    console.log('Server started at PORT '+port);
})
app.use('/student',studentRoutes);
app.use("/caretaker",careTakerRoutes);
app.use("/outing",outingRoutes);
app.use("/",(req,res)=>{
    res.send("<h1>Outing </h1>");
})