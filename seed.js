const mongoose= require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/shoppingApp')
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch(
    (err) =>console.log(err)
);

const products= [
    {
        name: 'Samsung Galaxy S10',
        img: 'https://images.unsplash.com/photo-1560849735-f0a88439a4a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2Ftc3VuZyUyMGdhbGF4eSUyMHMxMHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60',
        price: 259.4,
        desc:'A smartphone with a lot of features and specifications.'
    },
    {
        name: 'Apple iPhone XR',
        img: 'https://images.unsplash.com/photo-1506025883753-c77a55138eae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXBwbGUlMjBpUGhvbmUlMjB4cnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60',
        price:3786 ,
        desc:"The best phone in the world"
    },
    {
        name: "LG Videoo",
        img: 'https://images.unsplash.com/photo-1589113101810-41b0eef2f243?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGclMjB2aWRlb298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60',
        price :  2500,
        desc :"This is an LG mobile"
    },
    {
        name: 'Bicycle',
        img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60',
        price:   200,
        desc:'The widest range of Bicycles Shop Now and get the best deals'
    },
    {
        name: 'Bluetooth',
        img: 'https://images.unsplash.com/photo-1674741172361-4681f76a5f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxnJTIwdmlkZW9vfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60',
        price:    250,
        desc:'Get your favorite music on this boat'
    },
    {
        name: 'Macbook',
        img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60',
        price:  5000,
        desc:'Our most powerful notebooks. Fast M1 processors, incredible graphics, and spectacular Retina displays. Now available in a 14-inch model.'
    },
    {
        name: 'Nike Shoes',
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmlrZSUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60',
        price: '2100',
        desc: 'Best to have'
    }
];


async function seedDB(){
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded');
}

seedDB();