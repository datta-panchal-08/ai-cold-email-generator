import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { post } from "../api/endpoint";
import toast  from "react-hot-toast";

const OtpVerification = () => {
  const location = useLocation();
  const {email} = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOTPChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const verifyOTP = async () => {
    const finalOTP = otp.join("");

    if (finalOTP.length !== 6) {
      return toast.error("Please enter complete OTP");
    }

    try {
      setLoading(true);

      const { data } = await post("/auth/verify-otp", {
        email,
        otp: finalOTP,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/login")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

       
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">AI</span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Verify OTP
          </h1>

          <p className="mt-3 text-gray-500 text-sm leading-6">
            We've sent a 6-digit verification code to
          </p>

          <p className="text-blue-600 font-medium mt-1">
            {email}
          </p>
        </div>

       
        <div className="flex justify-center gap-3 mt-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleOTPChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 rounded-xl border border-gray-300 text-center text-xl font-semibold outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          ))}
        </div>


        <button
          onClick={verifyOTP}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

      
        <button onClick={()=>navigate(-1)} className="w-full mt-6 border border-gray-300 text-gray-700 hover:bg-gray-100 transition py-3 rounded-xl font-medium">
          Back
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;