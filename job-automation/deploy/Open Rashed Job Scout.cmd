@echo off
title Rashed Job Scout - Secure Connection
echo.
echo  Rashed Job Scout is opening through an encrypted SSH tunnel.
echo  Keep this window open while using the dashboard.
echo.
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "$deadline=(Get-Date).AddSeconds(20); while((Get-Date) -lt $deadline){try{$r=Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8080/healthz -TimeoutSec 1;if($r.StatusCode -eq 200){Start-Process 'http://127.0.0.1:8080/login';Start-Process 'http://127.0.0.1:19999';exit}}catch{};Start-Sleep -Milliseconds 500};Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show('The secure tunnel did not become ready. Close this window and try again.','Rashed Job Scout')"
ssh -i "%USERPROFILE%\.ssh\rashed_job_vps_ed25519" -o ServerAliveInterval=30 -o ServerAliveCountMax=6 -o TCPKeepAlive=yes -o ExitOnForwardFailure=yes -N -L 8080:127.0.0.1:8080 -L 19999:127.0.0.1:19999 rashedops@169.58.78.147
