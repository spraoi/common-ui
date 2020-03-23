import 'filepond-polyfill';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { File, FilePond, registerPlugin } from 'react-filepond';
import { Storage } from 'aws-amplify';
import 'filepond/dist/filepond.min.css';
import './index.scss';

if (typeof registerPlugin === 'function') {
  registerPlugin(FilePondPluginFileRename);
  registerPlugin(FilePondPluginFileValidateType);
}

export default class LegacyFileUpload extends PureComponent {
  static propTypes = {
    bucket: PropTypes.string.isRequired,
    customPrefix: PropTypes.shape({
      private: PropTypes.string,
      protected: PropTypes.string,
      public: PropTypes.string,
    }),
    existingFiles: PropTypes.arrayOf(PropTypes.string),
    identityId: PropTypes.string,
    level: PropTypes.string,
    onRemoveComplete: PropTypes.func,
    onUploadComplete: PropTypes.func,
    onUploadFail: PropTypes.func,
  };

  static defaultProps = {
    customPrefix: {
      private: 'private/',
      protected: 'protected/',
      public: 'test/',
    },
    existingFiles: [],
    identityId: null,
    level: 'public',
    onRemoveComplete: () => {},
    onUploadComplete: () => {},
    onUploadFail: () => {},
  };

  componentDidMount() {
    const { bucket } = this.props;

    // XXX
    Storage.configure({
      Auth: {
        identityPoolId: SPRAOI_ENV.COGNITO_CONFIG.identityPoolId,
        identityPoolRegion: SPRAOI_ENV.COGNITO_CONFIG.region,
        region: SPRAOI_ENV.COGNITO_CONFIG.region,
        userPoolId: SPRAOI_ENV.COGNITO_CONFIG.userPoolId,
        userPoolWebClientId: SPRAOI_ENV.COGNITO_CONFIG.appClientId,
      },
      Storage: {
        bucket,
        region: SPRAOI_ENV.COGNITO_CONFIG.region,
      },
    });
  }

  serverLoad = (uniqueFileId, load, error, progress, abort) => {
    const { customPrefix, identityId, level } = this.props;

    // TODO: update when Storage supports progress events
    // (endlessMode, loadedSize, totalSize)
    // progress(true, 2000, 2000);

    Storage.get(uniqueFileId, { customPrefix, identityId, level })
      .then(fetch)
      .then((r) => r.blob())
      .then(load)
      .catch(error);

    return { abort };
  };

  serverProcess = (fieldName, file, metadata, load, error, progress, abort) => {
    const { customPrefix, level, onUploadComplete, onUploadFail } = this.props;

    const fileName = file.name;
    const contentType = file.type;

    const progressCallback = ({ lengthComputable, loaded, total }) =>
      progress(lengthComputable, loaded, total);

    Storage.put(fileName, file, {
      contentType,
      customPrefix,
      level,
      progressCallback,
    })
      .then(
        () => {
          load(fileName);
          onUploadComplete(fileName);
        },
        () => {
          onUploadFail(fileName);
          error();
        }
      )
      .catch(error);

    return { abort };
  };

  serverRevert = (uniqueFileId, load, error) => {
    const { customPrefix, level } = this.props;

    Storage.remove(uniqueFileId, { customPrefix, level })
      .then(load)
      .catch(error);
  };

  serverRemove = ({ file: { name } }) => {
    const { customPrefix, level, onRemoveComplete } = this.props;

    Storage.remove(name, { customPrefix, level }).then(() =>
      onRemoveComplete(name)
    );
  };

  render() {
    const { existingFiles } = this.props;

    return (
      <FilePond
        {...this.props}
        onremovefile={this.serverRemove}
        server={{
          load: this.serverLoad,
          process: this.serverProcess,
          revert: this.serverRevert,
        }}
      >
        {existingFiles.map((f) => (
          <File key={f} origin="local" src={f} />
        ))}
      </FilePond>
    );
  }
}
