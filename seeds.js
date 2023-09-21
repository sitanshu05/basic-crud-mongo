const Product = require("./schema/products");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/farmStand',{useNewUrlParser : true})
    .then(()=>{
        console.log(`Connected to MongoDB`);
    })
    .catch(err=>{
        console.error(`Error connecting to mongoDB`)
    });

const seedData = [
    {
        name : "Grape Fruit",
        price : 100,
        category : 'fruit'
    },
    {
      name: "Apple",
      price: 1.99,
      category: "fruit"
    },
    {
      name: "Carrot",
      price: 0.75,
      category: "vegetable"
    },
    {
      name: "Milk",
      price: 2.49,
      category: "dairy"
    },
    {
      name: "Banana",
      price: 1.25,
      category: "fruit"
    },
    {
      name: "Spinach",
      price: 1.50,
      category: "vegetable"
    }
  ];
  
  Product.insertMany(seedData)
  .then(p =>{
    console.log(p);
  })
  .catch(err => {
    console.log(err);
  })