const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.DB, 
            // {
            //     useNewUrlParser: true,
            //     UseUnifiedTopology: true, 
            //     useFindAndModify: false
            // }
        );
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.log(err.message);
    }
}

module.exports = connectDB;