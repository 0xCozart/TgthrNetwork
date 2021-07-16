import { expect } from 'chai';
import { ipfsUpload } from '../../src/app/utils/ipfs/ipfsUtils';

const testData = { test: true, foo: 'panda' };

describe('ipfsUpload tests', () => {
  it('checks utility function for ipfs upload', async () => {
    const res = await ipfsUpload(testData);
    console.log(res);
    expect(res).to.be.a('string');
  });
});
