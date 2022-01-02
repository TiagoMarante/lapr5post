process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { useExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';
import errorMiddleware from '@/Adapters/middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
var cors = require('cors')
import mongoose from 'mongoose';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(Controllers: Function[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(Controllers);
    this.initializeSwagger(Controllers);
    this.initializeErrorHandling();
    //this.connectToDB();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`====================================`);
      logger.info(`========= ENV: ${this.env} ==========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`URL: http://localhost:8000/api-docs`);
      logger.info(`====================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(controllers: Function[]) {
    this.app.use(cors({credentials: true, origin: true}));

    useExpressServer(this.app, {
      controllers: controllers,
      defaultErrorHandler: false,
    });
  }

  private initializeSwagger(controllers: Function[]) {
    const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });

    const routingControllersOptions = {
      controllers: controllers,
    };

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          basicAuth: {
            scheme: 'basic',
            type: 'http',
          },
        },
      },
      info: {
        description: 'Generated with `routing-controllers-openapi`',
        title: 'A sample API',
        version: '1.0.0',
      },
    });

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

//   public connectToDB() {
//     /**
//  * Conexao ao mongoDb precisa de mudar para variavel ambiente
//  */

//     mongoose.connect("mongodb+srv://lapr5:lapr5@lapr5db.iion6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
//     mongoose.Promise = global.Promise;

//     module.exports = mongoose;

//     var db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error'));
//     db.once('open', function () {
//       console.log("Ligado ao MongoDB");
//     })
//   }
}

export default App;
