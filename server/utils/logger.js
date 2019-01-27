import { createLogger, format, transports, config as winstonConfig } from "winston";
import { DISABLE_LOGGING, LOG_LEVEL } from "../config";

const { levels } = winstonConfig.npm;

const transportsUsed = [
  new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
    stderrLevels: ["error"],
    consoleWarnLevels: ["warn"],
    handleExceptions: true
  })
];

export default createLogger({
  silent: DISABLE_LOGGING,
  levels,
  level: LOG_LEVEL,
  transports: transportsUsed
});
