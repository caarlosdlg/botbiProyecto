# BotBI Client Management System

## Descripción

BotBI es una aplicación web moderna para la gestión integral de clientes, diseñada para proporcionar una experiencia fluida en el manejo de información de clientes. La aplicación permite:

- Registro y gestión de datos personales de clientes
- Gestión de direcciones con integración de mapas
- Visualización geográfica de clientes
- Interfaz responsive y amigable

## Características Principales

- ✨ Interfaz moderna con Tailwind CSS
- 📍 Integración con Google Maps
- 🔥 Base de datos en tiempo real con Firebase
- 📱 Diseño responsive
- 🔒 Autenticación segura
- 📝 Validación de formularios

## Tecnologías Utilizadas

- **Frontend:**
  - React 18
  - Vite
  - Tailwind CSS
  - React Hook Form
  - React Router v6

- **Backend y Servicios:**
  - Firebase Firestore
  - Google Maps API
  - Firebase Authentication
  - Firebase Hosting

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Cuenta de Firebase
- Clave de API de Google Maps

## Instalación y Configuración

1. Clona el repositorio:
   ```sh
   git clone https://github.com/caarlosdlg/dashifyapp.git
   cd BotBI
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_GOOGLE_MAPS_API_KEY=tu_google_maps_api_key
   ```

4. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   ```

## Estructura del Proyecto

```
src/
├── components/    # Componentes React
├── firebase/     # Configuración de Firebase
├── hooks/        # Custom hooks
├── pages/        # Páginas principales
└── utils/        # Utilidades y helpers
```

## Despliegue

La aplicación está desplegada en Firebase Hosting y puede accederse en:
[https://dashifyapp.web.app/](https://dashifyapp.web.app/)

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Soporte

Para soporte, contacta a [carlos.delgado@example.com](mailto:caarllossdlg@gmail.com)

## Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.
