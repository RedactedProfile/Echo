import { BaseCommand } from './Commands.ts';

export 
class SetCommand extends BaseCommand {
    constructor(private key:string, private value:string, private extras:Array<string>, connection:Deno.Conn) {
        super(connection);
    }

    execute():any {
        const _val = this.sanitize_value(this.value);
        // console.log("Setting key:", this.key, "with value:", _val, "and maybe", this.extras);
        let props:any = {key: this.key, val: this.value};
        if(this.extras && this.extras.length > 0) {
            // get the TTL if provided
            const ttl = this.extras.shift();
            if(ttl) {
                props.ttl = parseInt(ttl);
            }
        }
        this.storage_engine.add(props);

        this.out("Success");
    }
}