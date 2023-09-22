const express= require('express');
const app= express();
const path= require('path');
const mongoose= require('mongoose');
const ejsMate= require('ejs-mate');
const methodoverride= require('method-override');
const session= require('express-session');
const flash= require('connect-flash');
const passport= require('passport');
const LocalStrategy= require('passport-local');
const User= require('./models/user');

app.engine('ejs',ejsMate);

mongoose.connect('mongodb://127.0.0.1:27017/shoppingApp')
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch(
    (err) =>console.log(err)
);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodoverride('_method'));


const sessionConfig = {
    secret: 'weneedsomebettersecret',
    resave : false,
    saveUninitialized:true,
    cookie: {
        httpOnly: true,
        expires: Date.now() +(1*7*24*60*60*1000),
        maxAge: 1*7*24*60*60*1000
    }
}

app.use(session(sessionConfig));
app.use(flash());

//Initialising the middleware for passsport
app.use(passport.initialize());
app.use(passport.session());

//used for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Telling the passport to check for username and password using authentication method provided by the passport local mongoose 
passport.use(new LocalStrategy(User.authenticate()));//passport local mongoose static method to configure 


app.use((req,res,next)=>{
    res.locals.currentUser= req.user;
    res.locals.success= req.flash('success');
    res.locals.error= req.flash('error');
    next();
})

//Routes
const reviewRoutes= require('./routes/review');
const productRoutes= require('./routes/product');
const authroutes= require('./routes/auth');
const cartRoutes= require('./routes/cart');

//Api's
const productapi= require('./routes/api/productapi');

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authroutes);
app.use(productapi);
app.use(cartRoutes);

const port = 5000;
app.listen(port, (req,res)=>{
    console.log('Server running at 5000');
});