@echo off
REM Déployer un projet Angular sur GitHub Pages

REM Dossier contenant le projet Angular
SET PROJECT_DIR=C:\Users\Nano\Desktop\AngularProject\todoApp\

REM Nom de ton dépôt GitHub (ex : ton-user/ton-repo)
SET REPO=gyglamesh34/todoApp

REM Nom du dossier de sortie après le build Angular
SET DIST_DIR=dist

REM Aller dans le dossier du projet
cd %PROJECT_DIR%

REM Construction du projet Angular
echo Construction du projet Angular...

ng build --configuration=production --base-href /todoApp/   

REM Vérifier si la construction a réussi
IF ERRORLEVEL 1 (
    echo Échec de la construction. Abandon du déploiement.
    exit /b 1
)

npx angular-cli-ghpages --dir=dist/test-app/browser  


REM Fin du script
echo Déploiement terminé !
exit /b 0
