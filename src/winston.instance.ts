import { createLogger, transports, format } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const winstonInstance = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(
        format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new transports.File({
      filename: 'logs/warn.log',
      level: 'warn',
      format: format.combine(
        format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
  ],
});
