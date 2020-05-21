import { StandardStorage, IKeyProps } from './../storage.ts';
import { BaseCommand } from "./Commands.ts";

export class KeyCommand extends BaseCommand {
  constructor(private query: string, connection: Deno.Conn) {
    super(connection);
  }

  execute(): any {
    const _val = this.sanitize_value(this.query);

    // get all keys
    Object.values(StandardStorage.getInstance().storage.data.standard).forEach((element:any) => {
      this.out(element.key);
    });

    console.log("Looking for key names with this fuzzy match", _val);
  }
}
