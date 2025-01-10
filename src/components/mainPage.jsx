import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import botbiLogo from '../assets/botbiLogo.png';

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4">
          <nav className="space-y-2">
            <img 
              src={botbiLogo} 
              alt="BotBI Logo" 
              className="w-16 h-auto mx-auto mb-4"
            />
            
            <button 
              onClick={() => navigate('/clients')}
              className="flex items-center w-full p-3 rounded hover:bg-blue-700 transition-colors"
            >
              <span className="material-icons mr-3">people</span>
              {isSidebarOpen && <span>Clients</span>}
            </button>

            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center w-full p-3 rounded hover:bg-blue-700 transition-colors"
            >
              <span className="material-icons mr-3">dashboard</span>
              {isSidebarOpen && <span>Dashboard</span>}
            </button>

            <button 
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded hover:bg-blue-700 transition-colors mt-auto"
            >
              <span className="material-icons mr-3">logout</span>
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-200"
          >
            <span className="material-icons">
              {isSidebarOpen ? 'menu_open' : 'menu'}
            </span>
          </button>
          <h1 className="text-2xl font-bold">Welcome to BotBI</h1>
        </div>
        
        {/* Content area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          {/* Add your dashboard content here */}
        </div>
      </div>
    </div>
  );
}