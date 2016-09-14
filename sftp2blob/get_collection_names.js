var config = require('../config');
var Client = require('ssh2').Client;
var connSettings = config.connectionSettings;

/**
 * Retrieves list of data collections:
 * 'booking', 'search', 'schedule'..etc.
 * @return{Promise} Fulfilled with array of collection names
 */

exports.get_collection_names = function() {
  return new Promise((resolve, reject) => {
    // Directory on sftp server that contains a directory for each collection
    var remotePathToList = config.remotePathToList;
    var conn = new Client();
    conn.on('ready', function() {
      conn.sftp(function(err, sftp) {
        // Need to log this
        if (err) return reject(err);
        // Each directory has collection name
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
