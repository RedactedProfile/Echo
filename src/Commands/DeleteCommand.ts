import { BaseCommand } from "./Commands.ts";
import { StandardStorage, KeyObject } from "../storage.ts";

interface IDeleteProps { 
  key: string;
  connection: Deno.Conn;
}

export class DeleteCommand extends BaseCommand {

  private properties:IDeleteProps;

  constructor(props:IDeleteProps) {
    super(props.connection);
    this.properties = props;
  }

  execute(): any {
    StandardStorage.delete(this.properties.key);
    // do we even need to verify? Even if the key didn't exist, it's gone..
    this.out("1"); 
  }
}
