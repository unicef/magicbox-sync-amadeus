var container = require('./create_container');

/**
 * Creates a storage container for each collection if doesn't already exist.
 * @param{Array} list - List of collection names.
 * @return{Promise} Fulfilled with a value suitable for use as a condition
 */
exports.create_storage_containers = function(list) {
  var promises = [];

  return new Promise(function(resolve, reject) {
    list.forEach(function(collection) {
      promises.push(
          container.create_storage_container(collection.filename)
      );
    });

    Promise.all(promises).then(function(container_created_results) {
      resolve(container_created_results);
    });
  });
};
