const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const csurf = require('csurf');
const passport = require('passport');

//Setup route middlewares
const csrfProtection = csurf(); //cookie false
router.use(csrfProtection);
// var csrfProtection = csrf({ cookie: true })

/* GET home page. */
router.get('/', function(req, res, next) {
  let products = Product.find((err,docs)=>{
    let productChunk = [];
    const chunkSize = 3;
    for(let i=0; i<docs.length;i+=chunkSize){
      productChunk.push(docs.slice(i,i+chunkSize))
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunk });
  });
  
});

/*******Sign up page**********/ 
router.get('/user/signup', (req,res,next) =>{
  // pass the csrfToken to the view
  let messages = req.flash('error');
res.render('user/signup',{csrfToken: req.csrfToken(),messages : messages, hasErrors: messages.length>0});
})

router.post('/user/signup',passport.authenticate('local.signup',{
  successRedirect:'/user/profile',
  failureRedirect:'/user/signup',
  failureFlash:true
}));


/*******Profile page**********/ 
router.get('/user/profile', (req,res,next) =>{
res.render('user/profile');
})


/*******Login page**********/ 
router.get('/user/signin', (req,res,next) =>{
  // pass the csrfToken to the view
  let messages = req.flash('error');
res.render('user/signin',{csrfToken: req.csrfToken(),messages : messages, hasErrors: messages.length>0});
})

router.post('/user/signin',passport.authenticate('local.signin',{
  successRedirect:'/user/profile',
  failureRedirect:'/user/signin',
  failureFlash:true
}));



router.get('/user/logout', function(req,res){
  req.logout();
  res.redirect('/');
})

module.exports = router;
