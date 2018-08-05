var request = require('request');

it("should retrieve all friends", function (done) {
  request("http://localhost:3001/friends", function (error, response) {
    expect(response.statusCode).toEqual(200);
    done();
  });
});

it("should successfully add a friend", function (done) {
  request.post({ url: "http://localhost:3001/friends", json: { name: 'test name' } },
    function (error, response) {
      expect(response.statusCode).toEqual(201);
      done();
    });
});

it("should not add a friend without a name", function (done) {
  request.post({ url: "http://localhost:3001/friends", json: { } },
    function (error, response) {
      expect(response.statusCode).toEqual(422);
      done();
    });
});

it("should not delete a friend without providing an id", function (done) {
  request.post({ url: "http://localhost:3001/friends/delete", json: {id: 1} },
    function (error, response) {
      expect(response.statusCode).toEqual(200);
      done();
    });
});
