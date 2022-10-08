const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const {URI} = require('./config/keys.js');


app.use(cors());

mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on("connected",() => {
    console.log("successfully connected to the server");
})
mongoose.connection.on("error",(err) => {
    console.log("successfully connected to the server",err);
})

require('./models/user');
require('./models/post');
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("/",(req, res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log('listening on port ' + PORT);
})
