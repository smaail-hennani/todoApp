@echo off
REM Déployer un projet Angular sur GitHub Pages avec la branche MySQL

REM Dossier contenant le projet Angular
SET PROJECT_DIR=C:\Users\Nano\Desktop\AngularProject\testApp\

REM Nom de ton dépôt GitHub (ex : ton-user/ton-repo)
SET REPO=gyglamesh34/todoApp

REM Nom du dossier de sortie après le build Angular
SET DIST_DIR=dist

REM Nom de la branche de déploiement
SET DEPLOY_BRANCH=finalAPP
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

REM Déployer avec angular-cli-ghpages en utilisant la branche MySQL
echo Déploiement sur la branche %DEPLOY_BRANCH%...
npx angular-cli-ghpages --dir=%DIST_DIR%/test-app/browser --branch=%DEPLOY_BRANCH% --no-silent

REM Fin du script
echo Déploiement terminé sur la branche %DEPLOY_BRANCH% !
exit /b 0
