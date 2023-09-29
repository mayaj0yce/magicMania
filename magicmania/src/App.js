import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client"; 
import client from "./apolloClient"; 
import LandingPage from "./components/pages/landingPage";
import KeywordSearch from "./components/pages/keywordSearch";
import CardSearch from "./components/pages/cardSearch";
import UserPage from "./components/pages/userPage";
import LoginPage from "./components/pages/loginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./components/pages/signup";
import "./index.css";

function App() {
  return (
    <ApolloProvider client={client}> {/* Wrap App with ApolloProvider */}
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/keywordSearch" element={<KeywordSearch />} />
            <Route exact path="/cardSearch" element={<CardSearch />} />
            <Route exact path="/User" element={<UserPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
