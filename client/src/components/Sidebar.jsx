import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { del, get } from "../api/endpoint";

const Sidebar = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const getPreviousChats = async () => {
        try {
            setLoading(true);

            const { data } = await get("/ai/email-history");

            if (data.success) {
                setHistory(data.history);
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPreviousChats();
    }, []);

    const deleteChat = async (chatId) => {
        try {
            const res = await del(`/ai/delete-chat/${chatId}`);
            if(res.data.success){
                getPreviousChats();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="flex h-full flex-col bg-white">
            <div className="sticky top-0 flex items-center justify-between border-b bg-white px-4 py-4">
                <h2 className="text-lg font-semibold">Chats</h2>

                <Link
                    to="/"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white hover:bg-blue-700"
                >
                    +
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-3">
                {loading ? (
                    <p className="text-center text-sm text-gray-500">
                        Loading...
                    </p>
                ) : history.length === 0 ? (
                    <p className="text-center text-sm text-gray-500">
                        No chats found
                    </p>
                ) : (
                    history.map((chat) => (
                        <div 
                            key={chat._id}
                            className="group mb-2 flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 transition hover:bg-gray-100"
                        >
                            <Link to={`/details/${chat._id}`} className="line-clamp-2 flex-1 text-sm text-gray-700">
                                {chat.prompt}
                            </Link>

                            <button onClick={()=>deleteChat(chat._id)} className="ml-3 text-gray-400 transition hover:text-red-500">
                                <FaTrash size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Sidebar;