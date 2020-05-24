import { BaseCommand } from "./Commands.ts";
import { StandardStorage, KeyObject } from "../storage.ts";

interface IExistsProps {
  key: string;
  connection: Deno.Conn;
}

export class ExistsCommand extends BaseCommand {

  private properties: IExistsProps;

  constructor(props:IExistsProps) {
    super(props.connection);
    this.properties = props;
  }

  execute(): any {
    const _val:KeyObject = StandardStorage.retrieve(this.properties.key);
    const _determined = (_val && _val.is_valid()) ? 1 : 0; 
    this.out(_determined.toString());
  }
}
