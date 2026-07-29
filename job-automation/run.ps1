$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$BundledPython = "C:\Users\rashe\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$BundledNode = "C:\Users\rashe\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$BundledModules = "C:\Users\rashe\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules"
$LocalModules = Join-Path $Root "spreadsheet\node_modules"

if (-not (Test-Path -LiteralPath $BundledPython)) {
    throw "Bundled Python runtime was not found: $BundledPython"
}
if (-not (Test-Path -LiteralPath $BundledNode)) {
    throw "Bundled Node runtime was not found: $BundledNode"
}
if (-not (Test-Path -LiteralPath $LocalModules)) {
    New-Item -ItemType Junction -Path $LocalModules -Target $BundledModules | Out-Null
}

$LogDir = Join-Path $Root "logs"
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$LogPath = Join-Path $LogDir "run-$Timestamp.log"

try {
    & $BundledPython (Join-Path $Root "src\job_scout.py") *>&1 | Tee-Object -FilePath $LogPath
    & $BundledPython (Join-Path $Root "src\generate_documents.py") *>&1 | Tee-Object -FilePath $LogPath -Append
    & $BundledNode (Join-Path $Root "spreadsheet\build_tracker.mjs") *>&1 | Tee-Object -FilePath $LogPath -Append
    "Run completed: $(Get-Date -Format o)" | Tee-Object -FilePath $LogPath -Append
}
catch {
    "Run failed: $($_.Exception.Message)" | Tee-Object -FilePath $LogPath -Append
    throw
}
