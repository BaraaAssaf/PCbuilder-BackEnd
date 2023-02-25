
const client = require('../connection');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'Pcbuilder1232@outlook.com',
    pass: 'Test@123456789'
  }
});



const sendEmail =  (Email, VerificationCode) => {

  var mailOptions = {
    from: 'Pcbuilder1232@outlook.com',
    to: `${Email}`,
    subject: 'PCbuldier Verification Code ',
    html: `<div style ="margin: 30px auto;">
    <div style=" background: #0fd59f; width: 100%;overflow:hidden;border-radius: 40px;">
          <h1 style="font-size: 23px;text-align: center;color:white;">Your Verification Code</h1>
    </div>
<div>
<p style="display: flex; font-size:20px;
justify-content: space-around; align-items: center;">
Enter this verification code in field:
</p>
<div style="width:30%;margin: 30px auto; background-color: #ddd; border-radius: 40px;text-align: center;font-size: 36px;">
<span>${VerificationCode}</span>
</div>
<p style="display: flex; font-size:20px;
justify-content: space-around; align-items: center;">Verification code is valid only for 30 minutes</p>
</div>
</div>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else setTimeout(function () {
      client.query(`delete from public."Verification" where  "UserEmail"= '${Email}'`).then(r => {
        console.log("delete")
      }).catch(err => { });
    }, 60000);
  });

}

// create json web token
const createToken = (token) => {
  return jwt.sign({ token }, 'baraa token');
};

// handle errors
const handleErrors = (err) => {

  let errors = { Email: '', password: '' };
  // duplicate email error
  if (err.code === "23505") {
    errors.Email = 'that email is already registered';
  }
  return errors;
}

const signup_post = async (req, res) => {
  let user = req.body;
  let VerificationCode = Math.floor(Math.random() * 99999 - 10000) + 10000;
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  let insertQuery = `insert into users("FirstName","LastName", "Email" , "Address" , "Phone" ) 
    values('${user.FirstName}', '${user.LastName}', '${user.Email}', '${user.Address}' , '${user.Phone}') ;
    insert into public."User_Login"("Email","password","role_id") 
    values('${user.Email}','${user.password}','${1}');`

  client.query(insertQuery).then(result => {
    const token = createToken(user);
    res.cookie('jwt', token, { httpOnly: true });
    sendEmail(user.Email, VerificationCode);
    res.send(token);

  }).catch(err => {
    const errors = handleErrors(err);

    res.send({ error: errors.Email, status: 400 });
    res.status(400);


  });
  client.end;
}


const login = async (req, res) => {
  const user = req.body;
  let a;
  client.query(`SELECT u."ID" as user_id,ul.* FROM public.users  u INNER JOIN public."User_Login" ul
                 ON u."Email" = ul."Email"
                where ul."Email" = '${user.Email}';`).then(async (result) => {

    if (result.rowCount != 0) {
      const auth = await bcrypt.compare(user.password, result.rows[0].password);
      if (auth) {

        const token = createToken(result.rows[0]);
        // const decoded = jwt.verify(token, 'baraa token');

        res.send(token);
      }
      else {
        res.send({ error: "password is incorrect", status: 400 });
        res.status(400);
      }
    }
    else {
      res.send({ error: " email is not registered", status: 400 });
      res.status(400);
    }

  }).catch(err => {
    res.send(err.message);
  });
  client.end;
}


const changePassword = async (req, res) => {
  const user = req.body;
  let a;
  client.query(`SELECT * FROM public."User_Login" 
                where "Email" = '${user.Email}';`).then(async (result) => {

    if (result.rowCount != 0) {
      const auth = await bcrypt.compare(user.OldPassword, result.rows[0].password);
      if (auth) {
        const salt = await bcrypt.genSalt();
        user.NewPassword = await bcrypt.hash(user.NewPassword, salt);
        let updateQuery = `
        update public."User_Login" 
        set "password" = '${user.NewPassword}'
        where "Email" = '${user.Email}'`;
        client.query(updateQuery).then(result => {
          res.send("Password is Changes");
        }).catch(err => {
          res.send(err.message);
        });
      }
      else {
        res.send({ error: "password is incorrect", status: 400 });
        res.status(400);
      }
    }
    else {
      res.send({ error: " email is not registered", status: 400 });
      res.status(400);
    }

  }).catch(err => {
    res.send(err.message);
  });
  client.end;
}

const ResendVerificationCode =  (req, res) => {
  let VerificationCode = Math.floor(Math.random() * 99999 - 10000) + 10000;
  let updateQuery = `update "Verification"
  set "VerificationCode" = ${VerificationCode}
  where "UserEmail" = '${req.body.Email}' `;

  client.query(`select "UserEmail" from public."Verification" where "UserEmail"='${req.body.Email}'`).then( (result) => {
    if (result.rowCount != 0) {
      client.query(updateQuery).then(result => {
        sendEmail(req.body.Email, VerificationCode);
        res.send("Resend Successful");
    
      }).catch(err => {
      });
    }
    else {
      client.query(`insert into "Verification"("VerificationCode", "UserEmail") 
          values('${VerificationCode}', '${req.body.Email}') ;`).then(result => {
              sendEmail(req.body.Email, VerificationCode);
            res.send("Resend Successful");
    
      }).catch(err => { });
    }
  })


}

const Verfiy = (req, res) => {

  client.query(`select * from public."Verification" where "UserEmail" ='${req.body.Email}'
  and "VerificationCode"=${req.body.VerificationCode}`).then((result) => {

    if (result.rowCount != 0) {

      client.query(`update "User_Login"
          set "isVerfiy" = true where "Email" = '${req.body.Email}'`).then(r => {
        client.query(`delete from public."Verification" where "ID"=${result.rows[0].ID}`);
      }).catch(err => { res.send(err.message); });
      res.send("The Email IS Verfiy");


    }
    else {
      res.status(201);
      res.send("Verification Code is not Valid please try agin")
    }
  }).catch(err => {
    res.send(err.message);
  });
}

module.exports = {
  signup_post,
  login,
  Verfiy,
  ResendVerificationCode,
  changePassword
}




