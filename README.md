# Echo 

An in-memory cache datastore written with Deno.

---

## Installing 

#### Package Manager

Download the binary from apt, choco, etc

#### Docker 

Docker pull instruction here 

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

```
SET mykey "keyvalue"
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

#### Search for a key by name

```
KEY "search value"
```

#### Search for a key by value 

```
FND "search value"
```

#### Nuke all keys 

```
NUK 
```

---

## Contributing

