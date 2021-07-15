const { promisify }= require('util');
let { exec } = require('child_process')

exec = promisify(exec)

module.exports = exec