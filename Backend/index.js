const port=4000;
const express=require('express')
const nodemailer = require("nodemailer");
const app=express();
const mongoose=require('mongoose')
const path=require('path')
const jwt=require('jsonwebtoken')
const multer=require('multer')
const cors=require('cors');
const { setTimeout } = require('timers/promises');
app.use(express.json());
app.use(cors())
mongoose.connect('mongodb://localhost:27017/ecom')
app.get('/',(req,res)=>{
    res.send("Express app is running");
})

// Image storate engine
//admin login
const Admine=mongoose.model('Admine',{
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
    },
    
})
app.post('/adminsignup', async (req, res) => {
    try {
        const existingAdmin = await Admine.findOne({ username: req.body.username });
        if (existingAdmin) {
            return res.status(400).json({ success: false, errors: "Admin with this username already exists" });
        }
        const newAdmin = new Admine({
            username: req.body.username,
            password: req.body.password
        });
        await newAdmin.save();
        const token = jwt.sign({ adminId: newAdmin._id }, 'secretkey', { expiresIn: '1h' });
        return res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Error in admin signup:", error);
        return res.status(500).json({ success: false, errors: "Internal server error" });
    }
});
app.post('/adminlogin',async(req,res)=>{
    let user=await Admine.findOne({username:req.body.username});
    if(user){
        let passcompare=req.body.password===user.password;
        if(passcompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secretkey')
            res.status(201).json({ success: true, token });

        }
        else{
            res.json({success:false,errors:"Your password is not  matched"});
        }
    }
    else{
        res.json({success:false,errors:"Your username is not  matched"});
    }
})
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
const upload=multer({storage:storage});
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
//Database mode
//creating an admin user database

//creating an api for admin login



const Product=mongoose.model('product',{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }

})
//schema creating for the login sinup page
const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    password:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
//creating end point for registration
app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false,errors:"Existing user found with same email"})
    }
    let cart={};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
        
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();
    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({ success: true, token });
})
//Adding product to database
app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;

    }
    else{
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
       
        
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name
    })
})
//creating end point for logirn end point
app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        let passcompare=req.body.password===user.password;
        if(passcompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom')
            res.status(200).json({ success: true, token });

        }
        else{
            res.json({success:false,errors:"Your password is not  matched"});
        }
    }
    else{
        res.json({success:false,errors:"Your email is not  matched"});
    }
})
//Removing product from database
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed")
    res.json({
        success:true,
        name:req.body.name
    })
})
//creating an api for new colllection
app.get('/newcollection',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection)
})
//creting an end point for popularin women
app.get('/popular_women',async(req,res)=>{
    let products=await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    console.log("Popular in women Fetched");
    res.send(popular_in_women);
})
//Craeting an api for all products
app.get('/allproducts',async(req,res)=>{
    let products= await Product.find({});
    console.log("All products fetched");
    res.send(products)
})
//creating middleware to fetchuser
// Middleware for fetching user
const fetchuser = async (req, res, next) => {
    const token = req.headers['auth-token'];
    
    
    if (!token) {
        return res.status(401).json({ errors: token});
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            return res.status(401).json({ errors: "Invalid token" });
        }
    }
};

// Endpoint for adding to cart (protected with fetchuser middleware)
app.post('/addcart', fetchuser, async (req, res) => {
    try {
        const { itemId } = req.body;
        if (!itemId) {
            return res.status(400).json({ errors: "Item ID is required" });
        }

        let userdata = await Users.findOne({ _id: req.user.id });
        if (!userdata) {
            return res.status(404).json({ errors: "User not found" });
        }

        // Update cart data
        userdata.cartData[req.body.itemId] = (userdata.cartData[req.body.itemId] || 0) + 1;
        await Users.findByIdAndUpdate(req.user.id, { cartData: userdata.cartData });
        
        res.send("Item added to cart successfully");
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ errors: "An internal server error occurred" });
    }
});


// Endpoint for handling other requests...

// Server setup and listening
//For sending emails

app.listen(port,(error)=>{
    if(!error){
        console.log("Server is running on port "+port)
    }
    else{
        console.log("Error:"+error);
    }
})