const express = require("express");

const app = express();
const path = require("path");

//steps to set up socket io
const http = require("http");
const socketio = require("socket.io");
const { render } = require("ejs");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", function (socket) {
  socket.on("send-location", (data) => {
    io.emit("recieve-location", { id: socket.id, ...data });
  });
  socket.on("disconnected", () => {
    io.emit("user-disconnected", { id: socket.id });
  });
});
app.get("/", function (req, res) {
  res.render("index");
});

server.listen(3000);
