const { addAlias } = require('module-alias');

addAlias('@loginBackend', __dirname + '/module/login');
addAlias('@helpersBackend', __dirname + '/module/helpers');