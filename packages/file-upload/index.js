import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { File, FilePond, registerPlugin } from 'react-filepond';
import { Storage } from 'aws-amplify';
import { createGlobalStyle } from 'styled-components';
import 'filepond/dist/filepond.min.css';

// https://pqina.nl/filepond/docs/patterns/api/style/
const StyledGlobal = createGlobalStyle`
  .filepond--wrapper {
    .filepond--root {
      margin: 0;
      font-family: ${p => p.theme.fonts.primary};
    }

    .filepond--drop-label {
      color: ${p => p.theme.colors.inputSecondaryPlaceholderText};
    }

    .filepond--label-action {
      text-decoration-color: ${p =>
        p.theme.colors.inputSecondaryPlaceholderText};
    }

    .filepond--panel-root {
      border: solid 1px ${p =>
        p.error ? p.theme.colors.error : 'transparent'};
      border-radius: ${p => p.theme.radii.lg};
      background-color: ${p => p.theme.colors.inputSecondaryBg};
    }

    .filepond--item-panel {
      border-radius: ${p => p.theme.radii.lg};
    }
  }
`;

class FileUpload extends PureComponent {
  constructor(props) {
    super(props);

    if (typeof registerPlugin === 'function') {
      registerPlugin(FilePondPluginFileRename);
      registerPlugin(FilePondPluginFileValidateType);
    }
  }

  serverLoad = (uniqueFileId, load, error, progress, abort) => {
    const { bucket, customPrefix, identityId, level } = this.props;

    // TODO: update when Storage supports progress events
    // (endlessMode, loadedSize, totalSize)
    // progress(true, 2000, 2000);

    Storage.get(uniqueFileId, { bucket, customPrefix, identityId, level })
      .then(fetch)
      .then(r => r.blob())
      .then(load)
      .catch(error);

    return { abort };
  };

  serverProcess = (fieldName, file, metadata, load, error, progress, abort) => {
    const { bucket, customPrefix, level, onUploadComplete } = this.props;

    const fileName = file.name;
    const contentType = file.type;

    const progressCallback = ({ lengthComputable, loaded, total }) =>
      progress(lengthComputable, loaded, total);

    Storage.put(fileName, file, {
      bucket,
      contentType,
      customPrefix,
      level,
      progressCallback,
    })
      .then(() => {
        load(fileName);
        onUploadComplete({ contentType, fileName });
      })
      .catch(error);

    return { abort };
  };

  serverRevert = (uniqueFileId, load, error) => {
    const { bucket, customPrefix, level } = this.props;

    Storage.remove(uniqueFileId, { bucket, customPrefix, level })
      .then(load)
      .catch(error);
  };

  serverRemove = ({ file: { name } }) => {
    const { bucket, customPrefix, level, onRemoveComplete } = this.props;

    Storage.remove(name, { bucket, customPrefix, level }).then(
      onRemoveComplete
    );
  };

  render() {
    const { error, existingFiles } = this.props;

    return (
      <>
        <StyledGlobal error={error} />
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

FileUpload.propTypes = {
  bucket: PropTypes.string,
  customPrefix: PropTypes.shape({
    private: PropTypes.string,
    protected: PropTypes.string,
    public: PropTypes.string,
  }),
  error: PropTypes.oneOf([0, 1]),
  existingFiles: PropTypes.arrayOf(PropTypes.string),
  identityId: PropTypes.string,
  level: PropTypes.string,
  onRemoveComplete: PropTypes.func,
  onUploadComplete: PropTypes.func,
};

FileUpload.defaultProps = {
  bucket: null,
  customPrefix: { private: '', protected: '', public: '' },
  error: 0,
  existingFiles: [],
  identityId: null,
  level: 'public',
  onRemoveComplete: () => {},
  onUploadComplete: () => {},
};

export default FileUpload;
