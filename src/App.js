import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Create from './pages/create/Create';
import Home from "./pages/home/Home";
import Posts from "./pages/posts/Posts";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/posts" element={<Posts/>} />
          <Route path="/create-post" element={<Create/>} />
        </Routes>
      </Router>
    </div>

  )
}
