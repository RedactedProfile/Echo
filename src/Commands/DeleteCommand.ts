import { BaseCommand } from "./Commands.ts";
import { StandardStorage, KeyObject } from "../storage.ts";

export class DeleteCommand extends BaseCommand {
  constructor(private key: string, connection: Deno.Conn) {
    super(connection);
  }

  execute(): any {
    StandardStorage.delete(this.key);
    // do we even need to verify? Even if the key didn't exist, it's gone..
    this.out("1"); 
  }
}
