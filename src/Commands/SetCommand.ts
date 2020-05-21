import { BaseCommand } from "./Commands.ts";

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
          props.ttl = n_ttl;
        }
      }
    }

    this.storage_engine.add(props);

    this.out("Success");
  }
}
