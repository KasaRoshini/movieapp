import React, { useEffect }  from "react";
import { Routes,Route, useNavigate} from "react-router-dom";
import TitleCards from "./components/TitleCards/TitleCards";
import Home from "./pages/Home/Home"
import Player from "./pages/Player/Player";  
import Login from "./pages/Login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const navigate = useNavigate();
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        navigate("/");
      }else{
        navigate("/login");
      }
    });
    return () => unsubscribe();
  },[navigate]);
  return (
    <div>
      <ToastContainer theme="dark"/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/player/:id" element={<Player />} />
        </Routes>
    </div>
  );
}
export default App;
