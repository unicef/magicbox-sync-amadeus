var azure = require('azure-storage');
var config = require('../config');
var azure_key = config.azure.key1;
var storage_account = config.azure.storage_account;
var blobSvc = azure.createBlobService(storage_account, azure_key);

/**
 * Retrieves list of blobs in a collection:
 * 'booking', 'search', 'schedule'..etc.
 * @return{Promise} Fulfilled with array of blob names
 */

exports.get_blobs_list = function(col) {
  return new Promise(function(resolve, reject) {
    blobSvc.listBlobsSegmented(col, null, function(err, result, response) {
      if (!err) {
        resolve(result.entries.map(entry => entry.name));
      } else {
        // logger.log('error', {error: err});
      }
    });
  });
};
