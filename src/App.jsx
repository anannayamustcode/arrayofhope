// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import UploadPage from "../public/UploadPage";
// import ReviewPage from "./pages/ReviewPage";
// import ExportPage from "./pages/ExportPage";
// import Navigation from "./components/Navigation";
// import Footer from "./components/Footer";
// import { Toaster } from "react-hot-toast";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
// import HistoryPage from "./pages/HistoryPage";
// import { AuthProvider } from "./contexts/AuthContext";
// import Profile from "./pages/Profile";
// import ConflictsPage from "./pages/Conflicts";
// import Sidebar from "./components/Sidebar";
// import Collaborate from "./pages/collaborate/Collaborate";
// import Dashboard from "./pages/collaborate/Dashboard";
// import Chat from "./pages/Chat";
// import FlowchartPage from "./pages/collaborate/Flowchart";
// import Calendar from "./pages/collaborate/Calendar";
// import NegotiationPage from "./pages/Negotiation";
// import PrivateRoute from "./components/PrivateRoute";

// function Layout() {
//   const location = useLocation();
//   const sidebarRoutes = ["/dashboard", "/collaborate", "/chat", "/summary", "/calendar"];
//   const isSidebarVisible = sidebarRoutes.includes(location.pathname);
//   const isNavbarHidden = sidebarRoutes.includes(location.pathname);

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {isSidebarVisible && <Sidebar />}
//       <div className="flex-grow flex flex-col">
//         {!isNavbarHidden && <Navigation />}
//         <main className="container mx-auto px-4 py-8 flex-grow">
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <Routes>
//               {/* 🔐 Protected Routes */}
//               <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//               <Route path="/collaborate" element={<PrivateRoute><Collaborate /></PrivateRoute>} />
//               <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
//               <Route path="/negotiation" element={<PrivateRoute><NegotiationPage /></PrivateRoute>} />
//               <Route path="/summary" element={<PrivateRoute><ConflictsPage /></PrivateRoute>} />
//               <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
//               <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
//               <Route path="/flowchart" element={<PrivateRoute><FlowchartPage /></PrivateRoute>} />
//               <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />

//               {/* Public Routes */}
//               <Route path="/" element={<UploadPage />} />
//               <Route path="/upload" element={<UploadPage />} />
//               <Route path="/review" element={<ReviewPage />} />
//               <Route path="/export" element={<ExportPage />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<SignUp />} />
//             </Routes>
//           </div>
//         </main>
//         {!isNavbarHidden && <Footer />}
//         <Toaster position="bottom-right" />
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Layout />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import UploadPage from "../public/UploadPage";
import ReviewPage from "./pages/ReviewPage";
import ExportPage from "./pages/ExportPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HistoryPage from "./pages/HistoryPage";
import { AuthProvider } from "./contexts/AuthContext";
import Profile from "./pages/Profile";
import ConflictsPage from "./pages/Conflicts";
import Sidebar from "./components/Sidebar";
import Collaborate from "./pages/collaborate/Collaborate";
import Dashboard from "./pages/collaborate/Dashboard";
import Chat from "./pages/Chat";
import FlowchartPage from "./pages/collaborate/Flowchart";
import Calendar from "./pages/collaborate/Calendar";
import NegotiationPage from "./pages/Negotiation";
import PrivateRoute from "./components/PrivateRoute";

function Layout() {
  const location = useLocation();
  const sidebarRoutes = ["/dashboard", "/collaborate", "/chat", "/summary", "/calendar"];
  const isSidebarVisible = sidebarRoutes.includes(location.pathname);
  const isNavbarHidden = sidebarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {isSidebarVisible && <Sidebar />}
      <div className="flex-grow flex flex-col">
        {!isNavbarHidden && <Navigation />}
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Routes>
              {/* 🔐 Protected Routes */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/collaborate" element={<PrivateRoute><Collaborate /></PrivateRoute>} />
              <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
              <Route path="/negotiation" element={<PrivateRoute><NegotiationPage /></PrivateRoute>} />
              <Route path="/summary" element={<PrivateRoute><ConflictsPage /></PrivateRoute>} />
              <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/flowchart" element={<PrivateRoute><FlowchartPage /></PrivateRoute>} />
              <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />

              {/* Public Routes */}
              <Route path="/" element={<UploadPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/export" element={<ExportPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </main>
        {!isNavbarHidden && <Footer />}
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
