const { log } = require("console");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
// Khởi tạo Express app và HTTP server
const app = express();
const server = http.createServer(app);
// Tạo một Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Địa chỉ React app
        methods: ["GET", "POST"],
    },
});
// Lắng nghe sự kiện kết nối từ client
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // io.to(socket.id).emit("message", Math.random());
    // Lắng nghe tin nhắn từ client
    socket.on("message", ({ message, room, ...rest }) => {
        console.log("Message from client:", room);
        io.to(room).emit("message", {
            ...rest,
            id: socket.id,
            message: message,
        });
    });

    socket.on("enter_room", (roomID) => {
        socket.join(roomID);
        console.log("Đã json thành công " + roomID);
        socket.to(roomID).emit("message", {
            id: "",
            name: "",
            message: "",
        });
    });
    // Khi client ngắt kết nối
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});
// Lắng nghe trên cổng 3001
server.listen(8080, () => {
    console.log("Listening on *:3001");
});
