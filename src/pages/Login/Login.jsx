import React, { useState } from "react";
import "./Login.css";
import logo from '../../assets/login_logo.jpeg';
import { login, signup } from "../../firebase";
import filmfinder_spinner from '../../assets/login_logo.jpeg';
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        if (!name.trim()) { 
          alert("Please enter name"); 
          setLoading(false); 
          return; 
        }
        await signup(name, email, password);
      }
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.message); 
      console.error(err);
    }
    setLoading(false);
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return loading ? (
    <div className="login-spinner">
      <img src={filmfinder_spinner} alt=""/>
    </div>
  ) : (
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && ( 
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your Name"/> 
          )}
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
          <div className="password-container">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} 
              placeholder="Password"
            />
            <span className="eye-icon" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" disabled={loading}>{loading ? "Processing.." : signState}</button>
          <div className="form-help">
            <div className="remembered">
              <input type="checkbox" id="remember"/>
              <label htmlFor="remember">Remember Me</label>
            </div>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>New To FilmFinder? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>
          ) : (
            <p>Already Have An Account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
