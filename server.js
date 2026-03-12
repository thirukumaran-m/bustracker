const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let busLocation = { lat: 0, lon: 0 };

io.on("connection", (socket) => {

  socket.on("sendLocation", (data) => {
    busLocation = data;
    io.emit("busLocation", busLocation);
  });

  socket.emit("busLocation", busLocation);

});

http.listen(3000, () => {
  console.log("Server running on port 3000");
});