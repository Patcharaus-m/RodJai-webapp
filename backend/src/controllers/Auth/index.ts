import * as loginController from './LoginController';
import * as registerController from './RegisterController';
import * as googleController from './GoogleController';
import * as lineController from './LineController';

export default {
  ...loginController,
  ...registerController,
  ...googleController,
  ...lineController
};
