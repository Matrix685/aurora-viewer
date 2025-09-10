#!/bin/sh
git checkout main
git add .
git commit -am "update from codespace"
git push
echo Press Enter...
read