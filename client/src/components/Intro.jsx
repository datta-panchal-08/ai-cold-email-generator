import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Link, Navigate } from "react-router-dom";

const Intro = () => {

  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-12">

      {/* Hero Section */}
      <h1 className="text-4xl md:text-6xl font-bold text-center max-w-5xl leading-tight">
        <span className="text-blue-600">Generate</span> Personalized{" "}
        <span className="text-blue-600">Cold Emails</span> in Seconds.
      </h1>

      <p className="mt-6 text-center text-gray-600 text-base md:text-lg max-w-3xl leading-7">
        Create professional, AI-powered cold emails for job applications,
        sales outreach, networking, freelancing, and more. Save time and
        increase your response rate.
      </p>

      <Link to={"/login"} className="mt-8 bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-lg text-white font-semibold cursor-pointer">
        Generate Email
      </Link>

      {/* Email Preview */}
      <div className="w-full max-w-4xl mt-14">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">

          {/* Window Header */}
          <div className="flex items-center gap-2 bg-gray-100 px-5 py-3 border-b">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>

          {/* Email */}
          <div className="p-6">
            <p className="text-sm text-gray-500">
              To: hr@company.com
            </p>

            <h2 className="text-xl font-bold mt-2">
              Subject: Application for Software Developer Internship
            </h2>

            <div className="mt-5 space-y-3 text-gray-700 leading-7">
              <p>Hi Sarah,</p>

              <p>
                I hope you're doing well. I recently came across your internship
                opportunity and was excited to apply.
              </p>

              <p>
                I am a React.js developer with experience building responsive
                web applications using React, Tailwind CSS, Node.js and
                MongoDB.
              </p>

              <p>
                I'd love the opportunity to contribute to your team and grow as
                a software developer.
              </p>

              <p>
                Thank you for your time and consideration. I look forward to
                hearing from you.
              </p>

              <div className="pt-3">
                <p>Best Regards,</p>
                <p className="font-semibold">John Doe</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* CTA Section */}
      <div className="w-full max-w-5xl mt-20 bg-blue-600 rounded-3xl px-8 py-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Generate Better Cold Emails?
        </h2>

        <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
          Let AI create professional, personalized cold emails for job applications,
          sales outreach, networking, and business in just a few seconds.
        </p>

        <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer">
          <Link to={"/login"}>      
          Start Generating →
          </Link>
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full mt-16 border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">
              <span className="text-blue-600">EmailGen</span> AI
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Generate professional AI-powered cold emails in seconds.
            </p>
          </div>

          <div className="flex gap-6 text-gray-600 font-medium">
            <a href="#" className="hover:text-blue-600 transition">
              Home
            </a>

            <a href="#" className="hover:text-blue-600 transition">
              Features
            </a>

            <a href="#" className="hover:text-blue-600 transition">
              Contact
            </a>

            <a href="#" className="hover:text-blue-600 transition">
              Privacy
            </a>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          © {new Date().getFullYear()} EmailGen AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Intro;