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
  import { AuthProvider } from "./components/AuthContext";
  import Profile from "./pages/Profile";
  import ConflictsPage from "./pages/Conflicts";
  import Sidebar from "./components/Sidebar";
  import Collaborate from "./pages/collaborate/Collaborate";
  import Dashboard from "./pages/collaborate/Dashboard";
  import Chat from "./pages/Chat";
  import FlowchartPage from "./pages/collaborate/Flowchart";
  import Calendar from "./pages/collaborate/Calendar";
  import NegotiationPage from "./pages/Negotiation";

  function Layout() {
    const location = useLocation();
    const sidebarRoutes = ["/dashboard", "/collaborate", "/team-chat", "/summary" , "/calendar"];
    const isSidebarVisible = sidebarRoutes.includes(location.pathname);
    const isNavbarHidden = sidebarRoutes.includes(location.pathname); // Hide Navbar for these routes

    return (
      <div className="min-h-screen flex bg-gray-50">
        {isSidebarVisible && <Sidebar />} {/* Show Sidebar only for dashboard, collaborate, chat */}
        <div className="flex-grow flex flex-col">
          {!isNavbarHidden && <Navigation />} {/* Hide Navbar for dashboard, collaborate, chat */}
          <main className="container mx-auto px-4 py-8 flex-grow">
            <div className="bg-white shadow-md rounded-lg p-6">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/collaborate" element={<Collaborate />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/negotiation" element={<NegotiationPage />} />
                <Route path="/" element={<UploadPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/export" element={<ExportPage />} />
                <Route path="/summary" element={<ConflictsPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/flowchart" element={<FlowchartPage />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </div>
          </main>
          {!isNavbarHidden && <Footer />}  {/* Hide Footer for dashboard, collaborate, chat */}
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