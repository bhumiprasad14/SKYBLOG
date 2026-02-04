import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
dotenv.config();
const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDb connected");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error)=>{
    console.log("Error connecting to MongoDB:",error);
});
