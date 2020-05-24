import { BaseCommand } from "./Commands.ts";

interface IFindProps {
  query: string;
  connection: Deno.Conn;
}

export class FindCommand extends BaseCommand {

  private properties:IFindProps;

  constructor(props:IFindProps) {
    super(props.connection);
    this.properties = props;
  }

  execute(): any {
    const _val = this.sanitize_value(this.properties.query);
    console.log("Looking for keys with this value somewhere", _val);
  }
}
