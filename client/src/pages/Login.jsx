import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../api/endpoint";
import toast  from "react-hot-toast";
import { AuthContext } from "../auth/AuthProvider";

const Login = () => {
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userData) => {
    try {
      setLoading(true);
      const {data} = await post("/auth/login",{email:userdata?.email,password:userdata?.password});
      if(data?.success){
        toast.success(data?.message);
        login(data?.user,data?.token);
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response.data?.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">

       
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Welcome <span className="text-blue-600">Back</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue generating AI-powered cold emails.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>


          <div>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg cursor-pointer"
          >
           {
             loading ? "Wait...":" Login"
           }
          </button>
        </form>

   
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;