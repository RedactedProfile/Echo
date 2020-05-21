import { BaseCommand } from './Commands.ts';

export 
class KeyCommand extends BaseCommand {
    constructor(private query:string,connection:Deno.Conn) {
        super(connection);
    }

    execute():any {
        const _val = this.sanitize_value(this.query);
        console.log("Looking for key names with this fuzzy match", _val);
    }
}