const client = require('../connection');
const fs = require("fs");



const createProduct = (req, res)=>{
    let Product = req.body;
    let insertQuery = `insert into "Product"("Productname","CostPrice", "SellingPrice", "Details", "Quntity")
    values('${Product.Productname}','${Product.CostPrice}','${Product.SellingPrice}',
    '${Product.Details}','${Product.Quntity}') ;`
    client.query(insertQuery).then(result => {
        res.send('insert was successful');
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const getAllProduct = (req, res)=>{
    client.query(`select * from "Product"
    ORDER BY "ID" ASC 
    `).then(result => {
        res.send(result.rows);     
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}


const updateProduct = (req, res)=>{
    let Product = req.body;
    let updateQuery = `update "Product"
                       set "Productname" = '${Product.Productname}',
                       "CostPrice" = '${Product.CostPrice}',
                       "SellingPrice" = '${Product.SellingPrice}',
                       "Details" = '${Product.Details}',
                       "Quntity" = '${Product.Quntity}'
                       where "ID" = ${req.params.id}`;
    client.query(updateQuery).then(result => {
        res.send({ Status:'Update was successful'});
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const deleteProduct = (req, res)=>{
    client.query(`delete from "Product" where "ID"=${req.params.id}`).then(result => {
        res.send({succses :"Deletion was successful"});
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const uploadimage =(req, res) => {
    const file = req.file;
   console.log(file)
     const base64Image =  Buffer.from(fs.readFileSync(file.path)).toString("base64");
     client.query(`
     UPDATE public."Product"
	SET "ImagePath"='${base64Image}'
	WHERE "ID"=${req.params.id};
     `).then(result=>
       {
       res.send(base64Image);
       }
     ).catch(err => {
         console.error(err.message);
         res.send({ success: false });
       }
     )
   }



module.exports = {
    getAllProduct ,
    updateProduct , 
    deleteProduct,
    createProduct,
    uploadimage
  }


