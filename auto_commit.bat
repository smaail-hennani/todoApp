@echo off
:: Vérification si un commentaire est fourni
if "%~1"=="" (
    echo Veuillez fournir un commentaire pour le commit.
    echo Usage: auto_commit.bat "Votre commentaire ici"
    exit /b 1
)

:: Assignation du commentaire
set "COMMENT=%~1"

:: Ajout de tous les fichiers modifiés
echo Ajout de tous les fichiers...
git add -A

:: Création du commit
echo Création du commit avec le commentaire : "%COMMENT%"
git commit -m "%COMMENT%"

:: Pousser les changements
echo Envoi des modifications vers le dépôt distant...
git push -u origin master

:: Confirmation
echo Commit effectué avec succès ! 🚀
pause
