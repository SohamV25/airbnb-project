if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const dbUrl = process.env.ATLASDB_URL;
const express = require('express');
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
engine = require('ejs-mate');
const flash = require('connect-flash')
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

// 2. The Modern Factory Method
const store = MongoStore.create({
    mongoUrl: dbUrl, // Use the variable you defined for Atlas
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

// 3. The Listener (To catch database connection issues)
store.on("error", (err) => {
    console.log("Error in Mongo Session Store", err);
});

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + (7 * 24 * 60 * 60 * 1000),
        maxAge : (7 * 24 * 60 * 60 * 1000),
        httpOnly : true
    }
}
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingRouter = require("./routs/listing.js");
const reviewsRouter = require("./routs/review.js");
const userRouter = require("./routs/user.js");
const { log, error } = require('console');



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(session(sessionOptions));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());


app.use(passport.initialize());//initialize passport
app.use(passport.session());//to understand whether is it a same user or different user
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.engine('ejs', engine);


// Function to connect to db
async function main(){
    await mongoose.connect(dbUrl);
}

// calling the main method 
main()
    .then(()=>{
        console.log("Connected to Mongose DB");
    })
    .catch((err)=>{
        console.log(err);
        
    });

// Testing the / route
// app.get("/", (req, res)=>{
//     res.send("This is the root")
// })


app.use("/listings", listingRouter); //All listings path

app.use("/listings/:id/reviews",reviewsRouter)//All Reviews path

app.use("/", userRouter);//for signup

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});
// We use /(.*)/ which is Regex for "Match anything"

app.use((err, req, res, next)=>{
    let{statusCode=500, message="Something Went Wrong"} = err;
    res.status(statusCode).render("error.ejs", {err});
})

app.listen(port, ()=>{
    console.log(`listening to : http://localhost:${port}`);
    
})