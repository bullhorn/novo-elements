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

  it('should be able to resolved later', async () => {
    const promise = deferred.then((result) => {
      expect(result).toBe('Resolved');
    });
    deferred.resolve('Resolved');
    await promise;
  });

  it('should be able to reject later', async () => {
    const promise = deferred.catch((err) => {
      expect(err).toBe('Rejected');
    });
    deferred.reject('Rejected');
    await promise;
  });
});
