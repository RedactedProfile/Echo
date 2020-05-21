export 
enum Command {
    CHK,  // Exists / Checks
    GET,  // Retrieve / Get value
    SET,  // Set / Create / Update
    DEL,  // Delete / Remove
    TTL,  // Time to Live,
    NUK,  // Flushes / Nukes all Keys,
    KEY,  // Search / Find Keys
    FND,  // Search / Find Values
};

export 
interface IQueryConstructProps {
    query: string;
};

export 
type ExecutableCommand = {  
    execute():any;
}

export 
class NukeCommand implements ExecutableCommand {
    // Nuke is a command that doesn't take any arguments, no constructor is needed (at this time)

    execute():any {
        console.log("Nuking this place to glass");
    }
}

export 
class KeyCommand implements ExecutableCommand {
    constructor(private query:string) {

    }

    execute():any {
        console.log("Looking for key names with this fuzzy match", this.query);
    }
}

export 
class FindCommand implements ExecutableCommand {
    constructor(private query:string) {

    }

    execute():any {
        console.log("Looking for keys with this value somewhere", this.query);
    }
}

export 
class Query {

    /*
    SET key "my value"
    SET exp_key "my value" 1200
    EXP key 1400
    EXP key,exp_key 1400
    DEL key,exp_key 
    */

    original_query!: string;
    
    // command!:Command;
    // key!:string;
    // value!:string;
    // extras!:[string];

    constructor(
        props:IQueryConstructProps, 
        private command:Command,
        private key:string, 
        private value:string,
        private extras:Array<string> 
    ) {
        if(props.query) {
            this.parse(props.query);
        }
    }

    parse(query: string) {
        this.original_query = query;
        
        // STEP 1: detect command, we can split by space and get the first element as the supplied command buffer

        // split the query up via a this regex pattern, lovingly found here: https://stackoverflow.com/a/9584469
        const re_query_splitter = /\s+(?=((\\[\\"]|[^\\"])*"(\\[\\"]|[^\\"])*")*(\\[\\"]|[^\\"])*$)/;
        const separator_string = '|#!|';
        const q_pieces = query.replace(re_query_splitter, separator_string).split(separator_string);

        const q_cmd = q_pieces.shift()?.toUpperCase();

        // trivial return: q_cmd is falsy or doesn't exist
        if(!q_cmd || !Object.values(Command).includes(q_cmd)) { 
            throw new Error('Invalid Command'); }

        // supply this class the discovered command enum
        this.command = Command[q_cmd as keyof typeof Command];

        // STEP 2: The Nuke command is the only command that doesn't take any further instruction (so far) so we can just handle this now
        if(this.command === Command.NUK) {
            if(q_pieces.length) {
                this.extras = q_pieces; }
            return this.handle_query();
        }

        // STEP 3: Determine if this is a search function, which is special in that it doesn't take a key, but instead a search string
        if([Command.KEY, Command.FND].indexOf(this.command) >= 0) {
            const _val = q_pieces.shift()?.toString();
            if(!_val) {
                throw new Error("Search Command missing Query"); }

            this.value = _val;

            if(q_pieces.length) {
                this.extras = q_pieces; }

            return this.handle_query();
        }

        // STEP 4: The second slot aside from above all determine the key to be the second slot
        const _key = q_pieces.shift()?.toString();
        if(!_key) {
            throw new Error("Key not provided or missing"); }

        this.key = _key;

        // STEP 5: The third slot would usually be the quited value (if any)
        const _val = q_pieces.shift()?.toString();
        if(_val) {
            this.value = _val; }

        // STEP 6: Dump everything else into "extras", an array of values left that can be specically determined if desired or wanted by that command
        if(q_pieces.length) {
            this.extras = q_pieces; }

        console.log(this);

        return this.handle_query();
    }

    handle_query() {
        let cmd:ExecutableCommand;
        switch(this.command) {
            case Command.NUK:
                cmd = new NukeCommand();
                break;
            case Command.KEY:
                cmd = new KeyCommand(this.value);
                break;
            case Command.FND:
                cmd = new FindCommand(this.value);
                break;
            default:
                throw new Error("Unregistered Command");
                break;
        }

        // Execute command
        cmd.execute();
    }

}