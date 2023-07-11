const { addAlias } = require('module-alias');

addAlias('@loginBackend', __dirname + '/module/login');
addAlias('@helpersBackend', __dirname + '/module/helpers');
addAlias('@usersBackend', __dirname + '/module/users');
addAlias('@auditBackend', __dirname + '/module/audit');
