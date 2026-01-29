import express from 'express';
import mysql from "mysql2/promise";

const app = express()

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "shopleft",
    password: ""
});

const getUsersDb = async () => {
  let [data] =  await pool.query('SELECT * FROM users;');
  return data
} 

app.get('/users', async (req, res)=>{
    res.json({users: await getUsersDb()})
})

const getproductsDb = async () => {
  let [data] =  await pool.query('SELECT * FROM products;');
  return data
} 

app.get('/products', async (req, res)=>{
    res.json({products: await getproductsDb()})
})

const deleteproductsDb = async (product_code) => {
  let [data] =  await pool.query("'DELETE FROM products WHERE (`product_code` = ?)", [product_code])

  return data
} 

app.delete('/products/:product_code', async (req, res)=>{
    let product_code = req.params.product_code
   await deleteproductsDb(product_code);

    res.json({products: await deleteproductsDb()})
})

app.listen(2000, () => {
    console.log('http://localhost:2000');
})
