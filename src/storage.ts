import { md5 } from "../deps.ts";

export class KeyObject {
  private _key: string = "";
  private _value: string = "";
  private _ttl: number = 0;

  get key(): string {
    return this._key;
  }
  set key(val: string) {
    this._key = val;
  }

  get value(): string {
    return this._value;
  }
  set value(val: string) {
    this._value = val;
  }

  get ttl(): number {
    return this._ttl;
  }
  set ttl(val: number) {
    this._ttl = val;
  }
}

interface IKeyProps {
  key: string;
  val: string;
  ttl?: number;
}

export class Storage {
  private static instance: Storage;

  private data: any = {
    standard: {},
  };

  private constructor() {}

  public add(props: IKeyProps) {
    const new_key = new KeyObject();
    new_key.key = props.key;
    new_key.value = props.val;
    if (props.ttl) {
      new_key.ttl = props.ttl;
    }

    const storage_key = md5(new_key.key);

    this.data.standard[storage_key] = new_key;

    console.log(this.data);
  }

  public static getInstance(): Storage {
    if (!Storage.instance) {
      console.log("Creating new instance of StorageEngine");
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }
}
