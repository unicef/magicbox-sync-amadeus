var logger = exports;
logger.debugLevel = 'warn';

logger.log = {
  container_created: function(name, container) {
    if (container.created === true) {
      console.log('Container created:', container.name);
    } else if (container.lastModified) {
      console.log('Container exists:', container.name);
    } else {
      // If there was an error, the message doesn't contain the name.
      console.log(name, container);
    }
  },

  file_downloaded_from_sftp: function(name, err) {
    if (err) {
      console.log('Failed to download:', name, err);
    } else {
      console.log('Downloaded:', name);
    }
  },

  file_uploaded_to_blob: function(name, col, err) {
    if (err) {
      console.log('Failed to upload:', col, name, err);
    } else {
      console.log('uploaded:', col, name);
    }
  }

};
