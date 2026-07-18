import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { get } from "../api/endpoint";
import Sidebar from "../components/Sidebar";

const ChatDetails = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState(null);

  const getChatDetails = async () => {
    try {
      const { data } = await get(`/ai/email-history/${id}`);

      if (data.success) {
        setChat(data.chat);
      }
    } catch (error) {
      toast.error("Failed to load chat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        Chat not found.
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-72px)] bg-[#f7f7f8] overflow-hidden">
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">Chats</h2>

          <button onClick={() => setOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        <Sidebar />
      </div>

      <aside className="hidden lg:block w-72 border-r bg-white overflow-y-auto">
        <Sidebar />
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center p-4 lg:hidden">
          <button onClick={() => setOpen(true)}>
            <FiMenu size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 flex justify-end">
              <div className="max-w-2xl rounded-2xl rounded-br-md bg-blue-600 px-5 py-3 text-white whitespace-pre-wrap">
                {chat.prompt}
              </div>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="mb-4 text-3xl font-bold">Subject</h2>
                <p className="whitespace-pre-wrap leading-8 text-gray-700">
                  {chat.subject}
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-3xl font-bold">LinkedIn DM</h2>
                <p className="whitespace-pre-wrap leading-8 text-gray-700">
                  {chat.linkedInDM}
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-3xl font-bold">Email Body</h2>
                <p className="whitespace-pre-wrap leading-8 text-gray-700">
                  {chat.emailBody}
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-3xl font-bold">Follow Up Email</h2>
                <p className="whitespace-pre-wrap leading-8 text-gray-700">
                  {chat.followUpEmail}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatDetails;