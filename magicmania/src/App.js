import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import LandingPage from "./components/pages/landingPage";
import CardSearch from "./components/pages/cardSearch";
import UserPage from "./components/pages/userPage";
import KeywordSearch from "./components/pages/keyword-search";

function App() {
  return (
    <div>
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route exact path='/cardSearch' element={<CardSearch />}/>
          <Route exact path='/User' element={<UserPage/>}/>
          <Route path="/keyword-search" element={<KeywordSearch />} />
          {/* <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} /> */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
    </div>
  );
}

export default App;
