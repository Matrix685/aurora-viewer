#!/bin/sh
git checkout main
git pull
git add .
git commit -am "update from codespace"
git push
echo Changes committed