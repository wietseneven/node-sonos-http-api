const fs = require('fs');
const path = require('path');

module.exports = function(cwd, cb) {
  const files = fs.readdirSync(cwd);

  files
    .map(name => {
      const fullPath = path.join(cwd, name);
      return {
        name,
        fullPath,
        stat: fs.statSync(fullPath),
      };
    })
    .filter(file => {
      return (
        !file.stat.isDirectory() &&
        !file.name.startsWith('.') &&
        file.name.endsWith('.js')
      );
    })
    .forEach(file => {
      cb(require(file.fullPath));
    });
};
