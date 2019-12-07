import assert = require('assert');
import { AnyConstructor, Base, bindConstructor } from '../source/index';

describe('BaseClass', () => {
  interface YI {}

  interface YC<U extends YI = YI> extends AnyConstructor<U> {
    z(): string;
  }

  abstract class X extends Base implements YI {
    xa!: string;
    xf!: string;
    xfr!: string;

    protected ef: string = 'ex';
    protected readonly efr: string = 'ex';

    protected get ea() {
      return 'ex';
    }

    static z() {
      return 'X';
    }

    type() {
      return X;
    }
  }

  @bindConstructor<YC>()
  class Y extends X {
    protected ef: string = 'ey';
    protected readonly efr: string = 'ey';

    protected get ea() {
      return 'ey';
    }

    static z() {
      return 'Y';
    }

    static zz() {
      return super.z();
    }

    setup(...items: any[]): void {
      this.xf = 'ey' === this.ef ? 'TRUE' : 'FALSE';
      this.xfr = 'ey' === this.efr ? 'TRUE' : 'FALSE';
      this.xa = 'ey' === this.ea ? 'TRUE' : 'FALSE';
    }

    type() {
      return Y;
    }
  }

  const y = new Y();

  it('Y', () => {
    console.dir(y);
    assert.strictEqual('FALSE', y.xf);
    assert.strictEqual('FALSE', y.xfr);
    assert.strictEqual('TRUE', y.xa);
    assert.strictEqual('Y', y.type().z());
    assert.strictEqual('X', y.type().zz());
  });
});
