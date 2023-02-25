const request = require("supertest");
const app = require("../app");
const client = require('../connection')

afterAll(async () => {
    await client.end();
  });
  
describe("Test the SginUP", () => {
//skip
  test.skip("Test the SginUP method Success", done => {
    request(app)
      .post("/users/sginup").send( {
            "Email":"Ahmad112@gmail.com",
          "FirstName": "Ahmad",
          "LastName": "Saleh",
          "Phone": "+8876543218",
          "Address": "irbid",
          "password": "test1234"
      })
      .then(response => {
      expect(response.text).toEqual(expect.any(String));
       done();
      });
  });

  test("Test the SginUP method  duplicate email Error ", done => {
    request(app)
      .post("/users/sginup").send( {
            "Email":"Ahmad1@gmail.com",
          "FirstName": "Ahmad",
          "LastName": "Saleh",
          "Phone": "+8876543218",
          "Address": "irbid",
          "password": "test1234"
      })
      .then(response => {
      expect(JSON.parse(response.text).error).toEqual('that email is already registered');
       done();
      });
  });

  test("Test the SginUP method Validation Error", done => {
    request(app)
      .post("/users/sginup").send( {
            "Email":"Ahmad1@gmail.com",
          "FirstName": "Ahmad",
          "LastName": "Saleh",
          "Phone": "+8876543218",
          "Address": "irbid",
          "password": "test123"
      })
      .then(response => {
      expect(JSON.parse(response.text).validation.body.message).toEqual('"password" length must be at least 8 characters long');
       done();
      });
  });
});


describe("Test the Login", () => {

    test("Test the Login method Success", done => {
      request(app)
        .post("/users/login").send( {
              "Email":"Ahmad1@gmail.com",
              "password": "test1234"
        })
        .then(response => {
        expect(response.text).toEqual(expect.any(String));
         done();
        });
    });
  
    test("Test the Login method not registered Error", done => {
      request(app)
        .post("/users/login").send( {
              "Email":"fffff@gmail.com",
            "password": "test1234"
        })
        .then(response => {
        expect(JSON.parse(response.text).error).toEqual(" email is not registered");
         done();
        });
    });

    test("Test the Login method Error incorrect password", done => {
        request(app)
          .post("/users/login").send( {
                "Email":"Ahmad1@gmail.com",
              "password": "test1238"
          })
          .then(response => {
          expect(JSON.parse(response.text).error).toEqual("password is incorrect");
           done();
          });
      });

      test("Test the Login method Validation Error", done => {
        request(app)
          .post("/users/login").send( {
                "Email":"Ahmadgmail.com",
              "password": "test1238"
          })
          .then(response => {
          expect(JSON.parse(response.text).validation.body.message).toEqual('"Email" must be a valid email');
           done();
          });
      });
  });


  
describe("Test Change Password", () => {

    test("Test Change Password Success", done => {
      request(app)
        .post("/users/change").send( {
            "Email" : "Ahmad1@gmail.com",
             "OldPassword" : "test1234",
               "NewPassword" : "test1234"
         })
        .then(response => {
        expect(response.text).toEqual("Password is Changes");
         done();
        });
    });
  
    test("Test Change Password not registered Error", done => {
      request(app)
        .post("/users/change").send( {
            "Email" : "ffff@gmail.com",
             "OldPassword" : "test1234",
               "NewPassword" : "test12345"
         })
        .then(response => {
        expect(JSON.parse(response.text).error).toEqual(" email is not registered");
         done();
        });
    });

    test("Test Change Password Error incorrect password", done => {
        request(app)
          .post("/users/change").send({
            "Email" : "Ahmad1@gmail.com",
             "OldPassword" : "test12346",
               "NewPassword" : "test1234"
         })
          .then(response => {
          expect(JSON.parse(response.text).error).toEqual("password is incorrect");
           done();
          });
      });
  });


  describe("Test Verify", () => {

    test.skip("Test Verify Success", done => {
      request(app)
        .post("/users/Verfiy").send({
            Email: 'Ahmad1@gmail.com',
            VerificationCode: "17854"})
        .then(response => {
        expect(response.text).toEqual("The Email IS Verfiy");
         done();
        });
    });
  
    test("Test Verify  not Valid", done => {
      request(app)
      .post("/users/Verfiy").send({
        Email: 'Ahmad1@gmail.com',
        VerificationCode: "17554"})
        .then(response => {
        expect(response.text).toEqual("Verification Code is not Valid please try agin");
         done();
        });
    });
  });

