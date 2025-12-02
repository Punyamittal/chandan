# PowerShell script to restart dev server with cache clear
Write-Host "Stopping any running processes on port 8080/8081..."
Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -like "*vite*" -or $_.CommandLine -like "*vite*" } | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "Clearing Vite cache..."
if (Test-Path "node_modules\.vite") {
    Remove-Item -Recurse -Force "node_modules\.vite" -ErrorAction SilentlyContinue
    Write-Host "Vite cache cleared"
} else {
    Write-Host "No Vite cache found"
}

Write-Host "`nVerifying .env file..."
if (Test-Path ".env") {
    $content = Get-Content .env -Raw
    Write-Host "✓ .env file exists"
    if ($content -match "VITE_CLERK_PUBLISHABLE_KEY=") {
        Write-Host "✓ VITE_CLERK_PUBLISHABLE_KEY found in .env"
    } else {
        Write-Host "✗ VITE_CLERK_PUBLISHABLE_KEY NOT found in .env"
    }
} else {
    Write-Host "✗ .env file NOT found"
}

Write-Host "`nStarting dev server..."
npm run dev




