import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UploadPage from './pages/UploadPage'
import ChatPage from './pages/ChatPage'
import ReviewPage from './pages/ReviewPage'
import ExportPage from './pages/ExportPage'
import Navigation from './components/Navigation'
import { Toaster } from 'react-hot-toast'
import StakeholderPage from './pages/StakeholderPage'
import HistoryPage from './pages/HistoryPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/export" element={<ExportPage />} />
            <Route path="/stakeholder" element={<StakeholderPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  )
}

export default App;