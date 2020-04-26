import EventEmitter = require("events");

import { createConnection } from "typeorm";
import { config } from "../../config/config";
import { BlogContent } from "./entities/BlogContent";
import { DB_CONNECITON_ERROR, DB_RETRY_TIME } from "../../config/constants";
import * as sleep from "sleep";

class BaseService {
  public static emitter: EventEmitter = new EventEmitter();
  public static isConnected = false;

  public static async getConnection(callback = null, wait = false) {
    BaseService.handleCreateConnectionError(callback, wait);
    return await BaseService.createConnection();
  }

  // tslint:disable-next-line:no-big-function
  public static async createConnection(callback = null, wait = false) {
    const dbConfig = config[process.env.NODE_ENV];
    return await createConnection({
      type: dbConfig.dialect,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [ BlogContent ],
      name: "default",
    }).then(async () => {
      BaseService.isConnected = true;
      console.log("info", `DB (${dbConfig.dialect}) Conenction Established successfully...`);

      try {
        if (callback) { wait ? (await callback()) : callback(); }
      } catch (err) {
        console.log('Error >>>', err);
      }
    }).catch((err) => {
      console.log("error", "Found Error - ", err);
      BaseService.isConnected = false;

      if (err.constructor.name !== "AlreadyHasActiveConnectionError") {
        BaseService.emitter.emit('DbConnectionError');
      }
    });
  }

  public static handleCreateConnectionError(callback = null, wait = false) {
    // tslint:disable-next-line:no-static-this
    this.emitter.on(DB_CONNECITON_ERROR, async () => {
      console.log("error", `Error in conenction to DB... Retrying... in ${DB_RETRY_TIME} seconds`);
      sleep.sleep(DB_RETRY_TIME);
      await BaseService.createConnection(callback, wait);
    });
  }
}

export { BaseService };
