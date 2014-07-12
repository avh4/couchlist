# couchlist



## Development

```
npm install
npm run-script dev
open http://localhost:8080/webpack-dev-server/
node ./actors/main.js
```

You will need to enable [CORS](http://docs.couchdb.org/en/latest/config/http.html?highlight=cors) on your local couchdb instance.

/usr/local/etc/couchdb/default.ini

```
enable_cors = true

[cors]
credentials = false
origins = *
```

Create a database

```bash
curl -X PUT http://localhost:5984/couchlist-dev
```
