# Scripts útiles para Docker en Windows PowerShell

function Build-Prod {
    Write-Host "Construyendo imagen de producción..." -ForegroundColor Green
    docker build -t 2xko-charselect:latest .
}

function Start-Dev {
    Write-Host "Iniciando en modo desarrollo..." -ForegroundColor Green
    docker-compose --profile dev up --build
}

function Start-Prod {
    Write-Host "Iniciando en modo producción..." -ForegroundColor Green
    docker-compose --profile prod up --build -d
}

function Clean-Docker {
    Write-Host "Limpiando contenedores y volúmenes..." -ForegroundColor Yellow
    docker-compose down -v
    docker system prune -f
}

function Show-Logs {
    docker-compose logs -f
}

function Run-Tests {
    Write-Host "Ejecutando tests..." -ForegroundColor Green
    docker run --rm -v "${PWD}:/app" -w /app node:18-alpine sh -c "npm install && npm test"
}

function Show-Help {
    Write-Host "Comandos disponibles:" -ForegroundColor Cyan
    Write-Host "  Build-Prod    - Construir imagen de producción"
    Write-Host "  Start-Dev     - Ejecutar en modo desarrollo"
    Write-Host "  Start-Prod    - Ejecutar en modo producción"
    Write-Host "  Clean-Docker  - Limpiar contenedores y volúmenes"
    Write-Host "  Show-Logs     - Mostrar logs"
    Write-Host "  Run-Tests     - Ejecutar tests"
    Write-Host "  Show-Help     - Mostrar esta ayuda"
}

# Mostrar ayuda por defecto
Show-Help