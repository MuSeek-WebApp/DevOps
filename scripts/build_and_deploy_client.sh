#!/bin/bash
DEV_PATH=/home/project29/development
PROD_PATH=/home/project29/production

git -C $DEV_PATH/client reset --hard
git -C $DEV_PATH/client pull
npm install --prefix $DEV_PATH/client
npm run --prefix $DEV_PATH/client build

rm -r $PROD_PATH/view/*
cp -r $DEV_PATH/client/dist/* $PROD_PATH/view
