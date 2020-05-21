import { BaseCommand } from './Commands.ts';

export 
class SetCommand extends BaseCommand {
    constructor(private key:string, private value:string, private extras:Array<string>, connection:Deno.Conn) {
        super(connection);
    }

    execute():any {
        const _val = this.sanitize_value(this.value);
        console.log("Setting key:", this.key, "with value:", _val, "and maybe", this.extras);
    }
}