const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require("passport")

const customerRoutes = require('./routes/customerRoutes')
const statsRoutes = require('./routes/statsRoutes')

dotenv.config();

mongoose.connect('mongodb+srv://otb:otb@cluster0.mheoi.mongodb.net/Camping?retryWrites=true&w=majority',
    {
       useNewUrlParser: true, 
       useUnifiedTopology: true
   
    });
   
    const db = mongoose.connection;
   db.on("error", console.error.bind(console,"connection error:"));
   db.once("open", () => {
       console.log("Database connected");
   });



   app.use(cors());
   app.use(express.urlencoded({extended: true}));
   app.use(bodyParser.json());
   app.use(cookieParser(process.env.COOKIE_SECRET))
   app.use(express.json());


   app.use('/customer',customerRoutes);
   app.use('/stats',statsRoutes);

   app.get('/', (req,res) => {
    res.send('homepage working');
});

   app.listen(process.env.PORT, () => {
    console.log("Server is running on port: "+process.env.PORT)
})
