import { BaseCommand } from './BaseCommand.ts';

export 
class NukeCommand extends BaseCommand {
    // Nuke is a command that doesn't take any arguments, no constructor is needed (at this time)
    constructor(connection:Deno.Conn) {
        super(connection)
    }
    execute():any {
        console.log("Nuking this place to glass");
        this.out("Nuked this place to glass");
    }
}