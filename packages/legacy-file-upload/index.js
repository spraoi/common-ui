import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { File, FilePond, registerPlugin } from 'react-filepond';
import Amplify, { Storage } from 'aws-amplify';
import 'filepond/dist/filepond.min.css';

export default class LegacyFileUpload extends PureComponent {
  static propTypes = {
    bucket: PropTypes.string.isRequired,
    existingFiles: PropTypes.arrayOf(PropTypes.string),
    identityId: PropTypes.string,
    level: PropTypes.string,
    onRemoveComplete: PropTypes.func,
    onUploadComplete: PropTypes.func,
  };

  static defaultProps = {
    existingFiles: [],
    identityId: null,
    level: 'public',
    onRemoveComplete: () => {},
    onUploadComplete: () => {},
  };

  componentDidMount() {
    const { bucket } = this.props;

    if (typeof registerPlugin === 'function') {
      registerPlugin(FilePondPluginFileRename);
      registerPlugin(FilePondPluginFileValidateType);
    }

    // XXX
    Amplify.configure({
      Auth: {
        identityPoolId: SPRAOI_ENV.COGNITO_CONFIG.identityPoolId,
        identityPoolRegion: SPRAOI_ENV.COGNITO_CONFIG.region,
        region: SPRAOI_ENV.COGNITO_CONFIG.region,
        userPoolId: SPRAOI_ENV.COGNITO_CONFIG.userPoolId,
        userPoolWebClientId: SPRAOI_ENV.COGNITO_CONFIG.appClientId,
      },
      Storage: { bucket, region: SPRAOI_ENV.COGNITO_CONFIG.region },
    });
  }

  serverLoad = (uniqueFileId, load, error, progress, abort) => {
    const { identityId, level } = this.props;

    // TODO: update when Storage supports progress events
    // (endlessMode, loadedSize, totalSize)
    // progress(true, 2000, 2000);

    Storage.get(uniqueFileId, { identityId, level })
      .then(fetch)
      .then(r => r.blob())
      .then(load)
      .catch(error);

    return { abort };
  };

  serverProcess = (fieldName, file, metadata, load, error, progress, abort) => {
    const { level, onUploadComplete } = this.props;
    console.log(file)

    const fileName = file.name;
    const contentType = file.type;

    const progressCallback = ({ lengthComputable, loaded, total }) =>
      progress(lengthComputable, loaded, total);

    Storage.put(fileName, file, { contentType, level, progressCallback })
      .then(() => {
        load(fileName);
        onUploadComplete();
      })
      .catch(error);

    return { abort };
  };

  serverRevert = (uniqueFileId, load, error) => {
    const { level } = this.props;

    Storage.remove(uniqueFileId, { level })
      .then(load)
      .catch(error);
  };

  serverRemove = ({ file: { name } }) => {
    const { level, onRemoveComplete } = this.props;
    Storage.remove(name, { level }).then(onRemoveComplete);
  };

  render() {
    const { existingFiles } = this.props;

    return (
      <>
        <FilePond
          {...this.props}
          onremovefile={this.serverRemove}
          server={{
            load: this.serverLoad,
            process: this.serverProcess,
            revert: this.serverRevert,
          }}
        >
          {existingFiles.map(f => (
            <File key={f} origin="local" src={f} />
          ))}
        </FilePond>
      </>
    );
  }
}
