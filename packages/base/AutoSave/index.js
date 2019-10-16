import PropTypes from 'prop-types';
import React from 'react';
import { FormSpy } from 'react-final-form';
import { addedDiff, diff, deletedDiff, updatedDiff } from 'deep-object-diff';

class AutoSaveComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { saving: false };
  }

  componentDidUpdate(prevProps) {
    const { debounce, values } = this.props;
    const all = diff(prevProps.values, values);
    const added = addedDiff(prevProps.values, values);
    const deleted = deletedDiff(prevProps.values, values);
    const updated = updatedDiff(prevProps.values, values);

    if (Object.keys(all).length) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => this.save(all, added, deleted, updated),
        debounce
      );
    }
  }

  save = async (all, added, deleted, updated) => {
    const { save } = this.props;
    if (this.promise) await this.promise;
    this.setState({ saving: true });
    this.promise = save(all, added, deleted, updated);
    await this.promise;
    delete this.promise;
    this.setState({ saving: false });
  };

  render() {
    const { children } = this.props;
    const { saving } = this.state;
    return children({ saving });
  }
}

AutoSaveComponent.propTypes = {
  children: PropTypes.func,
  debounce: PropTypes.number,
  save: PropTypes.func.isRequired,
  values: PropTypes.shape({}).isRequired,
};

AutoSaveComponent.defaultProps = {
  children: () => null,
  debounce: 200,
};

const AutoSave = props => (
  <FormSpy
    component={AutoSaveComponent}
    subscription={{ values: true }}
    {...props}
  />
);

export default AutoSave;
