import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "../public/UploadPage";
import ChatPage from "./pages/ChatPage";
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
import SummaryPage from "./pages/Summary"; // ✅ Changed StakeholderPage to SummaryPage

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8 flex-grow">
            <div className="bg-white shadow-md rounded-lg p-6">
              <Routes>
                <Route path="/" element={<UploadPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/export" element={<ExportPage />} />
                <Route path="/summary" element={<SummaryPage />} /> {/* ✅ Fixed here */}
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
