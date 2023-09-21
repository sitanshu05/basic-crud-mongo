const express = require("express"); 
const mongoose = require('mongoose');
const path = require('path');
const Product = require("./schema/products")
const methodOverride = require("method-override")


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

app.get('/products',async (req,res)=>{
    
    const products = await Product.find();
    res.render("products/index", {products});
});

app.get('/products/new', (req,res)=>{
    res.render("products/new")
});

app.post('/products' ,(req,res)=>{
    console.log(req.body)
    Product.create(req.body);
    res.redirect('/products')
})
app.delete('/products/:id', async(req,res)=>{
    const {id} = req.params;

    await Product.findByIdAndDelete(id);
    res.redirect('/products')

})
app.get('/products/:id',async (req,res)=>{

    const {id} = req.params;

    const product = await Product.findById(id);
    console.log(product)
    res.render("products/detail", {product});
});
app.put('/products/:id',async (req,res)=>{
   
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators : true , new: true});
    res.redirect(`/products/${id}`);

})
app.get('/products/:id/edit', async (req,res)=>{

    const {id} = req.params;

    const product = await Product.findById(id);

    res.render("products/edit", {product})
})


app.listen(3000,()=>{
    console.log("Listening on port 3000")
});
