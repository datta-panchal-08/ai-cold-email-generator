import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../api/endpoint";
import toast  from "react-hot-toast";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const logOut = async () => {
            try {
                const res = await post("/auth/logout");
                if (res.data.success) {
                    toast.success("Logout Successfull");
                    navigate("/login");
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }, [user])

    return (
        <nav className="flex items-center sticky z-50 top-0 shadow  bg-white justify-between  px-4 py-3 md:px-6 md:py-4">
            <h1 className="text-xl font-bold text-blue-600">
                EmailGenAI
            </h1>

           <div className="">
            {
                user ? ( <button onClick={()=>logout()} className="text-sm text-blue-600 bg-white border-1 border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer duration-300 font-semibold rounded-md px-5 py-1">
              Logout
            </button>):( <Link to="/login" onClick={()=>logout()} className="text-sm text-blue-600 bg-white border-1 border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer duration-300 font-semibold rounded-md px-5 py-1">
              Login
            </Link>)
            }
           </div>

        </nav>
    );
};

export default Navbar;