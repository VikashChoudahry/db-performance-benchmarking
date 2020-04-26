# db-performance-benchmarking
PostgreSQL & MySQL DB performance benchmarking.

# Steps to steup
## Pre-requisites
### Make sure Postgresql and MySQL database is installed and accessible.
*Note:* Tested on MySQL - v5.7 | PostgreSQL - v11.2

## Set the necessary env variables by running the below command:
``
cp env.example .env
``
## Add the env variable's value
### At a time enable only one database env variables and others comment it out.
#### For e.g. if you have to get the stats of MySQL then comment out the PostgreSQL DB env variables and vice-versa.

## Run the npm install: (node v12.13.1)
npm install

## Build the application:
npm run build or npm run build:watch
*Note:* For more details please refer to the package.json file.

# To see the benchmarking stats, just run:
npm start

## Output: Directly can be seen in the console
*Sample output:*

Total content size >>> 206

    index | WRITE   | READ  | UPDATE
    mysql | 3203.31 | 45.66 | 21.3

Total content size >>> 206

    index     | WRITE   | READ  | UPDATE
    postgres  | 2447.64 | 45.26 | 50.2

*Note:*
1. If you want to calculate the average of 3 or whatever # of execution basis then execute the script those many times for the respective DB Dialect.
2. The current stats are generated based on the sample json objected which is placed under `src/app/response`. This reponse object can be modified further. To get the more realstic stats add modified the json object and run the script.
3. This stats are derived only on the basis of JSON types data. This will tell you how much time it takes to do the WRITE, READ and UPDATE operation.
4. The primary focus was on WRITE & READ. The `UPDATE` stats can be ignored. Becuase there are rare case when we do the bulk update else we mostly perform the udpate operation using primary key (or composite primary key).

*Enhancement:* Make the script dynamic to get the benchmarking stats.