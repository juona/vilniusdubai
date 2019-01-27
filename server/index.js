import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import bodyParser from "body-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import requestId from "express-request-id";
import httpStatus from "http-status";
import webpackConfig from "../webpack.dev";
import logger from "./utils/logger";
import { IS_DEVELOPMENT, PORT, BUILD_PATH, PHOTOS_PATH, ENV } from "./config";
import routes from "./routes";

logger.debug(`Production mode: ${!IS_DEVELOPMENT}`);

const app = express();

app.set("env", ENV);
app.set("port", PORT);

// Serve UI
app.use(
  IS_DEVELOPMENT
    ? webpackDevMiddleware(webpack(webpackConfig), {
        publicPath: BUILD_PATH
      })
    : express.static(BUILD_PATH)
);

// Assign an ID to every request
app.use(requestId());

// Parse POST data and set it in JSON format to req.body
app.use(bodyParser.json());

// Compress responses
app.use(compress());

// Prevent a number of HTTP attacks
app.use(helmet());

// Prevent CORS
app.use(cors());

// Serve photos
app.use("/photos", express.static(PHOTOS_PATH));

// Set up router
routes.forEach(route => {
  if (!(route.skip && route.skip())) {
    app[route.method](route.name, route.handler);
  }
});

// 404 handler
app.use((_, res) => res.status(httpStatus.NOT_FOUND).send("Not found!"));

// Error handler
app.use((error, _, res, next) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Something broke!");
  next(error);
});

app.listen(app.get("port"), () => logger.info(`Server listening on ${app.get("port")}...`));
