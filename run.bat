@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo === SISTEMA DE INICIALIZACAO RPG ORDEM (AUTO-BUILD) ===

:: 1. Limpeza total de processos
taskkill /F /IM node.exe /T >nul 2>&1
taskkill /F /IM python.exe /T >nul 2>&1

:: 2. Gerar Sufixo Aleatorio
set /a SUFIXO=%RANDOM% + 1000

:: 3. Definir nomes dinamicos
set API_SUB=ordem-api-%SUFIXO%
set SITE_SUB=ordem-site-%SUFIXO%
set API_PORT=5001
set FRONT_PORT=5173

:: 4. Atualizar o environment.json (Usando um método de escrita mais rápido e seguro)
echo Atualizando configuracoes para: %API_SUB% e %SITE_SUB%...
powershell -NoProfile -Command "$j = @{ api_port=%API_PORT%; front_port=%FRONT_PORT%; api_url='https://%API_SUB%.loca.lt'; front_url='https://%SITE_SUB%.loca.lt' }; $j | ConvertTo-Json | Set-Content -Path 'environment.json' -Encoding UTF8"

:: Pausa crucial para o Windows liberar o arquivo para o Python
timeout /t 3 >nul

:: 5. Limpeza de CACHE PROFUNDA e Build
echo [1/4] Limpando rastros e gerando novo Build...
if exist "dist" rd /s /q "dist"
:: Apaga o cache interno do Vite que costuma prender variáveis
if exist "node_modules\.vite" rd /s /q "node_modules\.vite"

:: Executa o build apenas UMA vez
call yarn build

:: 6. Pegar IP Publico (Resolvendo o aviso de segurança)
echo [2/4] Buscando seu IP Publico...
for /f "usebackq tokens=*" %%i in (`powershell -NoProfile -Command "(Invoke-WebRequest -uri 'https://ipv4.icanhazip.com' -UseBasicParsing).Content.Trim()"`) do set PUBLIC_IP=%%i

:: 7. Iniciar API e Tuneis
echo [3/4] Iniciando API e Tuneis...
start "API_PYTHON" /min python App.py
timeout /t 3 >nul
start "TUNEL_API" /min cmd /c "npx localtunnel --port %API_PORT% --subdomain %API_SUB%"
timeout /t 2 >nul
start "TUNEL_SITE" /min cmd /c "npx localtunnel --port %FRONT_PORT% --subdomain %SITE_SUB%"

timeout /t 5 >nul

echo.
echo =====================================================
echo           DADOS DA SESSAO (PASSE AOS PLAYERS)
echo =====================================================
echo  IP CHAVE: %PUBLIC_IP%
echo  SITE:     https://%SITE_SUB%.loca.lt
echo  API:      https://%API_SUB%.loca.lt
echo =====================================================
echo.

:: 8. Servidor de Producao
echo [4/4] Iniciando Servidor de Producao...
serve -s dist -l %FRONT_PORT%

:: Limpeza final
taskkill /F /IM node.exe /T >nul 2>&1
taskkill /F /IM python.exe /T >nul 2>&1
pause