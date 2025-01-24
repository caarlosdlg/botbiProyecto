import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import logo from '../assets/logo.png';

export default function Sidebar({ isOpen, setIsOpen }) {
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
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white transition-all duration-300 ease-in-out relative`}>
      <div className="p-4">
        <nav className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <button onClick={() => navigate('/')} className="flex justify-center">
              <img 
                src={logo} 
                alt="BotBI Logo" 
                className="w-16 h-auto"
              />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-blue-700 w-full flex justify-center"
            >
              <span className="material-icons text-white">
                {isOpen ? 'menu_open' : 'menu'}
              </span>
            </button>
          </div>
          
          <button 
            onClick={() => navigate('/clients')}
            className="flex items-center w-full p-3 rounded hover:bg-blue-700 transition-colors"
          >
            <span className="material-icons mr-3">people</span>
            {isOpen && <span>Clientes</span>}
          </button>

          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center w-full p-3 rounded hover:bg-blue-700 transition-colors"
          >
            <span className="material-icons mr-3">dashboard</span>
            {isOpen && <span>Panel</span>}
          </button>

          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded hover:bg-blue-700 transition-colors mt-auto"
          >
            <span className="material-icons mr-3">logout</span>
            {isOpen && <span>Cerrar Sesión</span>}
          </button>
        </nav>
      </div>
    </div>
  );
}
