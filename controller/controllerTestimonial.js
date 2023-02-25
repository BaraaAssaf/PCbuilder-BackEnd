const client = require('../connection');

const createTestimonial = (req, res)=>{
    let Testimonial = req.body;
    let insertQuery = `insert into "Testimonial"("userid" , "Message")
    values('${Testimonial.userid}','${Testimonial.Message}');`
    client.query(insertQuery).then(result => {
        res.send('insert was successful');
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const getAllTestimonial = (req, res)=>{
    client.query(`select T.* , u."FirstName" , u."LastName" , u."image" from "Testimonial" T inner join public.users u on u."ID" = T."userid"  ORDER BY "ID" ASC `).then(result => {
        res.send(result.rows);
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}

const getshowTestimonial = (req, res)=>{
  client.query(`select T.* , u."FirstName" , u."LastName" , u."image" 
  from "Testimonial" T inner join public.users u on u."ID" = T."userid"
  where T."Status" = 'show'
  `).then(result => {
      res.send(result.rows);
    }).catch(err => {
      res.send(err.message);
    });
  client.end;
}

const updateTestimonial = (req, res)=>{
    let Testimonial = req.body;

    let updateQuery = `update "Testimonial"
                       set "Status" = '${Testimonial.Status}'
                       where "ID" = ${req.params.id}`;
    client.query(updateQuery).then(result => {
        res.send({succses:'Update was successful'});
      }).catch(err => {
        res.send(err.message);
      });
    client.end;
}


module.exports = {
    createTestimonial,
    getAllTestimonial,
    updateTestimonial,
    getshowTestimonial
  }


