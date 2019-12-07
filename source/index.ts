export function bindConstructor<T>() {
  return <U extends T>(constructor: U) => {
    // noinspection BadExpressionStatementJS
    constructor;
  };
}

export type BaseType<U> = InstanceType<U & { new (...args: any): any }>;

export interface AnyConstructor<U extends {} = {}> {
  new (...items: any[]): U;
}

export abstract class Base {
  constructor(...items: any[]) {
    this.setup(...items);
  }

  static create<U extends typeof Base>(this: U, ...items: any[]): BaseType<U> {
    return Reflect.construct(this, items);
  }

  setup(...items: any[]): void {}

  //noinspection JSMethodCanBeStatic
  type() {
    return Base;
  }
}

export interface Singleton<U extends {}> {
  readonly singleton: U;
}

export interface ConstructorMap<T extends AnyConstructor<U>, U extends {}> {
  [index: string]: T;
}

export interface Factory<T extends AnyConstructor<U>, U extends {}> {
  readonly map: ConstructorMap<T, U>;
  readonly nullType: T;

  createInstance(name: string, ...items: any[]): BaseType<T>;

  getConstructor(name: string): T;
}
