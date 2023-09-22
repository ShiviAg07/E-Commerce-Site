const {productSchema, reviewSchema}= require('./schemas');

module.exports.isLoggedIn = (req,res,next) => {

    //console.log(req.originalUrl);

    req.session.returnUrl= req.originalUrl;
    //it provides the url on which request is made
    if(req.xhr && !req.isAuthenticated()){
        if(req.session.returnUrl) {
            delete req.session.returnUrl;
        }
        return  res.status(401).json({msg: 'You need to login first'});
    }
        
    if(!req.isAuthenticated()){
        req.flash('error',"You need to login first to do that");
        return res.redirect('/login');
    }  

    next();
    
}

module.exports.validateProduct= (req,res,next)=>{
    const {name,img,desc,price}= req.body;
    const {error} = productSchema.validate({name,img,price,desc})
    if(error){
        const msg = error.details.map((err)=> err.message).join(',')
        return res.render('error',{err: msg});
    }
    next();
}


module.exports.validateReview = (req,res,next)=>{
    const {rating, comment}=req.body;
    const {error}= reviewSchema.validate({rating,comment});
    if(error){
        const msg = error.details.map((err)=> err.message).join(',')
        return res.render('error',{err: msg});
    }
    next();

}

module.exports.isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error','You are not authorized to do it');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error','You are not authorized to do it');
        return res.redirect('/products');
    }
    next();
}

module.exports.isProductAuthor= async(req,res,next)=>{
    //Getting a product id
    const { id }= req.params;
    const product= await Product.findById(id);
    if(!product.author.equals(req.user._id)) {
        req.flash('error','You are not authorized to do this action');
        return res.redirect(`/products/${id}`);
   }
   next();

}

