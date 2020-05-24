import { BaseCommand } from "./Commands.ts";
import { StandardStorage, KeyObject } from "../storage.ts";
import { SetCommand } from "./SetCommand.ts";
import { moment } from "../../deps.ts";


interface IExpireProps {
  key:string;
  ttl?: string;
  connection: Deno.Conn
};

export class ExpireCommand extends BaseCommand {

  private properties:IExpireProps;

  constructor(props:IExpireProps) {
    super(props.connection);
    this.properties = props;
  }

  execute(): any {
    const _val:KeyObject = StandardStorage.retrieve(this.properties.key);
    if(_val && _val.is_valid()) {
      if(this.properties.ttl) {
        const subcmd = new SetCommand(_val.key, _val.value, [this.properties.ttl], this.properties.connection)
                           .execute();
      } else {
        // Difference in seconds
        this.out(Math.ceil((moment(_val.ttl).diff(moment()) / 1000)).toString());
      }
    } else {
      throw new Error("Error: Invalid Key");
    }
  }
}
