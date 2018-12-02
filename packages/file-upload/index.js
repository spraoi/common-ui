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
      border-radius: ${p => p.theme.radii.lg};
      background-color: ${p => p.theme.colors.inputSecondaryBg};
    }

    .filepond--item-panel {
      border-radius: ${p => p.theme.radii.lg};
    }
  }
`;

export default class FileUploader extends PureComponent {
  static propTypes = {
    existingFiles: PropTypes.arrayOf(PropTypes.string),
    identityId: PropTypes.string,
    level: PropTypes.string,
    onCreateObjectName: PropTypes.func,
    onRemoveComplete: PropTypes.func,
    onUploadComplete: PropTypes.func,
  };

  static defaultProps = {
    existingFiles: [],
    identityId: null,
    level: 'public',
    onCreateObjectName: name => name,
    onRemoveComplete: () => {},
    onUploadComplete: () => {},
  };

  constructor() {
    super();

    if (typeof registerPlugin === 'function') {
      registerPlugin(FilePondPluginFileValidateType);
    }
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
    const { level, onCreateObjectName, onUploadComplete } = this.props;

    const fileName = onCreateObjectName(file.name);
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
        <StyledGlobal />
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
