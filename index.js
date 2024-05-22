require('dotenv').config();
var express =require('express');
var app =express();
const cors=require('cors');
const connectDB=require('./service/db')

const APPLICATION_PORT=process.env.PORT

connectDB();

app.use(cors());
app.use(express.json());
app.use('/sign',require('./routes/sign'));
app.use('/login',require('./routes/login'));
app.use('/blog',require('./routes/posts'));
app.use('/like',require('./routes/like'));
app.use('/comment',require('./routes/comment'));



app.listen(APPLICATION_PORT,()=>{
    console.log(`Sever is Live on ${APPLICATION_PORT}`)
});
