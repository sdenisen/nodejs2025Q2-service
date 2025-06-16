type LogLevels = ('debug' | 'log' | 'error' | 'warn' | 'verbose')[];

export const LOG_LEVELS: LogLevels = [
  'debug',
  'log',
  'warn',
  'error',
  'verbose',
].slice(0, Number(process.env.LOG_LEVEL) + 1) as LogLevels;
