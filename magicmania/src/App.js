import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import LandingPage from "./components/pages/landingPage";
import KeywordSearch from "./components/pages/keywordSearch";
import CardSearch from "./components/pages/cardSearch";
import UserPage from "./components/pages/userPage";
import LoginPage from "./components/pages/loginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './index.css'

function App() {
  return (
    <Router>
      <div className="App">
      {/* <Header /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/keywordSearch" element={<KeywordSearch />} />
          <Route exact path='/cardSearch' element={<CardSearch />}/>
          <Route exact path='/User' element={<UserPage/>}/>
          <Route exact path='/login' element={<LoginPage />} />

          {/* <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
