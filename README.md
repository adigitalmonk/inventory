# Inventory

This is an extremely lightweight system for tracking assets.

## Configuration

There are three configurable options:
- `PORT` <- HTTP port that the API will listen on
- `MONGO_HOST` <- full Mongo route, defaults to localhost, compose is set to point this at the container
- `MONGO_DATABASE` <- The database to use in the Mongo instance
- `ACCESS_TOKEN` <- The access token for the `/inventory` routes.

Each can be set in the `services.api.environment` section of the `docker-compose.yml` file.

When using `ACCESS_TOKEN`, you'll need to include the `Authorization` HTTP header.
It's expected in the form `Token ${ACCESS_TOKEN}`. i.e., `Authorization: Token XQy4MvTw0H7ibqpFeIF`.

## Run It

This is set up with `docker-compose`, so all you'll need to do is have the Docker runtime online and run `docker-compose up -d`, then you'll be able to hit the API at `http://localhost:8080`.

## Endpoints

### GET /inventory
This endpoint will list all of the assets by ID.

(Optional) parameters:
- `fields` allows you to specify extra fields with the listing

#### Examples
- GET /inventory
```json
[
    { "_id": "1" },
    { "_id": "2" },
    { "_id": "3" }
]
```
- GET /inventory?fields=os,last_access
```json
[
    { "id": "1", "os": "Windows 10", "last_access": "01-01-2020 12:34:56" },
    { "id": "2", "os": "Windows 7", "last_access": "01-01-2020 11:34:56" },
    { "id": "3", "os": "Ubuntu", "last_access": "01-01-2020 10:34:56" }
]
```

### GET /inventory/:id
Get the full information for a given ID

#### Examples
- GET /inventory/abc123
```json
[
    { 
        "_id": "abc123",
        "os": "Windows 7",
        "last_access": "2020-01-01 01:20:33",
        "last_user": "admin01",
        "software": []
    }
]
```

### POST /inventory/:id
Submit an inventory for a given ID.
Expects a JSON body which will be used as the inventory.
Anything goes!

#### Examples
```
POST /inventory/abc123
{
    "os": "Windows 7",
    "last_access": "2020-01-01 01:20:33",
    "last_user": "admin02",
    "current_user": null,
    "software": [ "Word", "Excel" ]
}
```

```json
{
  "success": false,
  "result": {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
}
```
