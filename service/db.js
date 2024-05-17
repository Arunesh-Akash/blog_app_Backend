const mongoose=require('mongoose');

const connectDB=async ()=>{
    await mongoose.connect(process.env.MONGO_URL).then(()=>
    console.log("Database is connected")
    ).catch((err)=>
    console.log(err)
)
}

module.exports=connectDB;
