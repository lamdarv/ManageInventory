// import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Create from "./pages/create/Create";
// import Home from "./pages/home/Home";
// import Posts from "./pages/posts/Posts";
import Notifikasi from "./pages/notifikasi/Notifikasi";
import Keluar from "./pages/keluar/Keluar";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Kegiatan from "./pages/kegiatan/Kegiatan";
import Inventory from "./pages/inventory/Inventory";
import ModalAddInventory from "./components/modal/ModalAddInventory";

export default function App() {
  const { user } = useAuthContext();
  // const userRole = user ? user.role : null;
  // const userRoleConvert = JSON.stringify(userRole);
  // console.log(userRoleConvert);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/kegiatan"
            element={
              localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "staf" || localStorage.getItem("role") === "mahasiswa" ?
                <Kegiatan />
              : <Navigate to="/" />
            }
          />
          <Route
            path="/inventoryAdmin"
            element={
              localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "staf" ?
                <Inventory />
              : <Navigate to="/" />
            }
          />

          <Route path="/create-post" element={<Create />} />
          <Route path="/notifikasi" element={<Notifikasi />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/keluar" element={<Keluar />} />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route 
            path="/testAddInventory"
            element={!user ? <ModalAddInventory /> : <Navigate to="/" />} 
            />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
