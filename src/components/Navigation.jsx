import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()
  const navItems = [
    { path: '/upload', name: 'Upload' },
    { path: '/chat', name: 'AI Analysis' },
    { path: '/review', name: 'Review' },
    { path: '/export', name: 'Export' },
  ]

  return (
    <nav className="bg-[#012169] text-white shadow-md w-full">
      <div className="w-full max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center py-2">
          <h1 className=" text-xl font-bold">
            <Link to="/" className="!text-white">Barclays</Link>
          </h1>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`!text-white px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? 'bg-[#FFD700] text-[#012169]'
                    : 'hover:bg-blue-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}