#!/bin/bash
DEV_PATH=/home/project29/development
PROD_PATH=/home/project29/production

git -C $DEV_PATH/server reset --hard
git -C $DEV_PATH/server pull
npm install --prefix $DEV_PATH/server
npm run --prefix $DEV_PATH/server build

rm -r $PROD_PATH/dist/*
cp -r $DEV_PATH/server/dist/* $PROD_PATH/dist
cp -r $DEV_PATH/server/scripts $PROD_PATH
cp -r $PROD_PATH/config $PROD_PATH/dist
cp -r $DEV_PATH/server/node_modules $PROD_PATH
cp $DEV_PATH/server/src/mail/template.html $PROD_PATH/dist/mail/template.html
cp $DEV_PATH/server/.env $PROD_PATH

