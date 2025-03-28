import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#012169] text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>

        <p className="text-sm">&copy; {new Date().getFullYear()} Barclays. All rights reserved.</p>
      </div>
    </footer>
  );
}
