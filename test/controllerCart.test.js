
const request = require("supertest");
const app = require("../app");
const client = require('../connection')

afterAll(async () => {
    await client.end();
  });
  
describe("Test Cart", () => {
  test("Test GET by id", done => {
    request(app)
      .get(`/cart/${77}`)
      .then(response => {
      expect(response.body).toEqual(expect.any(Array));
       done();
      });
  });

  test("Test GET count by id", done => {
    request(app)
      .get(`/cart/count/${77}`)
      .then(response => {
      expect(JSON.parse(response.text)).toEqual(expect.any(Object));
       done();
      });
  });

  //skip
  test.skip("Test the Post Success ", done => {
    request(app)
      .post("/cart/").send( {
        "userid": 77,
        "productid" : 2,
        "quntity" : 1
        })
      .then(response => {
        expect(response.body).toEqual(expect.any(Array));
        done();
      });
  }); 


  test("Test the Post Validation Error ", done => {
    request(app)
      .post("/cart/").send( {
            "userid": "",
          "productid" : 2,
          "quntity" : 1
            })
       
      .then(response => {
        expect(response.statusCode).toEqual(400);
        expect(JSON.parse(response.text).validation.body.message).toEqual('"userid" must be a number');
                done();
      });
  });


  test("Test PUT if quntity equal 0 ", done => {
    request(app)
      .put(`/cart/${26}`).send( {
         "quntity" : 0
        })
      .then(response => {
        expect(response.text).toEqual('Deletion was successful');
             done();
      });
  });


  test("Test PUT Success ", done => {
    request(app)
      .put(`/cart/${27}`).send( {
        "quntity" : 5
       })
      .then(response => {
        expect(JSON.parse(response.text).message).toEqual('Update was successful');
             done();
      });
  });

});

