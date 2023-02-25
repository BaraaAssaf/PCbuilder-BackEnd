const request = require("supertest");
const app = require("../app");
const client = require('../connection')

afterAll(async () => {
    await client.end();
  });
  
describe("Test the Product", () => {
  test("Test the GET method success", done => {
    request(app)
      .get("/product/")
      .then(response => {
      expect(response.body).toEqual(expect.any(Array));
       done();
      });
  });

//skip
  test.skip("Test the Post method Success ", done => {
    request(app)
      .post("/product/").send( {
          "Productname": "sssss",
          "CostPrice": 20,
          "SellingPrice": 23,
          "Details": "16 GB",
          "Quntity": 50
        })
      .then(response => {
        expect(response.text).toEqual("insert was successful");
                done();
      });
  }); 

  test("Test the Post method Validtion Error ", done => {
    request(app)
      .post("/product/").send({
        "Productname": "Ram",
        "CostPrice": "",
        "SellingPrice": 23,
        "Details": "16 GB",
        "Quntity": 50
      } )
      .then(response => {
        expect(response.statusCode).toEqual(400);
        expect(JSON.parse(response.text).validation.body.message).toEqual('"CostPrice" must be a number');
                done();
      });
  });

  test("Test the PUT method Success ", done => {
    request(app)
      .put(`/product/${20}`).send({
        "Productname": "Ram",
        "CostPrice": 45,
        "SellingPrice": 23,
        "Details": "16 GB",
        "Quntity": 50
      })
      .then(response => {
        expect(JSON.parse(response.text).Status).toEqual('Update was successful');
             done();
      });
  });

  test("Test the PUT method Validtion Error ", done => {
    request(app)
      .put(`/product/${20}`).send({
        "Productname": "Ram",
        "CostPrice": 45,
        "SellingPrice": 23,
        "Details": "16 GB"
      })
      .then(response => {
        expect(JSON.parse(response.text).validation.body.message).toEqual('"Quntity" is required');
             done();
      });
  });

});

