const express = require("express");
const app = express();
const socket = require("socket.io");
const server = app.listen(8080, function () {
  console.log("listening to requests on port 8080.");
});

// static files

app.use(express.static("public"));

// sockets setup

const io = socket(server);

let user = 1;

io.on("connection", function (socket) {
  socket.id = `user ${user}`;
  user++;
  console.log("made a socket connection", socket.id);

  socket.on("chat", function (data) {
    io.sockets.emit("chat", { data: data, nick: socket.id });
  });
  //   socket.on("typing", function (data) {
  //     socket.broadcast.emit("typing", data);
  //   });
});
