import { useEffect, useState } from "react";
import Chat from "./Chat";
import Room from "./Room";
import socket from "./socket";

const App = () => {
    const [room, setRoom] = useState("");
    useEffect(() => {
        socket.connect(); // kết nối khi app chạy
        socket.on("connect", () => {
            console.log("🔗 Kết nối socket ID:", socket.id);
        });
        return () => {
            socket.disconnect(); // cleanup khi rời app (nếu cần)
        };
    }, []);

    return room ? <Chat room={room} /> : <Room setRoom={setRoom} />;
};

export default App;
