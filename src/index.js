const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const database = require("./mongodb")
const collection = database.employee
const comCollection = database.employer

const tempelatePath=path.join(__dirname , '../tempelates') // naming tempelates insted of views in folder name
app.use(express.static(__dirname + '/public'));// for css

app.use(express.json())
app.set("view engine" , "hbs")
app.set("views" , tempelatePath)
app.use(express.urlencoded({extended:false}))

app.get("/" ,(req , res)=>{
    res.render("homepage")
})
app.get("/login" , (req,res)=>{
    res.render("login")
})

app.get("/signup" , (req,res)=>{
    res.render("signup")
})

app.get("/emlogin" , (req,res)=>{
    res.render("emlogin")
})

app.get("/emsignup" , (req,res)=>{
    res.render("emsignup")
})


app.post("/signup" ,async (req,res)=>{

    const data={
        name:req.body.name,
        password:req.body.password
    }

    await collection.insertMany([data])

    res.render("home")
})

app.post("/login" ,async (req,res)=>{

    try{
        const check=await collection.findOne({name:req.body.name})

        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong password")
        }
    }
    catch{

        res.send("user with this name and password does't exists !")
    }
    
})

app.post("/emsignup" ,async (req,res)=>{

    const data={
        name:req.body.name,
        password:req.body.password,
        cname:req.body.cname,
        cpassword:req.body.cpassword
    }

    await comCollection.insertMany([data])

    res.render("home")
})

app.post("/emlogin" ,async (req,res)=>{

    try{
        const check=await comCollection.findOne({name:req.body.name})

        if(check.password===req.body.password){
            if(check.cname === req.body.cname){
                if(check.cpassword === req.body.cpassword){
                    res.render("home")
                }
                else{res.send("wrong comany password")}
            }
            else{res.send("wrong company name")}
        }
        else{
            res.send("wrong password")
        }
    }
    catch{

        res.send("user with this name and password ,cname and cpassword does't exists !")
    }
    
})


app.listen(3000 , ()=>{
    console.log("port is connected");
})