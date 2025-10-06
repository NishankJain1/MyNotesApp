import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GlassCard from "../component/GlassCard";
import { Link } from "react-router-dom";


export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault();
        
        try{
            await axios.post("http://localhost:5000/api/auth/signup",{name,email,password});
            alert("Signup successful! Please login.");
            navigate("/");
        }
        catch(err){
            console.error(err);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
      <GlassCard className="w-[350px]">
        <h2 className="text-3xl font-semibold text-white text-center mb-6 drop-shadow">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-md bg-white/30 placeholder-white/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md bg-white/30 placeholder-white/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md bg-white/30 placeholder-white/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
          >
            Create Account
          </button>
        </form>
        <p className="text-white/80 mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-300 hover:underline">
            Login
          </Link>
        </p>
      </GlassCard>
    </div>);
}