import { BaseCommand } from "./Commands.ts";

interface INukeProps {
  connection: Deno.Conn;
}

export class NukeCommand extends BaseCommand {

  private properties:INukeProps;

  // Nuke is a command that doesn't take any arguments, no constructor is needed (at this time)
  constructor(props:INukeProps) {
    super(props.connection);

    this.properties = props;
  }
  execute(): any {
    console.log("Nuking this place to glass");

    this.storage_engine.flush();

    this.out("Nuked this place to glass");
  }
}
