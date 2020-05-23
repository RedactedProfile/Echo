import { Command } from "./Enums/Command.ts";
import { ExecutableCommand } from "./Interfaces/ExecuteableCommand.ts";
import {
  DeleteCommand,
  ExistsCommand,
  FindCommand,
  GetCommand,
  KeyCommand,
  NukeCommand,
  SetCommand,
  ExpireCommand,
} from "./Commands/Commands.ts";

interface IQueryConstructProps {
  query: string;
  connection: Deno.Conn;
}

export class Query {
  original_query!: string;
  original_pieces!: Array<string>;
  conn!: Deno.Conn;

  private command!: Command;
  private key!: string;
  private value!: string;
  private extras!: Array<string>;

  constructor(props: IQueryConstructProps) {
    this.conn = props.connection;

    if (props.query) {
      this.parse(props.query);
    }
  }

  parse(query: string) {
    this.original_query = query;

    // STEP 1: detect command, we can split by space and get the first element as the supplied command buffer

    // split the query up via a this regex pattern, lovingly found here: https://stackoverflow.com/a/9584469
    const re_query_splitter =
      /\s+(?=((\\[\\"]|[^\\"])*"(\\[\\"]|[^\\"])*")*(\\[\\"]|[^\\"])*$)/g;
    const separator_string = "|#!|";
    const q_pieces = query.replace(re_query_splitter, separator_string)
      .split(separator_string);

    this.original_pieces = Object.assign([], q_pieces); // informational storage

    const q_cmd = q_pieces.shift()?.toUpperCase();

    // trivial return: q_cmd is falsy or doesn't exist
    if (!q_cmd || !Object.values(Command).includes(q_cmd)) {
      throw new Error("Invalid Command");
    }

    // supply this class the discovered command enum
    this.command = Command[q_cmd as keyof typeof Command];

    // STEP 2: The Nuke command is the only command that doesn't take any further instruction (so far) so we can just handle this now
    if (this.command === Command.NUK) {
      if (q_pieces.length) {
        this.extras = q_pieces;
      }
      return;
    }

    // STEP 3: Determine if this is a search function, which is special in that it doesn't take a key, but instead a search string
    if ([Command.KEY, Command.FND].indexOf(this.command) >= 0) {
      const _val = q_pieces.shift()?.toString();
      if (!_val) {
        throw new Error("Search Command missing Query");
      }

      this.value = _val;

      if (q_pieces.length) {
        this.extras = q_pieces;
      }

      return;
    }

    // STEP 4: The second slot aside from above all determine the key to be the second slot
    const _key = q_pieces.shift()?.toString();
    if (!_key) {
      throw new Error("Key not provided or missing");
    }

    this.key = _key;

    // STEP 5: The third slot would usually be the quited value (if any)
    const _val = q_pieces.shift()?.toString();
    if (_val) {
      this.value = _val;
    }

    // STEP 6: Dump everything else into "extras", an array of values left that can be specically determined if desired or wanted by that command
    if (q_pieces.length) {
      this.extras = q_pieces;
    }

    return;
  }

  handle_query() {
    // console.log(this);

    let cmd: ExecutableCommand;

    switch (this.command) {
      case Command.CHK:
        cmd = new ExistsCommand(this.key, this.conn);
        break;
      case Command.GET:
        cmd = new GetCommand(this.key, this.conn);
        break;
      case Command.SET:
        cmd = new SetCommand(this.key, this.value, this.extras, this.conn);
        break;
      case Command.NUK:
        cmd = new NukeCommand(this.conn);
        break;
      case Command.KEY:
        cmd = new KeyCommand(this.value, this.conn);
        break;
      case Command.FND:
        cmd = new FindCommand(this.value, this.conn);
        break;
      case Command.DEL:
        cmd = new DeleteCommand(this.key, this.conn);
        break;
      case Command.TTL:
        cmd = new ExpireCommand(this.key, this.value, this.conn);
        break;
      default:
        throw new Error("Unregistered Command");
        break;
    }

    // Execute command
    cmd.execute();
  }
}
