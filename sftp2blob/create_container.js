var azure = require('azure-storage');
var config = require('../config');
var azure_key = config.azure.key1;
var storage_account = config.azure.storage_account;
var blobSvc = azure.createBlobService(storage_account, azure_key);

exports.create_storage_container = function(collection_name) {
  return new Promise(function(resolve, reject) {
    blobSvc.createContainerIfNotExists(collection_name, {
    }, function(error, result, response) {
      if (!error) {
        return resolve(result); // if result = false, container already existed.
      } else {
        return reject(error);
      }
    });
  });
};
