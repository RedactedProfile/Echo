import { StandardStorage, IKeyProps } from './../storage.ts';
import { BaseCommand } from "./Commands.ts";
import { moment } from '../../deps.ts';

export class KeyCommand extends BaseCommand {
  constructor(private query: string, connection: Deno.Conn) {
    super(connection);
  }

  execute(): any {
    const _val = this.sanitize_value(this.query);

    const _out:string[] = [];
    const now = moment();
    // get all keys
    Object.values(StandardStorage.getInstance().storage.data.standard)
    .forEach((element:any) => {
      if(element.ttl === 0 || (element.ttl && now.isBefore(element.ttl))) {
        _out.push(element.key);
      }
    });

    this.out(JSON.stringify(_out));

    console.log("Looking for key names with this fuzzy match", _val);
  }
}
