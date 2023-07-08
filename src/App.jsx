import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import home from "./assets/home.png";
import { Circle, Home, CreatePost, AboutPage} from "./pages";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
<header className="w-full flex justify-between items-center bg-black sm:px-8 px-4 py-4 border-b border-b-[#000000]">
<Link to="/Home">
<img src={home} alt="home" className="w-28 object-contain" />
</Link>
<Link to="/create-post" className="font-inter font-medium bg-[#0358f6] text-white sm:px-7 px-2 py-4 border-b border-b-[#0981fa] rounded-md">Create</Link>
</header>
<main className="sm:p-8 px-4 py-8 w-full bg-black min-h[calc(100vh-73px)]">
<Routes>
  <Route path="/Circle" element={<Circle />} />
  <Route path="/Home" element={<Home />} />
  <Route path="/create-post" element={<CreatePost />} />
  <Route path="/about-page" element={<AboutPage />} />
</Routes>
</main>    
    </BrowserRouter>
  );
}

export default App