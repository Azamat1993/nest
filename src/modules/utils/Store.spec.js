import Store from './Store';

describe('Store', () => {
  it('should be defined', () => {
    expect(Store).toBeDefined();
  });

  it('should have getInstance method', () => {
    expect(Store.getInstance).toBeDefined();
  });

  it('should give the same instance', () => {
    expect(Store.getInstance()).toBe(Store.getInstance());
  });
});
