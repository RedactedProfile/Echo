import { ExecutableCommand } from '../Interfaces/ExecuteableCommand.ts';

export 
class BaseCommand implements ExecutableCommand {

    private encoder = new TextEncoder();

    constructor(public connection:Deno.Conn) {

    }

    async out(message:string) {
        await this.connection.write(this.encoder.encode(`${message}\r\n`))
    }

    sanitize_value(_val:string) {
        // function that strips off surrounding double quotes and removes any slashes found within
        return _val;
    }

    execute():any {
        console.log("Not Implemented");
    }
}