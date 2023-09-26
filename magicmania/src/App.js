import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import LandingPage from "./components/pages/landingPage";
import KeywordSearch from "./components/pages/keyword-search";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/keyword-search" element={<KeywordSearch />} />
          {/* <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} /> */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
