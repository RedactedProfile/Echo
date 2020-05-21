import { BaseCommand } from "./Commands.ts";

export class ExistsCommand extends BaseCommand {
  constructor(private key: string, connection: Deno.Conn) {
    super(connection);
  }

  execute(): any {
    console.log("Determining if ", this.key, " exists");
  }
}
