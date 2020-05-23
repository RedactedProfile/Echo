import { md5, moment } from "../deps.ts";
import { DeleteCommand } from "./Commands/Commands.ts";

interface IKeyValidProps {
  now?: any; // moment instance
}

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

  public is_valid(props: IKeyValidProps = {}) {
    // if we dont have to instantiate a new moment instance, then we shouldn't
    if(!props.now) {
      props.now = moment();
    }
    const _valid = this.ttl === 0 || (this.ttl && props.now.isBefore(this.ttl));

    if(!_valid) { 
      StandardStorage.delete(this.key);
    }

    return _valid;
  }
}


export class Storage {
  private static instance: Storage;

  private _data: any = {};

  get data():any {
    return this._data;
  }

  private constructor() {
    this.flush(); // initialize data table
  }

  public flush() {
    this._data = {
      standard: {},
    };
  }

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }
}



export interface IKeyProps {
  key: string;
  val: string;
  ttl?: number;
}

export class StandardStorage {
  private static instance: StandardStorage;

  private _storage:Storage;

  get storage():Storage {
    return this._storage;
  }

  constructor() {
    this._storage = Storage.getInstance();
  }

  public static getInstance(): StandardStorage {
    if (!StandardStorage.instance) {
      StandardStorage.instance = new StandardStorage();
    }

    return StandardStorage.instance;
  }

  public static add(props: IKeyProps) {
    const new_key = new KeyObject();
    new_key.key = props.key;
    new_key.value = props.val;
    if (props.ttl) {
      new_key.ttl = props.ttl;
    }

    const storage_key = md5(new_key.key);

    // this.storage.data.standard[storage_key] = new_key;
    StandardStorage.getInstance().storage.data.standard[storage_key] = new_key;
  }

  public static retrieve(key:string) {
    key = md5(key);
    return StandardStorage.getInstance().storage.data.standard[key];
  }

  public static delete(key:string) {
    key = md5(key);
    delete StandardStorage.getInstance().storage.data.standard[key];
    return;
  }
}