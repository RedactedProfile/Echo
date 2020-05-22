import { StandardStorage } from './../storage.ts';
import { BaseCommand } from "./Commands.ts";
import { moment } from '../../deps.ts';

export class SetCommand extends BaseCommand {
  constructor(
    private key: string,
    private value: string,
    private extras: Array<string>,
    connection: Deno.Conn,
  ) {
    super(connection);
  }

  execute(): any {
    const _val = this.sanitize_value(this.value);

    let props: any = { key: this.key, val: this.value };

    if (this.extras && this.extras.length > 0) {
      // get the TTL if provided
      const s_ttl = this.extras.shift();
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
