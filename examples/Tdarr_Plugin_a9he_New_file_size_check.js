module.exports.details = function details() {
  return {
    id: 'Tdarr_Plugin_a9he_New_file_size_check',
    Stage: 'Pre-processing',
    Name: 'New file size check',
    Type: 'Video',
    Operation: 'Transcode',
    Description: 'Give an error if new file is larger than the original \n\n',
    Version: '1.00',
    Link: '',
    Tags: '',
  };
};

module.exports.plugin = function plugin(file, librarySettings, inputs, otherArguments) {
  // Must return this object at some point in the function else plugin will fail.
  const response = {
    processFile: false,
    preset: '',
    handBrakeMode: false,
    FFmpegMode: true,
    reQueueAfter: true,
    infoLog: '',
  };

  const newSize = file.file_size;
  const oldSize = otherArguments.originalLibraryFile.file_size;
  if (newSize > oldSize) {
    // Item will be errored in UI
    throw new Error(`Error! New file has size ${newSize} which is larger than original file ${oldSize}`);
  } else if (newSize < oldSize) {
    response.infoLog += `New file has size ${newSize} which is smaller than original file ${oldSize}`;
  }
  // if file sizes are exactly the same then file has not been transcoded yet

  return response;
};