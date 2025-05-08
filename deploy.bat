@echo off
echo ----------------------------------------------------
echo 🔧 Costruzione del progetto Vite...
echo ----------------------------------------------------
npm run build

echo ----------------------------------------------------
echo 🚀 Deploy su GitHub Pages...
echo ----------------------------------------------------
npx gh-pages -d dist

echo ----------------------------------------------------
echo ✅ Deploy completato!
echo 👉 Controlla: https://24021959.github.io/energi-smart-view/
pause
