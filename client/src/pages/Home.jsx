import { useState } from "react";
import { FiMenu, FiX, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import { post } from "../api/endpoint";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");

  const [aiEmail, setAiEmail] = useState(null);

  const token = localStorage.getItem("token");

  const generateColdEmail = async () => {
    if (!prompt.trim()) {
      return toast.error("Please enter a prompt.");
    }

    try {
      setLoading(true);

      const res = await post(
        "/ai/generate-email",
        {
          prompt,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data.success) {
        setAiEmail(res.data.coldEmail);
        setLastPrompt(prompt);
        setPrompt("");
      }
    } catch (error) {
      toast.error("Failed to generate email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-72px)] bg-[#f7f7f8]">

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"
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

      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:h-[calc(100vh-72px)] lg:sticky lg:top-[72px] bg-white overflow-y-auto">
        <Sidebar />
      </aside>

      <main className="flex flex-col flex-1">

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center p-4">
          <button onClick={() => setOpen(true)}>
            <FiMenu size={24} />
          </button>
        </div>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto px-4 py-8">

          <div className="max-w-4xl mx-auto">

            {!prompt && !aiEmail && (
              <div className="h-full flex flex-col items-center justify-center text-center mt-20">
                <h1 className="text-3xl font-bold mb-3">
                  AI Cold Email Generator
                </h1>

                <p className="text-gray-500">
                  Describe the cold email you want to generate.
                </p>
              </div>
            )}

            {lastPrompt && (
              <div className="flex justify-end mb-10">
                <div className="bg-blue-600 text-white rounded-2xl rounded-br-md px-5 py-3 max-w-2xl whitespace-pre-wrap">
                  {lastPrompt}
                </div>
              </div>
            )}

            {loading && (
              <div className="text-gray-500 animate-pulse">
                Generating cold email...
              </div>
            )}

            {!loading && aiEmail && (
              <div className="space-y-12">

                <section>
                  <h2 className="text-3xl font-bold mb-4">
                    Subject
                  </h2>

                  <p className="text-gray-700 leading-8 whitespace-pre-wrap">
                    {aiEmail.subject}
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold mb-4">
                    LinkedIn DM
                  </h2>

                  <p className="text-gray-700 leading-8 whitespace-pre-wrap">
                    {aiEmail.linkedInDM}
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold mb-4">
                    Email Body
                  </h2>

                  <p className="text-gray-700 leading-8 whitespace-pre-wrap">
                    {aiEmail.emailBody}
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold mb-4">
                    Follow Up Email
                  </h2>

                  <p className="text-gray-700 leading-8 whitespace-pre-wrap">
                    {aiEmail.followUpEmail}
                  </p>
                </section>

              </div>
            )}
          </div>
        </div>

        {/* Bottom Input */}
        <div className="sticky bottom-0 bg-[#f7f7f8] p-4">

          <div className="max-w-4xl mx-auto">

            <div className="flex items-end gap-3 bg-white rounded-3xl px-5 py-3 shadow">

              <textarea
                rows={1}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the cold email you want..."
                className="flex-1 resize-none bg-transparent outline-none max-h-40"
              />

              <button
                disabled={loading}
                onClick={generateColdEmail}
                className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-50"
              >
                <FiSend size={18} />
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Home;