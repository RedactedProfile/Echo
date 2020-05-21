import { assertEquals } from "./deps.ts";
import { Query } from './query.ts';

const env = Deno.env.toObject();
const PORT = env.PORT || 8200;
const HOST = env.HOST || "0.0.0.0";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const connections: Deno.Conn[] = [];

const binaryListener = Deno.listen({port: 8200});
console.log("Listening on 8200");

for await (const conn of binaryListener) {
    connections.push(conn);
    await conn.write(encoder.encode("Welcome to Echo\r\n"))
    handle_connection(conn);
}

async function handle_connection(connection: Deno.Conn) {
    let buffer = new Uint8Array(1024);
    let work = true;
    while(work) {
        const count = await connection.read(buffer);
        if(!count) {
            // connection closed
            const index = connections.indexOf(connection);
            connections.splice(index, 1);
            break;
        } else {
            // message received 
            
            for (const current_connection of connections) {
                if(current_connection === connection) {

                    console.log("message received");
                    let message = buffer.subarray(0, count);
                    let query = decoder.decode(message).toString().trim();

                    console.log("Query received:", query);
                    console.log(query);

                    const QueryObject = new Query({query: query});

                    const parsed_query = parse_query(query);
                    // handle_query(parsed_query, current_connection); 
                }
            }
        }
    }
}

function parse_query(query: string) {

}

// function handle_query(parsed_query, connection) {
//     /*
//     on quit
//     await current_connection.write(encoder.encode("Bye."));
//     current_connection.close();
//     */
// }