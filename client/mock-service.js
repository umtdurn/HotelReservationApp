const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
const port = 7188;
const data=require("./src/constant/data")

app.use((req, res, next) => {
  console.log(`Yeni istek: ${req.method} ${req.url}`);
  next();
});



app.get('/products', (req, res) => {
   res.send(data);
});

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = data.find(item => item.id === productId);
  
  if (product) {
    res.send(product);
  } 
});

app.post('/login', (req, res) => {
   res.send(200,{
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiaWQiOiI2NjQzY2I5MzY4YjliYjgxNTMzZjdiMTUiLCJleHAiOjE3MTY1NjUyMjN9.oirVfafAyIXf4_eGomM8IvR4nyN31nVaiUGMqvhCu0M"
  });
});

app.post('/check-token', (req, res) => {
  res.send(200,{"message":"ok"});
});

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});


