# Docker Setup para 2XKO Character Select

Este proyecto incluye una configuración completa de Docker para desarrollo y producción.

## Archivos de configuración

- `Dockerfile`: Configuración multi-stage para producción optimizada
- `docker-compose.yml`: Configuración para desarrollo y producción
- `.dockerignore`: Archivos excluidos del contexto de Docker
- `nginx.conf`: Configuración personalizada de nginx para SPA
- `docker-utils.ps1`: Scripts de utilidad para Windows PowerShell
- `docker-utils.sh`: Scripts de utilidad para Linux/Mac

## Comandos básicos

### Construcción y ejecución

```bash
# Construir imagen de producción
docker build -t 2xko-charselect:latest .

# Ejecutar en modo desarrollo
docker-compose --profile dev up --build

# Ejecutar en modo producción
docker-compose --profile prod up --build -d

# Parar servicios
docker-compose down
```

### Usando los scripts de utilidad

#### Windows PowerShell
```powershell
# Cargar las funciones
. .\docker-utils.ps1

# Usar las funciones
Build-Prod
Start-Dev
Start-Prod
Clean-Docker
Show-Logs
Run-Tests
```

#### Linux/Mac
```bash
# Hacer ejecutable el script
chmod +x docker-utils.sh

# Usar los comandos
./docker-utils.sh build-prod
./docker-utils.sh dev
./docker-utils.sh prod
./docker-utils.sh clean
./docker-utils.sh logs
./docker-utils.sh test
```

## Perfiles de Docker Compose

### Desarrollo (`dev`)
- Utiliza hot reload
- Puerto: 5173
- Monta el código fuente como volumen
- Ideal para desarrollo activo

### Producción (`prod`)
- Imagen optimizada con nginx
- Puerto: 80
- Archivos estáticos compilados
- Configuración de caché y compresión

### Desarrollo alternativo (`dev-vite`)
- Configuración simple para desarrollo
- Reinstala dependencias en cada inicio
- Útil para debugging de dependencias

## Características del setup

### Dockerfile multi-stage
1. **Build stage**: Instala dependencias y construye la aplicación
2. **Production stage**: Sirve archivos estáticos con nginx

### Optimizaciones incluidas
- Cache de dependencias de npm
- Imagen final ligera con nginx:alpine
- Configuración de nginx para SPA (React Router)
- Headers de seguridad
- Compresión gzip
- Cache de archivos estáticos

### Nginx Configuration
- Soporte para React Router (redirección de rutas)
- Headers de seguridad (X-Frame-Options, X-Content-Type-Options, etc.)
- Compresión gzip para mejores tiempos de carga
- Cache de archivos estáticos por 1 año

## Variables de entorno

Puedes crear un archivo `.env` para configurar variables:

```env
NODE_ENV=production
VITE_API_URL=http://localhost:3000
```

## Volumes y persistencia

El setup incluye volúmenes para:
- `node_modules`: Evita reinstalar dependencias en desarrollo
- Código fuente: Hot reload en desarrollo

## Troubleshooting

### Puerto en uso
```bash
# Verificar qué proceso usa el puerto
netstat -tulpn | grep :80
# o en Windows
netstat -an | findstr :80
```

### Limpiar todo Docker
```bash
# Parar todos los contenedores
docker stop $(docker ps -aq)

# Eliminar todos los contenedores
docker rm $(docker ps -aq)

# Eliminar todas las imágenes
docker rmi $(docker images -q)

# Limpiar sistema completo
docker system prune -a --volumes
```

### Logs de contenedores
```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f app-prod
```

## Despliegue

Para desplegar en producción:

1. Construir la imagen:
   ```bash
   docker build -t 2xko-charselect:latest .
   ```

2. Ejecutar el contenedor:
   ```bash
   docker run -d -p 80:80 --name 2xko-app 2xko-charselect:latest
   ```

3. O usar docker-compose:
   ```bash
   docker-compose --profile prod up -d
   ```