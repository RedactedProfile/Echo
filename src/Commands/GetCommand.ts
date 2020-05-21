import { BaseCommand } from './Commands.ts';

export 
class GetCommand extends BaseCommand {
    constructor(private key:string, connection:Deno.Conn) {
        super(connection);
    }

    execute():any {
        console.log("Retriving:", this.key, "'s value if any");
    }
}