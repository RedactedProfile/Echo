import { ExecutableCommand } from "../Interfaces/ExecuteableCommand.ts";
import { Storage } from "../storage.ts";

export class BaseCommand implements ExecutableCommand {
  private encoder = new TextEncoder();
  public storage_engine: Storage;

  constructor(
    public connection: Deno.Conn,
  ) {
    this.storage_engine = Storage.getInstance();
  }

  async out(message: string) {
    await this.connection.write(this.encoder.encode(`${message}\r\n`));
  }

  sanitize_value(_val: string) {
    // function that strips off surrounding double quotes and removes any slashes found within
    return _val;
  }

  execute(): any {
    console.log("Not Implemented");
  }
}
