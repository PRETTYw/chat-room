let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const nickname = "user" + Math.ceil(Math.random() * 1000);
  socket.broadcast.emit("connection", nickname + " connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", nickname + ": " + msg);
  });
});

http.listen(3000, () => {});
