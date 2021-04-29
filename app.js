const express = require('express');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const session = require('express-session');
const user = require('./model/users');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const productRouter = require ('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');


const NODE_ENV = 'dev';
const SESS_NAME ='user';
const SESS_SECRET ='hush,secret time';
const SESS_LIFETIME = 1000 *60 *60;


mongoose.connect
('mongodb+srv://user1:Admin12@cluster0.rfjki.mongodb.net/myCartApp?retryWrites=true&w=majority',
{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology:true
}).then( () =>{console.log('DB connection successful')});


const sessionAuth = (req, res, next) =>{
  const user = req.session.user;
  if(!user)
  {
    res.status(401).send("Please log into your user");
  }else next();
}

const app=express();
app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(session(
  {
    name:SESS_NAME,
    secret:SESS_SECRET,
    store: MongoStore.create(
      {
        mongoUrl:'mongodb+srv://user1:Admin12@cluster0.rfjki.mongodb.net/myCartApp?retryWrites=true&w=majority',
        collection:'sessions',
        ttl:parseInt(SESS_LIFETIME/1000),
      }),
    resave:false,
    cookie:{
      sameSite:true,
      secure:process.env.NODE_ENV === 'production',
      maxAge:parseInt(SESS_LIFETIME),
    },
  }
));




app.use(morgan('combined'));

app.use('/',userRouter);

app.use('/',sessionAuth,cartRouter);
app.use(productRouter);
app.use('/',sessionAuth,orderRouter);

 //catch 404 and forward to error handler
 app.use(function (req,res,next){
  next(createError(404));
})

//Error Handler
app.use(function(err,req,res,next){
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development ' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render('error');
}); 


const port = process.env.PORT || 3001;
app.listen(port, () =>{
  console.log(`Server started... Listening on port ${port}`)
});



module.exports = app;
