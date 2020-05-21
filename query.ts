export 
enum Command {
    SET, 
    DELETE,
    EXPIRE
};

export 
interface IQueryConstructProps {
    query: string;
};

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
    
    command!:Command;
    key!:string;
    value!:string;

    constructor(props:IQueryConstructProps) {
        if(props.query) {
            this.parse(props.query);
        }
    }

    parse(query: string) {
        this.original_query = query;
        // STEP 1: detect command, we can split by space and get the first element as the supplied command buffer
        const q_cmd = query.split(' ').shift()?.toUpperCase();
        // trivial return: q_cmd is falsy or doesn't exist
        if(!q_cmd || !Object.values(Command).includes(q_cmd)) { 
            throw new Error('Invalid Command'); }

        this.command = Command[q_cmd as keyof typeof Command];

        console.log(this);
    }
}