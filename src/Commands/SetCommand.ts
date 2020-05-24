import { StandardStorage } from './../storage.ts';
import { BaseCommand } from "./Commands.ts";
import { moment } from '../../deps.ts';

interface ISetProps {
  key: string;
  value: string;
  extras: Array<string>;
  connection: Deno.Conn;
}

export class SetCommand extends BaseCommand {

  private properties:ISetProps;

  constructor(props:ISetProps) {
    super(props.connection);

    this.properties = props;
  }

  execute(): any {
    const _val = this.sanitize_value(this.properties.value);

    let props: any = { key: this.properties.key, val: this.properties.value };

    if (this.properties.extras && this.properties.extras.length > 0) {
      // get the TTL if provided
      const s_ttl = this.properties.extras.shift();
      if (s_ttl) {
        const n_ttl = parseInt(s_ttl);
        if (n_ttl) {
          props.ttl = moment().add(n_ttl, 'seconds').format();
          // @todo execute TTL subroutine
        }
      }
    }

    StandardStorage.add(props);

    this.out("Success");
  }
}
