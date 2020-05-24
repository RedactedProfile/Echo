@ECHO OFF

SETLOCAL

SET "APP_MAIN_JS=echo.bundle.js"

SET "DENO_EXE=deno.exe"
SET "APP_MAIN_JS_PATH=%APP_MAIN_JS%"

CALL %DENO_EXE% run --allow-net --allow-env %APP_MAIN_JS_PATH% %*
EXIT /B %ERRORLEVEL%