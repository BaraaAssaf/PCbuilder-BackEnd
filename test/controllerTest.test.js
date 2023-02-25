 const request = require("supertest");
const app = require("../app");
const client = require('../connection')

afterAll(async () => {
    await client.end();
  });
  
describe("Test Testimonial", () => {
  test("Test GET All", done => {
    request(app)
      .get("/testimonial/")
      .then(response => {
      expect(response.body).toEqual(expect.any(Array));
       done();
      });
  });

  test("Test GET Show", done => {
    request(app)
      .get("/testimonial/show")
      .then(response => {
      expect(response.body).toEqual(expect.any(Array));
       done();
      });
  });

  //skip
  test.skip("Test the Post Success ", done => {
    request(app)
      .post("/testimonial/").send( {
        "Message": "any thing",
        "userid": 77
        })
      .then(response => {
        expect(response.text).toEqual("insert was successful");
                done();
      });
  }); 

  test("Test the Post Validation Error", done => {
    request(app)
      .post("/testimonial/").send( {
        "Message": 56,
        "userid": 77
        })
      .then(response => {
        expect(JSON.parse(response.text).validation.body.message).toEqual('"Message" must be a string');
                done();
      });
  }); 

  test("Test PUT Success", done => {
    request(app)
      .put(`/testimonial/${1}`).send( 
        {
        "Status": "hide"
          }
       )
      .then(response => {
        expect(JSON.parse(response.text).succses).toEqual('Update was successful');
             done();
      });
  });


});

