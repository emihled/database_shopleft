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
  let [data] =  await pool.query("DELETE FROM products WHERE (`product_code` = 'dea1')", [product_code])

  return data
} 

app.delete('/products/:product_code', async (req, res)=>{
    let product_code = req.params.product_code
   await deleteproductsDb(product_code);

    res.json({products: await deleteproductsDb()})
})

// const insertProduct = async (product_code, product_name, product_price,product_quantity ) => {
//     await pool.query (
//         'INSERT INTO products VALUES(?,?,?,?',
//         [product_code, product_name, product_price,product_quantity]
//     )
    
// }

const postProductDb = async ({ product_code, product_name, product_price,product_quantity }) => {
  let [data] = await pool.query(
    "INSERT INTO products (`product_code`, `product_name`, `product_price`, `product_quantity`) VALUES (?, ?, ?, ?)",
    [product_code, product_name, product_price, product_quantity]
  );

  return data;
};

await postProductDb({
  product_code: "ho6",
  product_name: "mphokoqo",
  product_price: 10.22,
  product_quantity: 4
});

const patchProductDb = async ({product_code, product_name, product_price, product_quantity}) => {
  const [data] = await pool.query(
    "UPDATE products SET product_price = ?, product_price = ?, product_quantity = ? WHERE (`product_code` = ?)"
    [product_name, product_price, product_quantity, product_code]
  );

  return data;
};

await patchProductDb({
  product_code: "ho1",
  product_name: "mphokoqo",
  product_price: 10.22,
  product_quantity: 2
});


app.listen(2000, () => {
    console.log('http://localhost:2000');
})
