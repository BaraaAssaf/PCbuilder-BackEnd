const client = require('../connection');

const createCart = (req, res)=>{
    let Cart = req.body;
    let insertQuery = `insert into "Cart"(userid , productid, quntity)
    values('${Cart.userid}','${Cart.productid}','${Cart.quntity}') RETURNING *;`
    client.query(insertQuery).then(result => {
        res.send(result.rows);
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const cartCountByid = (req, res)=>{
  client.query(`select Count(*) from "Cart" where
  "userid"=${req.params.id} `).then(result => {
      res.send(result.rows[0]);
    }).catch(err => {
      res.send(err.message);
    });
  client.end;
}

const getCartbyID = (req, res)=>{
    client.query(`select c.* , p."Productname", p."SellingPrice" ,p."ImagePath"  from "Cart" c
INNER JOIN public."Product" p
on c."productid" = p."ID"
where "userid"=${req.params.id}
ORDER BY "ID" ASC 
`).then(result => {
        res.send(result.rows);
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const updateCart = (req, res)=>{
    let Cart = req.body;
   if(Cart.quntity > 0 ){
    let updateQuery = `update "Cart"
                       set 
                       "quntity" = '${Cart.quntity}'
                       where "ID" = ${req.params.id}`;
    client.query(updateQuery).then(result => {
        res.send({message:"Update was successful"});
      }).catch(err => {
        res.send(err.message);
      });
    }
    else
    {
      client.query(`delete from "Cart" where "ID"=${req.params.id}`).then(result => {
        res.send('Deletion was successful');
      }).catch(err => {
        res.send(err.message);
      });
    }
    client.end;
}


module.exports = {
    getCartbyID ,
    updateCart , 
    createCart,
    cartCountByid
  }


