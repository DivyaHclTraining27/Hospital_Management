import winston, { Logger } from "winston";

const { combine, timestamp, json } = winston.format;

let logger: Logger;
if (typeof window === "undefined") {
  logger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), json()),
    transports: [
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "info.log", level: "info" }),
    ],
  });
} else {
  logger = {
    info: () => {},
    warn: () => {},
    error: () => {},
  } as unknown as Logger;
}

export default logger;
