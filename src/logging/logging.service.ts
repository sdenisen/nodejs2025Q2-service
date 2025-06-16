import { ConsoleLogger } from '@nestjs/common';
import { LOG_LEVELS } from '../constants';
import { appendFile, readdir, stat } from 'node:fs/promises';
import { cwd } from 'node:process';
import { join } from 'node:path';

export class LoggingService extends ConsoleLogger {
  async log(message: unknown, context?: unknown) {
    if (!LOG_LEVELS.includes('log') || context !== 'INTERCEPTOR') return;

    const fileName = await this.getFileLogName('log');

    this.writeToFile(join(cwd(), fileName), `${message}\n`);
  }

  async error(message: unknown) {
    if (!LOG_LEVELS.includes('error')) return;

    const errorFileName = await this.getFileLogName('error.log');

    this.writeToFile(join(cwd(), errorFileName), `${message}\n`);
  }

  async warn(message: unknown) {
    if (!LOG_LEVELS.includes('warn')) return;

    const fileName = await this.getFileLogName('log');

    this.writeToFile(join(cwd(), fileName), `${message}\n`);
  }

  async debug(message: unknown) {
    if (!LOG_LEVELS.includes('debug')) return;

    const fileName = await this.getFileLogName('log');

    this.writeToFile(join(cwd(), fileName), `${message}\n`);
  }

  async verbose(message: unknown) {
    if (!LOG_LEVELS.includes('verbose')) return;

    const fileName = await this.getFileLogName('log');

    this.writeToFile(join(cwd(), fileName), `${message}\n`);
  }

  private async writeToFile(path, content) {
    await appendFile(path, content);
  }

  private async getFileLogName(logType: 'log' | 'error.log') {
    const files = await readdir(cwd());
    const logFiles = files.filter(
      (fileName) => fileName.startsWith(logType) && fileName.endsWith('.txt'),
    );

    if (logFiles.length === 0) {
      return `${logType}1.txt`;
    }

    const logFileNumbers = logFiles.map((fileName) =>
      Number(fileName.replace(logType, '').replace('.txt', '')),
    );

    const lastLogFileNumber = Math.max(...logFileNumbers);

    const lastLogFile = `${logType}${lastLogFileNumber}.txt`;

    const fileSize = await this.getFileSize(lastLogFile);

    if (fileSize > Number(process.env.MAX_FILE_SIZE)) {
      return `${logType}${lastLogFileNumber + 1}.txt`;
    }

    return lastLogFile;
  }

  private async getFileSize(fileName) {
    const fileStats = await stat(join(cwd(), fileName));

    const fileSizeKB = fileStats.size / 1024;

    return fileSizeKB;
  }
}
