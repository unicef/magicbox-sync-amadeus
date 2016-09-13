var collections = require('./lib/collections');
var containers = require('./lib/containers');
var files = require('./lib/files');

/**
 * - Fetches names of collections on sftp (Each directory in root is a collection).
 * - Creates a container in storage account (designated in config.js)
 *   for each collection if it doesn't already exist.
 * - Compares files in blobs with files in sftp collection.
 * - New files in sftp are downloaded to local / or mounted cloud
 *   and then uploaded to blob.
 * @return{Promise} Fulfilled with a value suitable for use as a condition
 */
collections.get_collection_names()
  .then(list => {
    containers.create_storage_containers(list)
    .then(value => {
      files.download_collection_upload_blob(value).then(function() {
        console.log('Done!');
      });
    });
  });
