const express = require('express')
var router = express.Router()
var pool = require('./pool.js')

router.get('/index',(req,res)=>{
  console.log(req.method)
  var sql = 'select * from swiperList'
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result)
  })
})
module.exports = router