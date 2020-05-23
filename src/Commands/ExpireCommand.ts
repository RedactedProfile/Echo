import { BaseCommand } from "./Commands.ts";
import { StandardStorage, KeyObject } from "../storage.ts";
import { SetCommand } from "./SetCommand.ts";

export class ExpireCommand extends BaseCommand {
  constructor(private key: string, private ttl:string, connection: Deno.Conn) {
    super(connection);
  }

  execute(): any {
    const _val:KeyObject = StandardStorage.retrieve(this.key);
    if(_val && _val.is_valid()) {
        const subcmd = new SetCommand(_val.key, _val.value, [this.ttl], this.connection)
                           .execute();
    } else {
      throw new Error("Error: Invalid Key");
    }
  }
}
