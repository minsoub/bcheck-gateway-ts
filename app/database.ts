import Container from "typedi";
import { createConnection, ConnectionOptions, useContainer } from "typeorm";
import { env } from "./env";
import fs from "fs";
import { logger } from "./utils/Logger";
/**
 * 데이터베이스 커넥션을 생성한다.
 */
export async function createDatabaseConnection(): Promise<void> {
  const ca = [fs.readFileSync(__dirname + "/rds-combined-ca-bundle.pem")];
  try {
    console.log("database connect starting..........");
    console.log(env.database.url);
    console.log(env.database.host);
    //console.log(ca);
    const connectionOpts: ConnectionOptions = {
      type: "mongodb",
      //url: env.database.url,
      sslValidate: true,
      ssl: true,
      //useNewUrlParser: true,
      //retryWrites: false,
      host: env.database.host,
      port: env.database.port,
      username: env.database.usename,
      password: env.database.password,
      database: env.database.name,
      synchronize: true, // env.database.synchronize,
      logging: false, // env.database.logging,
      sslCA: await require("fs").readFileSync(
        `${__dirname}/rds-combined-ca-bundle.pem`,
      ),
      useUnifiedTopology: true,
      entities: [__dirname + "/entity/*{.ts,.js}"],
    };

    useContainer(Container);
    await createConnection(connectionOpts);
    // await createConnection({
    //     type: "mongodb",
    //     url: env.database.url,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     //ssl: true,
    //     sslValidate: true,
    //     sslCA: require('fs').readFileSync(`${__dirname}/rds-combined-ca-bundle.pem`),
    //     entities: [__dirname + "/entity/*{.ts,.js}"],
    //     replicaSet: "rs0",
    // });
    logger.info("database connected....ok");
  } catch (error) {
    logger.error("database connection error => " + error);
    throw error;
  }
}
