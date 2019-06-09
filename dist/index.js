"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 6379;
app.get('/', function (req, res) {
  return res.send('Hello');
});
app.listen(port, function () {
  return console.log("app listens on port ".concat(port, "!"));
});