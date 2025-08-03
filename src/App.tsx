// // src/App.tsx
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
// } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import DashboardPage from "./pages/DashboardPage";

// const App: React.FC = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/dashboard" element={<DashboardPage />} />
//     </Routes>
//   </Router>
// );

// export default App;

// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ActiveEventsPage from "./pages/ActiveEventsPage";
import DashboardPage from "./pages/DashboardPage";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/active-events" element={<ActiveEventsPage />} />
      <Route path="/dashboard/:key" element={<DashboardPage />} />
    </Routes>
  </Router>
);
export default App;
