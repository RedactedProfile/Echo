import { BaseCommand } from "./Commands.ts";
import { StandardStorage, KeyObject } from "../storage.ts";

export class ExistsCommand extends BaseCommand {
  constructor(private key: string, connection: Deno.Conn) {
    super(connection);
  }

  execute(): any {
    const _val:KeyObject = StandardStorage.retrieve(this.key);
    const _determined = (_val && _val.is_valid()) ? 1 : 0; 
    this.out(_determined.toString());
  }
}
