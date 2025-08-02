import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import MainLayout from "./components/extra/MainLayout";
import ProtectedRoutes from "./components/extra/ProtectedRoutes";
import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import Notes from "./pages/Notes";
import  Calendar  from "./pages/Calender";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage/>} />

      <Route element={
        <ProtectedRoutes>
          <MainLayout/>
        </ProtectedRoutes>
        }>

        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
        <Route path='/notes' element={<Notes/>}/>
        <Route path='/calendar' element={<Calendar/>}/>
      </Route>


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
