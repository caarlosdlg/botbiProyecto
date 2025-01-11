import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const DEFAULT_COORDINATES = {
  lat: 23.634501,  // Coordenadas predeterminadas para México
  lng: -102.552784
};

export default function ClientDetailsModal({ client, closeModal, isEditing }) {
  const [formData, setFormData] = useState({ ...client });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedClient = {
        ...formData,
        address: {
          ...formData.address,
          latitude: parseFloat(formData.address.latitude),
          longitude: parseFloat(formData.address.longitude)
        }
      };
      const clientDoc = doc(db, 'clients', client.id);
      await updateDoc(clientDoc, updatedClient);
      closeModal(); // Ensure closeModal is called after updating the client
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const getAddressString = (client) => {
    if (!client.address) return 'Dirección no proporcionada';
    
    const street = client.address.street || '';
    const number = client.address.number || '';
    const city = client.address.city || '';
    
    return [street, number, city].filter(Boolean).join(', ') || 'Dirección no proporcionada';
  };

  const getClientCoordinates = (client) => {
    const lat = parseFloat(client.address?.coordinates?.latitude) || DEFAULT_COORDINATES.lat;
    const lng = parseFloat(client.address?.coordinates?.longitude) || DEFAULT_COORDINATES.lng;
    return [lat, lng];
  };

  const formatCoordinates = (client) => {
    const lat = client.address?.coordinates?.latitude;
    const lng = client.address?.coordinates?.longitude;
    if (lat && lng) {
      return `${parseFloat(lat).toFixed(7)}, ${parseFloat(lng).toFixed(7)}`;
    }
    return 'Coordenadas no disponibles';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{isEditing ? 'Editar Cliente' : 'Detalles del Cliente'}</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <span className="material-icons">close</span>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">Nombre</h3>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <h3 className="font-bold">Apellido</h3>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <h3 className="font-bold">Correo</h3>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <h3 className="font-bold">Teléfono</h3>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <h3 className="font-bold">Dirección</h3>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="street"
                        value={formData.address?.street || ''}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border rounded-lg mb-2"
                        placeholder="Calle"
                      />
                      <input
                        type="text"
                        name="number"
                        value={formData.address?.number || ''}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border rounded-lg mb-2"
                        placeholder="Número"
                      />
                      <input
                        type="text"
                        name="city"
                        value={formData.address?.city || ''}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border rounded-lg mb-2"
                        placeholder="Ciudad"
                      />
                      <input
                        type="text"
                        name="latitude"
                        value={formData.address?.latitude || ''}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border rounded-lg mb-2"
                        placeholder="Latitud"
                      />
                      <input
                        type="text"
                        name="longitude"
                        value={formData.address?.longitude || ''}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border rounded-lg mb-2"
                        placeholder="Longitud"
                      />
                    </>
                  ) : (
                    <p>{getAddressString(client)}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-bold">Coordenadas</h3>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                    {formatCoordinates(client)}
                  </p>
                  {(!client.address?.coordinates?.latitude || !client.address?.coordinates?.longitude) && (
                    <p className="text-sm text-orange-600 mt-1">
                      Usando ubicación predeterminada (Ciudad de México)
                    </p>
                  )}
                </div>
              </div>
              
              <div className="h-[400px] z-0">
                <MapContainer
                  center={getClientCoordinates(client)}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-lg shadow-md"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={getClientCoordinates(client)}>
                    <Popup>
                      {getAddressString(client)}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancelar
              </button>
              {isEditing && (
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Guardar Cambios
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
