@echo off
cd ..
call npm install 
call npm install uglify-js -g 
call npm run build 
call copy README.md  "dist"





