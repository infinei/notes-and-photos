# start mongodb
sudo systemctl start mongod

# stop mongodb
sudo systemctl stop mongod

# check status of mongodb
sudo systemctl status mongod

# mongodb shell
mongosh

## get information in shell
show dbs
show collections

## switch to db
use dbName

## delete db
db.dropDatabase()

## create collection
db.createCollection("collectionName")

## add item to collection
db.collectionName.insertOne({itemToAdd})

## query collection
db.collectionName.find({optionalQueryParams})