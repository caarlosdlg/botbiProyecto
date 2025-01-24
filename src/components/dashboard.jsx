import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import logo from '../assets/logo.png';
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
  lat: 25.5530571,  // Coordenadas de Torreón
  lng: -103.3606319
};

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
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
      setError('Error al obtener los clientes');
      console.error('Error al obtener los clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (clientId) => {
    setClientToDelete(clientId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'clients', clientToDelete));
      setClients(clients.filter(client => client.id !== clientToDelete));
      setShowConfirm(false);
      setClientToDelete(null);
    } catch (error) {
      setError('Error al eliminar el cliente');
      console.error('Error al eliminar el cliente:', error);
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
    if (!client.address) return 'Dirección no proporcionada';
    
    const street = client.address.street || '';
    const number = client.address.number || '';
    const city = client.address.city || '';
    
    return [street, number, city].filter(Boolean).join(', ') || 'Dirección no proporcionada';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white p-4 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <button onClick={() => navigate('/')} className="flex justify-center">
            <img 
              src={logo} 
              alt="BotBI Logo" 
              className="w-20 h-auto cursor-pointer -my-6"
            />
          </button>
          <h1 className="text-2xl font-bold">Panel de Clientes</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Lista de Clientes</h2>
            <button
              onClick={() => navigate('/clients')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agregar Nuevo Cliente
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
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
                      {client.email || 'Sin correo'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.phone || 'Sin teléfono'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getAddressString(client)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRowClick(client, true); }}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <span className="material-icons">editar</span>
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p className="mb-4">¿Estás seguro de que deseas eliminar este cliente?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

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