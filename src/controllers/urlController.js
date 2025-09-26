const pool = require('../config/db')
const {encode,decode} = require('../utils/shortCode')
const {StatusCodes} = require('http-status-codes')

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
  const print = await pool.query (
      `SELECT *
      FROM urls
      WHERE shortcode = $1`,
      [shortcode]
  )

  res.status(StatusCodes.CREATED).json(print.rows[0]);
}

const getShort = async (req,res) =>{
   const {params:{id:shortcode}} = req
        const result = await pool.query(
            `SELECT * 
            FROM urls
            WHERE shortcode = $1`,
            [shortcode]
        )
        const {id,accesscount, url} = result.rows[0];
        
        await pool.query(
          `UPDATE urls
           SET accesscount = $1,
           updatedat = NOW()
           WHERE shortcode = $2`,
           [Number(accesscount)+1,shortcode]
        )
        res.redirect(302, url)
    }


const updateShort = async (req,res) =>{
    const {params:{id:shortcode},body:{url}} = req
     
    

    await pool.query(
      `UPDATE urls
      SET url = $1, updatedat = NOW()
      WHERE shortcode = $2`,
      [url,shortcode]
    )
    const result = await pool.query(  
      `SELECT * 
      FROM urls
      WHERE shortcode = $1`,
      [shortcode]
    ) 
    
    res.json(result.rows)
}

const deleteShort = async (req,res) =>{
    const {params:{id:shortcode}} = req
    
    await pool.query(
      `DELETE FROM urls
       WHERE shortcode = $1 `,
       [shortcode]
      )

    res.status(StatusCodes.NO_CONTENT).send()
}
const getURLstats = async (req,res) =>{
  const {params:{id:shortcode}} = req
  const result = await pool.query(
    `SELECT * 
    FROM urls
    WHERE shortcode = $1`,
    [shortcode]
  )
  res.status(200).json(result.rows[0])

}
module.exports = {createShort, getShort, updateShort, deleteShort, getURLstats}