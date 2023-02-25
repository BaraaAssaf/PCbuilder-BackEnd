

  const client = require('../connection');


const confirmOrder = async (req, res)=>{
  const Visa = await   client.query(`select * from public.visa_card
  where "visanumber"=${req.body.visanumber} and "security_code"=${req.body.security_code}
  and "expirydate" >= CURRENT_DATE;`);
  if(Visa.rows.length > 0){
    let Order = req.body;
    let insertQuery = `insert into "Order"("OrderDate","TotalPrice", "LocationDelivery",  user_id)
    values(CURRENT_DATE,'${Order.TotalPrice}','${Order.LocationDelivery}','${Order.user_id}') RETURNING *;`
    client.query(insertQuery).then(result => {
     const orderid = result.rows[0].ID;
      client.query(`select * from "Cart"
      where "userid"=${Order.user_id}`).then(cart =>
        {
          cart.rows.forEach(element => {
            client.query( `insert into "OrderProduct"(orderid , productid, "Quntity")
            values('${orderid}','${element.productid}','${element.quntity}');
            update "Product"
            set "Quntity" = "Quntity"-'${element.quntity}'
            where "ID" = ${element.productid}`
            )
          });
        client.query(`delete from "Cart" where "userid"=${Order.user_id}`);
        client.query(`UPDATE public.visa_card
          SET balance=balance-${Order.TotalPrice}
          WHERE "ID" = ${Visa.rows[0].ID};`);
          res.send(result.rows)
        })

      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}
else
{
  res.status(400);

  res.send({error:"cheak your visa info and balance"});
}
}

const getAllOrder = (req, res)=>{
    client.query(`select o.* , u."FirstName" , u."LastName" from "Order" o INNER JOIN public.users  u 
                   ON u."ID" = o."user_id"
                   ORDER BY "ID" ASC 
                   `).then(result => {
        res.send(result.rows);
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const report = (req, res)=>{
  client.query(`SELECT to_char("OrderDate", 'Month YYYY') AS monthn,
  DATE_PART('month', "OrderDate") AS month,
    SUM("TotalPrice") AS TotalPrice
    FROM public."Order"
    GROUP BY monthn , month
    Order by month 
                 `).then(result => {
      res.send(result.rows);
    }).catch(err => {
      res.send(err.message);
    });
  client.end;
}


const getOrderbyID = (req, res)=>{
    client.query(`Select op."orderid" , op."Quntity" , p."Productname" , 
    p."ImagePath", p."SellingPrice" from public."OrderProduct" op
    inner join 
    public."Product" p on op."productid" = p."ID"
    where orderid = ${req.params.id}`).then(result => {
        res.send(result.rows);
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const statistics  = (req, res)=>{
  client.query(`SELECT 'Sales Today' AS label,SUM("TotalPrice") AS value
  FROM public."Order"
  WHERE "OrderDate" >= DATE_TRUNC('day', CURRENT_DATE) 
  AND "OrderDate" < DATE_TRUNC('day', CURRENT_DATE + INTERVAL '1 day')
  UNION ALL
  Select 'Total User Count' AS label, Count("ID") AS value from public.users
  UNION ALL
  Select 'Total Product Count' AS label,  Count("ID") As value from public."Product";`).then(result => {
      res.send(result.rows);
    }).catch(err => {
      res.send(err.message);
    });
  client.end;
}


const updateOrder = (req, res)=>{
    let Order = req.body;
    let updateQuery = `update "Order"
                       set "statue" = '${Order.statue}'
                       where "ID" = ${req.params.id}`;
    client.query(updateQuery).then(result => {
      res.send({message:"Update was successful"});
    }).catch(err => {
        res.send(err.message);
      });
    client.end;
}


module.exports = {
    getAllOrder ,
    getOrderbyID ,
    updateOrder , 
    confirmOrder,
    report,
    statistics 
  }



