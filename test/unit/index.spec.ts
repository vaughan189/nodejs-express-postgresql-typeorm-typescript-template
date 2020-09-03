import 'mocha';
import { expect } from 'chai';

describe('bar', function () {
  it('sync function returns true', function () {
    expect(true).to.be.true;
  });

  it('async function returns true', async function () {
    expect(true).to.be.true;
  });
});
