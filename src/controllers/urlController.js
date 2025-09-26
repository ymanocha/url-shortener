const pool = require('../config/db')
const {encode,decode} = require('../utils/shortCode')


const createShort = async (req,res)=>{
  const {url} = req.body
//   const shortCode = encode();
  const result = await pool.query(
    `INSERT INTO urls (url)
    VALUES ($1) RETURNING id`,
    [url]
  );
  const id = result.rows[0].id;
  const shortcode = encode(id);
  await pool.query(
    `UPDATE urls
     SET shortcode = $1
     WHERE id = $2`,
     [shortcode, id]
  )
  res.json({id,url,shortcode});
}

const getShort = async () =>{
    res.send('ej')
}

const updateShort = async () =>{
    res.send('ej') 
}

const deleteShort = async () =>{
    res.send('ej') 
}

module.exports = {createShort, getShort, updateShort, deleteShort}