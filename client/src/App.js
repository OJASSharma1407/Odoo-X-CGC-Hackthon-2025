import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/auth/LoginPage";
// import SignupPage from "./pages/auth/SignupPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
