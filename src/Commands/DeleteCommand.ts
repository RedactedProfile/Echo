import { BaseCommand } from './Commands.ts';

export 
class DeleteCommand extends BaseCommand {
    constructor(private key:string, connection:Deno.Conn) {
        super(connection);
    }

    execute():any {
        console.log("Deleting key", this.key);
    }
}