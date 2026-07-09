$ErrorActionPreference = 'Stop'

$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$reportsDir = Join-Path $projectDir 'reports'
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$logFile = Join-Path $reportsDir "api-test-run-$timestamp.log"

function Write-Log {
  param([string]$Message)

  $line = "[{0}] {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Message
  Write-Host $line
  Add-Content -Path $logFile -Value $line
}

function Invoke-LoggedCommand {
  param(
    [string]$Command,
    [string[]]$Arguments
  )

  Write-Log ("Ejecutando: {0} {1}" -f $Command, ($Arguments -join ' '))
  & $Command @Arguments 2>&1 | Tee-Object -FilePath $logFile -Append

  if ($LASTEXITCODE -ne 0) {
    throw "El comando fallo con codigo ${LASTEXITCODE}: $Command $($Arguments -join ' ')"
  }
}

New-Item -ItemType Directory -Force -Path $reportsDir | Out-Null

Write-Log 'Validando prerequisitos de ejecucion.'

$nodeDefaultDir = 'C:\Program Files\nodejs'
if (-not (Get-Command node -ErrorAction SilentlyContinue) -and (Test-Path (Join-Path $nodeDefaultDir 'node.exe'))) {
  $env:PATH = "$nodeDefaultDir;$env:PATH"
  Write-Log ("Node.js no estaba en PATH. Se agrego temporalmente: {0}" -f $nodeDefaultDir)
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw 'Node.js no esta instalado o no esta disponible en el PATH.'
}

$npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
if (-not $npmCommand) {
  $npmCommand = Get-Command npm -ErrorAction SilentlyContinue
}
if (-not $npmCommand) {
  throw 'npm no esta instalado o no esta disponible en el PATH.'
}

Write-Log ("Node.js detectado: {0}" -f (& node --version))
Write-Log ("npm detectado: {0}" -f (& $npmCommand.Source --version))

Write-Log ("Entrando a la carpeta del proyecto: {0}" -f $projectDir)
Set-Location $projectDir

Invoke-LoggedCommand -Command $npmCommand.Source -Arguments @('install')

$env:RUN_API = 'true'
$env:API_BASE_URL = 'http://localhost:5070'

Write-Log ("RUN_API={0}" -f $env:RUN_API)
Write-Log ("API_BASE_URL={0}" -f $env:API_BASE_URL)

Invoke-LoggedCommand -Command $npmCommand.Source -Arguments @('run', 'test:api')

Write-Log ("Ejecucion finalizada. Log: {0}" -f $logFile)
