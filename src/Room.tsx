import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import socket from "./socket";

const Room = ({ setRoom }: { setRoom: Dispatch<SetStateAction<string>> }) => {
    const [value, setValue] = useState("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit("enter_room", value);
        setRoom(value);
    };
    return (
        <form className="mx-auto mt-10 max-w-sm" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="room" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Mã phòng
                </label>
                <input
                    type="room"
                    id="room"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="XXXXXX"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Apply
            </button>
        </form>
    );
};

export default Room;
