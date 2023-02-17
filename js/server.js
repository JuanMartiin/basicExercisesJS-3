const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require('dotenv').config();
var path = require('path');
var token;

app.use(express.json());



//----------------------ERROR--------------------------------------

app.use(express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '..', '/js')));
//----------------------ERROR--------------------------------------



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err => {
        if (err) return res.sendStatus(403);

        next();
    }));
}

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const userCorrect = "ejemplo";
const passwordCorrect = "12345678";

app.post("/login", async (req, res) => {
    // create token
    
    if(req.body.user == userCorrect && req.body.password == passwordCorrect){
        console.log("entra");
        const token = jwt.sign({
            user: req.body.user,
            password: req.body.password,
        }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json({
            error: null,
            data: { token }
        });
    }else{
        res.send({data: false});
    
    }
});

app.get('/authenticated', authenticateToken, async (req, res) => {
        res.send({data: true});
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});
