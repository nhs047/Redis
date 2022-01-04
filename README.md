# Redis
Caching mechanism for microservices

## Development server
Install all dependencies with `npm install`
Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Redis-Server

Download & Run `Redis-Server`. You can also watch your redis data by `Redis-cli`.

## Redis URL
For dev or stage use `Redis.createClient()` & for production use `Redis.createClient({url:'your production redis url.'})`

## Redis Overview
As Redis works with string only, we have four mojaor types of data structure there.

- `Pair: key[string]-value[string]`
    - To set => set key value
    - To get => get key
    - To delete => del key
    - Check if exists => exists key
    - Check all keys => keys *
    - To clear all => flushall
    - To assign an expiration of declaired key => expire key time-in-seconds
    - Check a key's time to leave => ttl key (where -1 means no expiration, -2 means expired)
    - Set key value with expiration => setex key time-in-seconds value

- `List: key[string]-List of values[string[]]`
    - Create a list => lpush key value
    - Push a value to right of a list => rpush key value
    - Get the list => lrange key stating-index ending-index (0 and -1 means all records, if you want to take only first two values Then pass 0 1)
    - To pop the left most value from a list => LPOP key
    - To pop the right most value from a list => RPOP 
    
- `Set: key[string]-Set[unique string[]]`
    - To add a value to set => sadd key value
    - To get the value of set => smembers key
    - To remove a value from set => srem key value

- `Hash: key[string]-property[string]-value[string]`
    - To add hash => hset key property value
    - To get a property => hget key property
    - To get all property => hgetall key
    - To delete a property from a hash => hdel key property
    - To check if a property exist => hexists key properties
    - To reassign a value with same command of adding a hash

