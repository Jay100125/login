const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/loginSignin")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect database");
})

const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const EmLoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cname:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("Collection1" , LoginSchema)
const comCollection = new mongoose.model("comCollection1" , EmLoginSchema)

module.exports = {
    employee: collection,
    employer: comCollection,
}
