import { assertEquals } from "./deps.ts";
import { Query } from "./src/query.ts";
import { Storage } from "./src/storage.ts";

const env = Deno.env.toObject();
const PORT = env.PORT || 8200;
const HOST = env.HOST || "0.0.0.0";
const MAX_CONNECTIONS = env.MAX_CONNECTIONS || 200;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const connections: Deno.Conn[] = [];

const binaryListener = Deno.listen({ port: 8200 });

console.log("Initializing Clean Storage");
Storage.getInstance();

console.log("Listening on 8200");

for await (const conn of binaryListener) {
  connections.push(conn);
  await conn.write(encoder.encode("Welcome to Echo\r\n"));
  handle_connection(conn);
}

async function handle_connection(connection: Deno.Conn) {
  let buffer = new Uint8Array(1024);
  let work = true;
  while (work) {
    let count;
    
    try {
      count = await connection.read(buffer);
    } catch(ConnectionReset) {
      // @todo clear connection from pool
      work = false;
    }

    if (!count) {
      // connection closed
      const index = connections.indexOf(connection);
      connections.splice(index, 1);
      break;
    } else {
      for (const current_connection of connections) {
        if (current_connection === connection) {
          let message = buffer.subarray(0, count);
          let query = decoder.decode(message).toString().trim();

          if(query === 'quit') {
            work = false;
            await current_connection.write(encoder.encode(`Goodbye\r\n`));
            await current_connection.close();
            return;
          }

          // console.log("Query received:", query);
          try {
            const _query = new Query({
              query: query,
              connection: current_connection,
            });
  
            _query.handle_query();
          } catch(err) {
            await current_connection.write(encoder.encode(`${err}\r\n`));
          }
        }
      }
    }
  }
}
