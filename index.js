const express = require("express"); 
const mongoose = require('mongoose');
const path = require('path');
const Product = require("./schema/products")
const methodOverride = require("method-override")
const AppError = require('./AppError');


const app = express();

mongoose.connect('mongodb://localhost:27017/farmStand',{useNewUrlParser : true})
    .then(()=>{
        console.log(`Connected to MongoDB`);
    })
    .catch(err=>{
        console.error(`Error connecting to mongoDB`)
    });


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
    res.send("Home");
});

app.get('/error',(req,res)=>{
    mad.bro();
});

app.get('/products',async (req,res,next)=>{
    
    try{
        const products = await Product.find();
        res.render("products/index", {products});
    }catch(err){
        next(new AppError('Products not found',404))
    }
});

app.get('/products/new', (req,res)=>{
    // throw new AppError("Not allowed",500); //for non async functions
    res.render("products/new")
});

app.post('/products' ,async (req,res,next)=>{
    try{
           await Product.create(req.body);
    }catch(err){
        next(new AppError('Cannot Create',504))
    }
    res.redirect('/products')
})
app.delete('/products/:id', async(req,res,next)=>{
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
    }catch(err){
        next(new AppError('Products not found',404))
    }
    res.redirect('/products')

});

app.get('/products/:id',async (req,res,next)=>{

    const {id} = req.params;
    let product;

    try{
         product = await Product.findById(id);
    }
    catch(err){
        next(new AppError('Product not found',404));
    }
    res.render("products/detail", {product});
});

app.put('/products/:id',async (req,res,next)=>{
   
    const {id} = req.params;
    try{
        const product = await Product.findByIdAndUpdate(id,req.body,{runValidators : true , new: true});
        res.redirect(`/products/${id}`);
    }catch(err){
        next(new AppError('Products not found',404))
    }

})
app.get('/products/:id/edit', async (req,res,next)=>{

    const {id} = req.params;
    try{
        const product = await Product.findById(id);
        res.render("products/edit", {product})
    }catch(err){
        next(new AppError('Products not found',404))
    }
});

app.use((err,req,res,next)=>{
    const {status=500,message = 'something went wrong'} = err;
    res.status(status).send(message);
});


app.listen(3000,()=>{
    console.log("Listening on port 3000")
});
