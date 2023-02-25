const client = require('../connection');


const getAllUser = (req, res)=>{
    client.query(`select * from users
    ORDER BY "ID" ASC `).then(result => {
        res.send(result.rows);
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const getUserbyID = (req, res)=>{
    client.query(`select * from users where "ID"=${req.params.id}`).then(result => {
        res.send(result.rows);
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const updateUser = (req, res)=>{
    let user = req.body;
    let updateQuery = `update users
                       set "FirstName" = '${user.FirstName}',
                       "LastName" = '${user.LastName}',
                       "Email" = '${user.Email}',
                       "Address" = '${user.Address}',
                       "Phone" = '${user.Phone}'
                       where "ID" = ${req.params.id}`;
    client.query(updateQuery).then(result => {
        res.send('Update was successful');
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const deleteUser = (req, res)=>{
    client.query(`delete from users where "ID"=${req.params.id}`).then(result => {
        res.send('Deletion was successful');
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const uploadimage = (req, res) => {
  // const file = 'RMI_8817.JPG';
  const file = req.file;
 
   const base64Image =  Buffer.from(fs.readFileSync(file.path)).toString("base64");
   client.query(`UPDATE public.users	SET image='${base64Image}' WHERE "ID"=${req.params.id};`).then(result=>
     {
     console.log("sssssssusss")
     res.send(base64Image);
     }
   ).catch(err => {
       console.error(err.message);
       res.send({ success: false });
     }
   )
 }

module.exports = {
    getAllUser ,
    getUserbyID ,
    updateUser , 
    deleteUser,
    uploadimage
  }


