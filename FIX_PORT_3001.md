# Fix: Port 3001 Already in Use

## The Error

```
Error: listen EADDRINUSE: address already in use :::3001
```

This means another process is already using port 3001 (probably another instance of your API server).

## Quick Fix

### Option 1: Kill Process on Port 3001 (Windows PowerShell)

Run this command:

```powershell
Get-NetTCPConnection -LocalPort 3001 | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force
```

### Option 2: Find and Kill Manually

1. Find the process:
   ```powershell
   netstat -ano | findstr :3001
   ```
   
2. Note the PID (Process ID) from the last column

3. Kill the process:
   ```powershell
   taskkill /PID [PID_NUMBER] /F
   ```

### Option 3: Restart Your Terminal

1. Close the terminal where the API server was running
2. Open a new terminal
3. Run `npm run api` again

## After Fixing

Once the port is free:

1. Run: `npm run api`
2. Should see: `Email API server running on port 3001`
3. No more port errors! ✅

## Prevention

Always stop the API server properly:
- Press **Ctrl+C** in the terminal
- Wait for it to stop
- Then start it again

Or use:
```bash
npm run dev:all
```

This starts both frontend and API together and manages them properly.



