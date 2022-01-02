process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import 'reflect-metadata';
import App from '@/app';
import { IndexController } from '@/Adapters/Controllers/index.controller';
import { UsersController } from '@/Adapters/Controllers/users.controller';
import validateEnv from '@utils/validateEnv';
import { PostController } from './Adapters/Controllers/post.controller';

validateEnv();

const app = new App([ IndexController, UsersController, PostController]);
app.listen();
