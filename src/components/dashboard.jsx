import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import botbiLogo2 from '../assets/botbiLogo2.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ClientDetailsModal from './ClientDetailsModal';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DEFAULT_COORDINATES = {
  lat: 25.5530571,  // Updated to Torreón coordinates
  lng: -103.3606319
};

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const clientsCollection = collection(db, 'clients');
      const clientsSnapshot = await getDocs(clientsCollection);
      const clientsList = clientsSnapshot.docs.map(doc => {
        const data = doc.data();
        // Ensure coordinates are properly extracted from Firebase
        return {
          id: doc.id,
          ...data,
          address: {
            ...data.address,
            latitude: data.address?.latitude || DEFAULT_COORDINATES.lat,
            longitude: data.address?.longitude || DEFAULT_COORDINATES.lng
          }
        };
      });
      setClients(clientsList);
    } catch (error) {
      setError('Error fetching clients');
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteDoc(doc(db, 'clients', clientId));
        setClients(clients.filter(client => client.id !== clientId));
      } catch (error) {
        setError('Error deleting client');
        console.error('Error deleting client:', error);
      }
    }
  };

  const handleRowClick = (client, editing = false) => {
    setSelectedClient(client);
    setIsEditing(editing);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClient(null);
    fetchClients(); // Refetch clients after closing the modal
  };

  const getAddressString = (client) => {
    if (!client.address) return 'No address provided';
    
    const street = client.address.street || '';
    const number = client.address.number || '';
    const city = client.address.city || '';
    
    return [street, number, city].filter(Boolean).join(', ') || 'No address provided';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white p-4 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <button onClick={() => navigate('/')} className="flex justify-center">
            <img 
              src={botbiLogo2} 
              alt="BotBI Logo" 
              className="w-20 h-auto cursor-pointer -my-6"
            />
          </button>
          <h1 className="text-2xl font-bold">Client Dashboard</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Clients List</h2>
            <button
              onClick={() => navigate('/clients')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Client
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr 
                    key={client.id} 
                    onClick={() => handleRowClick(client)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.firstName || ''} {client.lastName || ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.email || 'No email'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.phone || 'No phone'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getAddressString(client)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRowClick(client, true); }}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <span className="material-icons">edit</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(client.id); }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <span className="material-icons">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Client Details Modal */}
      {showModal && selectedClient && (
        <ClientDetailsModal 
          client={selectedClient} 
          closeModal={closeModal} 
          isEditing={isEditing}
        />
      )}
    </div>
  );
}