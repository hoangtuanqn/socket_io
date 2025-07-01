import { useEffect, useRef, useState, type FormEvent } from "react";
import socket from "./socket";
interface MessageType {
    id: string;
    room: string;
    name: string;
    message: string;
}
const Chat = ({ room }: { room: string }) => {
    const [listMsg, setListMsg] = useState<MessageType[]>([]);
    const [msg, setMsg] = useState<MessageType>({
        id: "NO",
        room,
        name: "Unknown",
        message: "",
    });
    const [idSocket, setIdSocket] = useState<string>(() => localStorage.getItem("id_socket") || "");
    const frameChat = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        socket.on("message", (message) => {
            setListMsg((prev) => [...prev, message]);
            // console.log(message);
        });
        return () => {
            socket.off("message");
        };
    }, []);
    useEffect(() => {
        if (frameChat.current) {
            frameChat.current.scrollTop = frameChat.current.scrollHeight;
            localStorage.setItem("id_socket", socket.id || "");
            setIdSocket(socket.id ?? "");
            setMsg((prev) => ({
                ...prev,
                id: socket?.id || "",
            }));
        }
    }, [listMsg]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit("message", msg);
        setMsg((prev) => ({
            ...prev,
            message: "",
        }));
        // console.log(msg.id, idSocket);
    };
    return (
        <div className="mx-auto max-w-2xl p-5">
            <h1 className="mb-5 text-xl">
                Mã phòng: <span className="font-bold text-red-600">{room}</span>
            </h1>
            <div className="flex h-[500px] flex-col gap-5 overflow-auto rounded-2xl border p-4" ref={frameChat}>
                {listMsg.map((mess, index) => (
                    <>
                        {mess.message ? (
                            <div
                                key={mess.id + mess.message + index}
                                className={`${mess.id == idSocket ? "ml-auto" : "mr-auto"} block w-fit max-w-[80%] rounded-2xl bg-sky-400 px-4 py-2 text-white`}
                            >
                                <span className="block font-bold">{mess.name}</span>
                                <span className="">{mess.message}</span>
                            </div>
                        ) : (
                            <span className="block text-center text-sm font-medium italic">
                                Vừa có người join vào nhóm
                            </span>
                        )}
                    </>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mt-10 mb-6 grid gap-6">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={msg?.name || ""}
                        onChange={(e) =>
                            setMsg((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Nhập họ và tên của bạn"
                        required
                    />
                    <input
                        type="text"
                        id="message"
                        name="message"
                        value={msg?.message || ""}
                        onChange={(e) =>
                            setMsg((prev) => ({
                                ...prev,
                                message: e.target.value,
                            }))
                        }
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Nhập tin nhắn của bạn"
                        required
                    />
                    <button className="w-fit cursor-pointer rounded-xl bg-sky-600 px-5 py-2 text-sm text-white">
                        Nhắn
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat;
