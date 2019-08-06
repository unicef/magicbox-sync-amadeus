var collections = require('./sftp2blob/get_collection_names');
var containers = require('./sftp2blob/create_containers');
var files = require('./sftp2blob/copy_files');

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
  .catch(err => { console.log(err);})
  .then(list => {
    // Filter out sample files
    //list = list.filter(function(e) {return !e.filename.match(/(sample|midt|search)/i); });
    list.forEach(e => { e.filename = e.filename.replace('_', '')})
    console.log(list)
    containers.create_storage_containers(list)
    .then(value => {
      files.download_collection_upload_blob(value)
      .catch(err => { console.log(err);})
      .then(function() {console.log('Done!');});
    });
  });
