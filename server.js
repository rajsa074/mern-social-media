require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = {
  origin: "https://mern-sdp-test.netlify.app/",
  Credential: 'true',
  
};


const app = express();

app.use(express.json())
app.options("*" , cors(corsOptions));
app.use(cors(corsOptions));
app.use(cookieParser())



//#region // !Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/adminRouter'));
//#endregion


const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}, err => {
    if(err) throw err;
    console.log("Database Connected!!")
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Listening on ",port);
})