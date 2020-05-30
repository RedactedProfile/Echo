@ECHO OFF

CALL deno.exe run --allow-net --allow-env .\echo.bundle.js 

EXIT /B %ERRORLEVEL%