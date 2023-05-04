// APP
import { Deferred } from './Deferred';

describe('Utils: Deferred', () => {
  let deferred;

  beforeEach(() => {
    deferred = Deferred();
  });

  it('should be defined', () => {
    expect(deferred).toBeDefined();
  });

  it('should be able to resolved later', (done) => {
    deferred.then((result) => {
      expect(result).toBe('Resolved');
      done();
    });

    deferred.resolve('Resolved');
  });

  it('should be able to reject later', (done) => {
    deferred
      .then(() => {
        // Should not enter this block
      })
      .catch((err) => {
        expect(err).toBe('Rejected');
        done();
      });

    deferred.reject('Rejected');
  });
});
