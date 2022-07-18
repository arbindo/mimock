@echo off

SET port=%1

WHERE java
IF %ERRORLEVEL% NEQ 0 (
    ECHO "Error: 'java is not available'"
    EXIT /B 1
)

IF [%port%]==[] SET port=8080

echo "Starting mimock on PORT %port%"
java "-jar" "%CD%\lib\mimock.jar" "--spring.config.location=%CD%\mimock.properties" "--server.port=%port%"