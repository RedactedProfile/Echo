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
    const do_search = _val.indexOf('*') >= 0;
    // get all keys
    Object.values(StandardStorage.getInstance().storage.data.standard)
    .forEach((element:any) => {
      if(element.ttl === 0 || (element.ttl && now.isBefore(element.ttl))) {
        // determine if this key matches the search inquiry (if provided)
        let determined = false;
        if(!do_search) {
          determined = true;
        } else {
          if(_val.charAt(0) === '*') {

          } else if(_val.charAt(_val.length) === '*') {
            
          } else {
            determined = true;
          }
        }

        if(determined) {
          _out.push(element.key);
        }
      }
    });

    this.out(JSON.stringify(_out));

    console.log("Looking for key names with this fuzzy match", _val);
  }
}
