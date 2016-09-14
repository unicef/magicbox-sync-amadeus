var config = require('../config');
var Client = require('ssh2').Client;
var connSettings = config.connectionSettings;

exports.get_file_names = function(col) {
  return new Promise((resolve, reject) => {
    var remotePathToList = config.remotePathToList + '/' + col;
    var conn = new Client();
    conn.on('ready', function() {
      conn.sftp(function(err, sftp) {
        if (err) throw err;
        sftp.readdir(remotePathToList, function(err, list) {
          if (err) return reject(err);
          resolve(list);
          // Do not forget to close the connection, otherwise you'll get troubles
          conn.end();
        });
      });
    }).connect(connSettings);
  });
};
