import { createLogger, transports, format } from 'winston';
import { utilities } from 'nest-winston';

const { colorize, timestamp, combine, json } = format;
const { Console, File } = transports;
const { nestLike } = utilities.format;

export const winstonInstance = createLogger({
  transports: [
    new Console({
      format: combine(colorize(), timestamp(), nestLike()),
    }),
    new File({
      filename: 'logs/errors.json',
      level: 'error',
      format: json(),
    }),
    new File({
      filename: 'logs/warn.log',
      level: 'warn',
      format: combine(timestamp(), nestLike()),
    }),
  ],
});
