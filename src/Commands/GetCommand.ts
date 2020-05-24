import { BaseCommand } from "./Commands.ts";
import { StandardStorage, KeyObject } from "../storage.ts";

interface IGetProps {
  key: string;
  connection: Deno.Conn;
}

export class GetCommand extends BaseCommand {

  private properties:IGetProps;

  constructor(props:IGetProps) {
    super(props.connection);
    this.properties = props;
  }

  execute(): any {
    const _val:KeyObject = StandardStorage.retrieve(this.properties.key);
    if(_val && _val.is_valid()) {
      this.out(this.sanitize_value(_val.value));
    } else {
      throw new Error("Error: Invalid Key");
    }
  }
}
