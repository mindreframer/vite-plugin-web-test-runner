import { expect } from 'chai';
import { sum } from './math';

describe('sum', () => {
  it('works correctly', () => {
    expect(sum(4, 8)).to.eq(12);
  });
});
