import { BaseCommand } from "./Commands.ts";
import { StandardStorage, KeyObject } from "../storage.ts";

export class GetCommand extends BaseCommand {
  constructor(private key: string, connection: Deno.Conn) {
    super(connection);
  }

  execute(): any {
    const _val:KeyObject = StandardStorage.retrieve(this.key);
    if(_val && _val.is_valid()) {
      this.out(this.sanitize_value(_val.value));
    } else {
      throw new Error("Error: Invalid Key");
    }
  }
}
