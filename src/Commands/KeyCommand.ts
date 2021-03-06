import { StandardStorage, KeyObject } from './../storage.ts';
import { BaseCommand } from "./Commands.ts";
import { moment } from '../../deps.ts';

interface IKeyProps {
  query: string;
  connection: Deno.Conn;
}

export class KeyCommand extends BaseCommand {

  private properties: IKeyProps;

  constructor(props:IKeyProps) {
    super(props.connection);
    this.properties = props;
  }

  execute(): any {
    let _val = this.sanitize_value(this.properties.query);

    const _out:string[] = [];
    const now = moment();
    const do_search = _val.indexOf('*') >= 0;
    // get all keys
    Object.values(StandardStorage.getInstance().storage.data.standard)
    .forEach((element:any) => {
      if(element.is_valid({now: now})) {
        // determine if this key matches the search inquiry (if provided)
        let determined = false;
        if(!do_search) {
          determined = true;
        } else {
          if (_val.charAt(0) === '*' && _val.charAt(_val.length - 1) === '*') {
                         // asking if this string is anywhere
            determined = element.key.indexOf(_val.replace(/\*/g, '')) >= 0;
          } else if(_val.charAt(0) === '*') {
            if(_val.length === 1) {
              determined = true;
            } else {
              // suffix search
              const q = _val.replace('*', '');
                           // reverse the strings and match at position 0
              determined = element.key.split('').reverse().join('').indexOf(q.split('').reverse().join('')) === 0;
            }
          } else if(_val.charAt(_val.length - 1) === '*') {
            // prefix search
                         // basic match at position 0
            determined = element.key.indexOf(_val.replace('*', '')) === 0;
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
  }
}
