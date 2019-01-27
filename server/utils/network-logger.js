import morgan from "morgan";
import logger from "./logger";

morgan.token("id", req => req.id);

export const requestLogger = morgan("ID-:id :remote-addr :url :method HTTP/:http-version :user-agent", {
  immediate: true,
  stream: {
    write(message) {
      logger.info(message.trim());
    }
  }
});

export const responseLogger = morgan("ID-:id :status :res[content-length] :response-time ms", {
  stream: {
    write(message) {
      logger.info(message.trim());
    }
  }
});
