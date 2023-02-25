const client = require('../connection');

const createContactus = (req, res)=>{
    let Contactus = req.body;
    let insertQuery = `insert into "ContactUS"("Name" , "Email", "Subject" , "Message")
    values('${Contactus.Name}','${Contactus.Email}','${Contactus.Subject}' ,'${Contactus.Message}');`
    client.query(insertQuery).then(result => {
        res.send('insert was successful');
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const getAllContactus = (req, res)=>{
    client.query(`select * from "ContactUS"  ORDER BY "ID" ASC `).then(result => {
        res.send(result.rows);
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const deleteContactus = (req, res)=>{
    client.query(`delete from "ContactUS" where "ID"=${req.params.id}`).then(result => {
        res.send('Deletion was successful');
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}


module.exports = {
  createContactus,
  deleteContactus,
  getAllContactus
  }


