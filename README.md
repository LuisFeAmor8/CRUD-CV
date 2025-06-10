# 🌟 Portfolio Profesional con React + Node.js

Aplicación web completa que incluye una hoja de vida profesional desarrollada en React TypeScript y un panel de administración para gestionar experiencias profesionales a través de una API REST.

## ✨ Características Principales

- **🎨 Frontend React + TypeScript**: Hoja de vida moderna, responsiva y tipada
- **⚡ Panel de Administración**: CRUD completo para experiencias profesionales
- **🚀 API REST**: Backend robusto con Node.js y Express
- **💾 Base de Datos**: PostgreSQL con conexión segura
- **📝 Formulario de Contacto**: Con validación en tiempo real
- **🎯 Bootstrap**: Diseño responsivo y componentes modernos
- **🔧 Validaciones**: Sistema completo de validación de formularios
- **📱 Mobile First**: Diseño completamente responsivo

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 18 + TypeScript
- React Bootstrap
- Axios para peticiones HTTP
- CSS moderno con animaciones

### Backend
- Node.js + Express
- PostgreSQL
- CORS habilitado
- Dotenv para variables de entorno

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- PostgreSQL (versión 12 o superior)
- npm o yarn
- Git

## ⚙️ Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd api_experiencias
```

### 2. Configuración de la Base de Datos

Crea la base de datos en PostgreSQL:
```sql
CREATE DATABASE experiencias_profesionales;
```

Estructura de la tabla:
```sql
CREATE TABLE experiencias (
    id SERIAL PRIMARY KEY,
    empresa VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    descripcion TEXT NOT NULL,
    tecnologias VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:
```env
# Configuración de la base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=experiencias_profesionales
DB_USER=tu_usuario
DB_PASSWORD=tu_password

# Puerto del servidor
PORT=3000

# Entorno
NODE_ENV=development
```

### 4. Instalación de Dependencias

**Dependencias del servidor:**
```bash
npm install
```

**Dependencias del cliente React:**
```bash
cd client
npm install
cd ..
```

## 🚀 Ejecución del Proyecto

### Modo Desarrollo (Recomendado)

Ejecutar ambos servidores simultáneamente:
```bash
npm run dev:all
```

### Ejecución Separada

**Solo el backend:**
```bash
npm run dev
```

**Solo el frontend:**
```bash
cd client
npm start
```

**Modo producción:**
```bash
npm start
```

## 🌐 Accesos de la Aplicación

- **📄 Portafolio Principal**: `http://localhost:3000/`
- **⚙️ Panel de Administración**: `http://localhost:3000/admin`
- **🔌 API REST**: `http://localhost:3000/api/experiencias`

## 📖 Documentación de la API

### Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | `/api/experiencias` | Obtener todas las experiencias |
| GET    | `/api/experiencias/:id` | Obtener experiencia específica |
| POST   | `/api/experiencias` | Crear nueva experiencia |
| PUT    | `/api/experiencias/:id` | Actualizar experiencia |
| DELETE | `/api/experiencias/:id` | Eliminar experiencia |

### Estructura de Datos

```json
{
  "id": 1,
  "empresa": "Nombre de la Empresa",
  "cargo": "Desarrollador Full Stack",
  "fecha_inicio": "2023-01-01",
  "fecha_fin": "2023-12-31",
  "descripcion": "Descripción detallada del trabajo realizado...",
  "tecnologias": "React, Node.js, PostgreSQL, TypeScript"
}
```

## 🎯 Funcionalidades Destacadas

### Panel de Administración
- ✅ Crear nuevas experiencias profesionales
- ✅ Editar experiencias existentes
- ✅ Eliminar experiencias
- ✅ Validación de formularios
- ✅ Interfaz intuitiva y responsiva

### Formulario de Contacto
- ✅ Validación en tiempo real
- ✅ Verificación de email válido
- ✅ Validación de longitud de mensaje
- ✅ Mensajes de error descriptivos
- ✅ Confirmación de envío exitoso

### Experiencia de Usuario
- ✅ Diseño moderno y profesional
- ✅ Animaciones suaves
- ✅ Navegación intuitiva
- ✅ Totalmente responsivo
- ✅ Carga rápida de datos

## 📁 Estructura del Proyecto

```
api_experiencias/
├── 📁 client/                    # Aplicación React
│   ├── 📁 public/               # Archivos públicos
│   ├── 📁 src/
│   │   ├── 📁 components/       # Componentes reutilizables
│   │   ├── 📁 pages/           # Páginas principales
│   │   │   ├── 📄 Home.tsx     # Portafolio principal
│   │   │   └── 📄 AdminPanel.tsx # Panel de administración
│   │   ├── 📁 services/        # Servicios de API
│   │   ├── 📁 types/           # Tipos TypeScript
│   │   └── 📄 App.tsx          # Componente principal
├── 📁 src/                      # Servidor Node.js
│   ├── 📁 config/              # Configuración
│   ├── 📁 controllers/         # Lógica de negocio
│   ├── 📁 routes/              # Rutas de la API
│   └── 📄 app.js               # Configuración Express
├── 📁 img/                      # Imágenes del portafolio
├── 📄 server.js                 # Punto de entrada del servidor
├── 📄 package.json              # Dependencias del servidor
└── 📄 .env                      # Variables de entorno
```

## 🔒 Seguridad

- ✅ Variables de entorno para datos sensibles
- ✅ Validación de entrada en servidor y cliente
- ✅ CORS configurado correctamente
- ✅ Sanitización de datos
- ✅ Manejo seguro de errores



## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de features (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC - ver el archivo LICENSE para detalles.

## 👨‍💻 Autor

**Luis Felipe Amorocho Ayala**
- 🔗 GitHub: [@LuisFeAmor8](https://github.com/LuisFeAmor8)
- 📧 Email: lamorochoayala@gmail.com
- 📍 Ubicación: Magangué, Bolívar, Colombia
- 🎓 Estudiante de Ingeniería en Software - Universidad de Cartagena

## 🙏 Agradecimientos

- React y Node.js communities
- Bootstrap team
- PostgreSQL team
- Todas las librerías open source utilizadas

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐

🚀 **¿Encontraste algún bug o tienes una sugerencia? ¡Abre un issue!** 