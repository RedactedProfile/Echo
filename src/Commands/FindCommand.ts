import { BaseCommand } from './BaseCommand.ts';

export 
class FindCommand extends BaseCommand {
    constructor(private query:string, connection:Deno.Conn) {
        super(connection);
    }

    execute():any {
        const _val = this.sanitize_value(this.query);
        console.log("Looking for keys with this value somewhere", _val);
    }
}