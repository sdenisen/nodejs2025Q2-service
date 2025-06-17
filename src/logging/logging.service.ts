import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

@Injectable()
export class LoggingService extends ConsoleLogger {
  private logDir = 'logs';
  private logFile = path.join(this.logDir, 'log.txt');
  private logLevel: LogLevel = LogLevel.INFO;

  constructor() {
    super();
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [
      LogLevel.ERROR,
      LogLevel.WARN,
      LogLevel.INFO,
      LogLevel.DEBUG,
      LogLevel.VERBOSE,
    ];
    const currentIdx = levels.indexOf(this.logLevel);
    const levelIdx = levels.indexOf(level);
    return levelIdx <= currentIdx;
  }

  private writeToFile(level: LogLevel, message: string) {
    if (!this.shouldLog(level)) {
      return;
    }
    fs.appendFileSync(this.logFile, message);
  }

  async log(message: unknown) {
    this.writeToFile(LogLevel.INFO, `${message}\n`);
  }

  async error(message: unknown) {
    this.writeToFile(LogLevel.ERROR, `${message}\n`);
  }

  async warn(message: unknown) {
    this.writeToFile(LogLevel.WARN, `${message}\n`);
  }

  async debug(message: unknown) {
    this.writeToFile(LogLevel.DEBUG, `${message}\n`);
  }

  async verbose(message: unknown) {
    this.writeToFile(LogLevel.VERBOSE, `${message}\n`);
  }
}
