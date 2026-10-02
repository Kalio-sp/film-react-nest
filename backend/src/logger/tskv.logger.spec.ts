import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('should format log message to TSKV', () => {
    const result = logger.formatMessage('log', 'hello', ['test']);

    expect(result).toContain('level=log');
    expect(result).toContain('message=hello');
    expect(result).toContain('params=["test"]');
    expect(result).toContain('time=');
  });

  it('should convert message to string', () => {
    const result = logger.formatMessage('error', 123);

    expect(result).toContain('level=error');
    expect(result).toContain('message=123');
  });

  it('should call console.log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('test');

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('should call console.error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    logger.error('test');

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('should call console.warn', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();

    logger.warn('test');

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
