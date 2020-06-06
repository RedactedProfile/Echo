@ECHO OFF

CALL deno.exe run --allow-net --allow-env %~dp0.\echo.bundle.js

EXIT /B %ERRORLEVEL%
