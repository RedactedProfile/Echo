# Echo 

![CD](https://github.com/RedactedProfile/Echo/workflows/CD/badge.svg?branch=master)  

An in-memory cache datastore written with Deno.

## Disclaimer

This is currently beta software, and definitely not tested in a production sense.  The road to Release Candidate isn't far off but it does require testing and benchmarking. Make sure to check out https://github.com/RedactedProfile/Echo and watch for the progress. 

---

## Installing 

#### Docker 

```
docker run -e MAX_CONNECTIONS=200 -p 8200:8200 redactedprofile/echo:latest 
```

---

## Connecting / Interacting 

### CLI

```
# Using netcat
nc host:8200
```

### Serverside

```
Coming soon!
```

### Browser Interface

```
http://host:8201
```

### Via REST API

```
http://host:8201/api
```

---

## Usage

#### Check if a key exists

```
CHK mykey
```

#### Create / Update Key 
The value doesn't have to be wrapped in quotes, but if your value contains any spaces it will need them

```
SET mykey keyvalue
SET mykey "key value"
```

#### Create / Update Key with a TTL
This is a convenience feature to negate the need for sending a follow up command

```
SET mykey "keyvalue" 1200
```

#### Set / Update an existing key's TTL (Time to Live) 

```
TTL mykey 1600
```

#### Get / Retrieve Key value (if exists)

```
GET mykey
```

#### Delete / Remove a key 

```
DEL mykey
```

#### Search for a key by name using greedy wildcards.
Returns a JSON string array of discovered key names 

```
# Prefix search
KEY mykey*

# Suffix Search
KEY *mykey

# Fuzzy Search
KEY *mykey*
```

#### Search for a key by value 

```
FND "search value"
```

#### Nuke all keys 
This resets all tables to their default state

```
NUK 
```

---

## Contributing

### Dependencies 
- [Deno](https://deno.land/) 

### Running 

Though optional, This project uses the [Velociraptor](https://deno.land/x/velociraptor) task runner for common tasks, to install

```
$ deno install --allow-read --allow-env --allow-run -n vr https://deno.land/x/velociraptor/cli.ts
```

To run the project

```
$ vr start
```

Without Velocirator

```
deno run --allow-env --allow-net .\echo.ts 
```

### TODO
