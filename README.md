# Echo 

![CD](https://github.com/RedactedProfile/Echo/workflows/CD/badge.svg?branch=master)  

An in-memory cache datastore written with Deno.

---

## Installing 

#### Package Manager

Download the binary from apt, choco, etc

#### Docker 

```
# Unfortunately, thanks to https://github.community/t5/GitHub-Actions/docker-pull-from-public-GitHub-Package-Registry-fail-with-quot/m-p/32888#M1294 you need to supply basic auth :|  we'll likely be publishing to Dockerhub in response until GitHub figures this out
docker run -e MAX_CONNECTIONS=200 -p 8200:8200 docker.pkg.github.com/redactedprofile/echo/echo:latest 
```

#### Download

Attain binary from releases page, manual installation

#### Build from Source 

Clone the source code, build yourself 

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

### TODO