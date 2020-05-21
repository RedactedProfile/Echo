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

## Usage

#### Create / Update Key 

```
SET mykey "keyvalue"
```

#### Set / Update an existing key's TTL (Time to Live) 

```
EXP mykey 1600
```

#### Check if a key exists

```
EXT mykey
```

#### Delete / Remove a key 

```
DEL mykey
```

---

## Contributing

