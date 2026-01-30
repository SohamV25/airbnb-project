const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initialize_data = require("./data.js");


const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
mongoose.connect(MONGO_URL);

async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
    .then(()=>{
        console.log("Connected to Mongose DB");
    })
    .catch((err)=>{
        console.log(err);
        
    });

const initialize_DataBase = async () =>{
    await Listing.deleteMany({});
   initialize_data.data = initialize_data.data.map((obj)=>{ 
    return {...obj, owner:"696ba43d90b9efcbeac3fdf8"}
    });
    await Listing.insertMany(initialize_data.data);
    console.log("Data was initialized and data was inserted");
}

initialize_DataBase();

