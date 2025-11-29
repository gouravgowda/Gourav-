@echo off
echo ========================================
echo  GitHub Repository Creation Helper
echo ========================================
echo.
echo Please follow these steps:
echo.
echo 1. Open your browser and go to: https://github.com/new
echo 2. Log in to GitHub if needed
echo 3. Fill in the form:
echo    - Repository name: ai-mental-health-companion
echo    - Description: Premium AI-powered student mental health app with glassmorphism UI
echo    - Visibility: Public
echo    - DO NOT check "Add a README file"
echo 4. Click "Create repository"
echo.
echo After you create the repository, press any key here...
pause
echo.
echo ========================================
echo  Pushing to GitHub...
echo ========================================
echo.

cd "c:\Users\GOURAV GOWDA\OneDrive\Desktop\ai mental tracking"
"C:\Program Files\Git\cmd\git.exe" push -u origin main

echo.
echo ========================================
echo  Done! Your code is now on GitHub!
echo ========================================
echo.
echo Your repository URL:
echo https://github.com/gouravgowda/ai-mental-health-companion
echo.
echo You can now:
echo  - Share this URL with anyone
echo  - Deploy to Railway: https://railway.app
echo  - Deploy to Vercel: cd frontend && npx vercel
echo.
pause
