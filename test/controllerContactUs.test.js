const request = require("supertest");
const app = require("../app");
const client = require('../connection')

afterAll(async () => {
    await client.end();
  });
  
describe("Test ContactUs", () => {
  test("Test GET method", done => {
    request(app)
      .get("/contactus/")
      .then(response => {
      expect(response.body).toEqual(expect.any(Array));
       done();
      });
  });

  //skip
  test.skip("Test the Post method Success ", done => {
    request(app)
      .post("/contactus/").send( {
          "Name": "Ahamd",
          "Email": "A@gmail.com",
          "Subject": "Test",
          "Message": "Test Message"
        })
      .then(response => {
        expect(response.text).toEqual("insert was successful");
                done();
      });
  }); 

  test("Test the Post Validation Error ", done => {
    request(app)
      .post("/contactus/").send(
        {
            "Name": "Ahamd",
            "Email": "Agmail.com",
            "Subject": "Test",
            "Message": "Test Message"
          }
       )
      .then(response => {
        expect(response.statusCode).toEqual(400);
        expect(JSON.parse(response.text).validation.body.message).toEqual('"Email" must be a valid email');
                done();
      });
  });

  test("Test DELETE Success ", done => {
    request(app)
      .delete(`/contactus/${20}`)
      .then(response => {
        expect(response.text).toEqual('Deletion was successful');
             done();
      });
  });

  test("Test DELETE Success ", done => {
    request(app)
      .delete(`/contactus/i`)
      .then(response => {
        expect(response.text).toEqual('column "i" does not exist');
             done();
      });
  });

});

