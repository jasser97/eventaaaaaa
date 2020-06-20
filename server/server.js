const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const cookieParser = require("cookie-parser");
const socketio = require("socket.io");
// const passport = require("passport");
const users = require("./routes/api/users");
const adherent = require("./routes/api/Adherent");
const event = require("./routes/api/event");
const chat = require("./routes/api/router");
const fav = require("./routes/api/favourite");
const reservation = require("./routes/api/reservation");
const followres = require("./routes/api/followres");
const comment = require("./routes/api/comment");
const video = require("./routes/api/video");
const abonne = require("./routes/api/abonne");
const commentVideo = require("./routes/api/commentVideo");
const like = require("./routes/api/likes");
const contact = require("./routes/api/contact");
const notification = require("./routes/api/notification");
const app = express();
const { addUser, getUser, removeUser, getUsersInRoom } = require("./UserChat");

// const cors = require("cors");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

const server = http.createServer(app);
const io = socketio(server);
io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.use("/uploadsVideo", express.static("uploadsVideo"));
app.use("/uploadsEvent", express.static("uploadsEvent"));
app.use("/uploads", express.static("uploads"));
app.use("/api/users", users);
app.use("/api/adherent", adherent);
app.use("/api/event", event);
app.use("/api/chat", chat);
app.use("/api/fav", fav);
app.use("/api/comment", comment);
app.use("/api/reservation", reservation);
app.use("/api/follow", followres);
app.use("/api/video", video);
app.use("/api/abonne", abonne);
app.use("/api/commentVideo", commentVideo);
app.use("/api/like", like);
app.use("/api/contact", contact);
app.use("/api/notification", notification);
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
);
