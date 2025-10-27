#!/bin/bash

# Scripts útiles para Docker

# Construir imagen de producción
build-prod() {
    echo "Construyendo imagen de producción..."
    docker build -t 2xko-charselect:latest .
}

# Ejecutar en modo desarrollo
dev() {
    echo "Iniciando en modo desarrollo..."
    docker-compose --profile dev up --build
}

# Ejecutar en modo producción
prod() {
    echo "Iniciando en modo producción..."
    docker-compose --profile prod up --build -d
}

# Limpiar contenedores y volúmenes
clean() {
    echo "Limpiando contenedores y volúmenes..."
    docker-compose down -v
    docker system prune -f
}

# Mostrar logs
logs() {
    docker-compose logs -f
}

# Ejecutar tests en contenedor
test() {
    echo "Ejecutando tests..."
    docker run --rm -v $(pwd):/app -w /app node:18-alpine sh -c "npm install && npm test"
}

# Ayuda
help() {
    echo "Comandos disponibles:"
    echo "  build-prod  - Construir imagen de producción"
    echo "  dev         - Ejecutar en modo desarrollo"
    echo "  prod        - Ejecutar en modo producción"
    echo "  clean       - Limpiar contenedores y volúmenes"
    echo "  logs        - Mostrar logs"
    echo "  test        - Ejecutar tests"
    echo "  help        - Mostrar esta ayuda"
}

# Ejecutar función basada en argumento
case "$1" in
    build-prod|dev|prod|clean|logs|test|help)
        $1
        ;;
    *)
        echo "Comando no reconocido. Usa 'help' para ver comandos disponibles."
        help
        ;;
esac