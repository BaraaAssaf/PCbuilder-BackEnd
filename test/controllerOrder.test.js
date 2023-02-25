/* {
    visanumber: confirmdata.visanumber,
    security_code: confirmdata.security_code,
    LocationDelivery: confirmdata.LocationDelivery,
    TotalPrice:confirmdata.TotalPrice,
    user_id: confirmdata.user_id,
  } */

const request = require("supertest");
const app = require("../app");
const client = require('../connection')

afterAll(async () => {
    await client.end();
  });
  
describe("Test Order", () => {
  test("Test GET", done => {
    request(app)
      .get(`/order`)
      .then(response => {
      expect(response.body).toEqual(expect.any(Array));
       done();
      });
  });
  test("Test GET statistics", done => {
    request(app)
      .get(`/order/statistics`)
      .then(response => {
      expect(response.body).toEqual(expect.any(Array));
       done();
      });
  });
  test("Test GET report", done => {
    request(app)
      .get(`/order/report`)
      .then(response => {
      expect(response.body).toEqual(expect.any(Array));
       done();
      });
  });
  test("Test GET order by id", done => {
    request(app)
      .get(`/order/${16}`)
      .then(response => {
        expect(response.body).toEqual(expect.any(Array));
        done();
      });
  });

  test("Test PUT Success ", done => {
    request(app)
      .put(`/order/${16}`).send( {
           "statue" :'Reject'
       })
      .then(response => {
        expect(JSON.parse(response.text).message).toEqual('Update was successful');
             done();
      });
  });

//skip
  test.skip("Test the Post Success ", done => {
    request(app)
      .post("/order/confirm").send( {
    "visanumber": 1234567891000,
    "security_code": 123,
    "LocationDelivery": "irbid",
    "TotalPrice": 90,
    "user_id": 77,
  })
      .then(response => {
        expect(response.body).toEqual(expect.any(Object));
        done();
      });
  }); 

  test("Test the Post Validation Error", done => {
    request(app)
      .post("/order/confirm").send( {
    "visanumber": "aaa",
    "security_code": 123,
    "LocationDelivery": "irbid",
    "TotalPrice": 90,
    "user_id": 77,
  })
      .then(response => {
        expect(JSON.parse(response.text).validation.body.message).toEqual('"visanumber" must be a number');
        done();
      });
  }); 

  test("Test the Post visa not valid", done => {
    request(app)
      .post("/order/confirm").send( {
    "visanumber": 123456789,
    "security_code": 123,
    "LocationDelivery": "irbid",
    "TotalPrice": 90,
    "user_id": 77,
  })
      .then(response => {
        console.log(response.text)
        expect(JSON.parse(response.text).error).toEqual("cheak your visa info and balance");
        done();
      });
  }); 

});

