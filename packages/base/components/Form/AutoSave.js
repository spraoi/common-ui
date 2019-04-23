import PropTypes from 'prop-types';
import React from 'react';
import diff from 'object-diff';
import { FormSpy } from 'react-final-form';

class AutoSaveComponent extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    debounce: PropTypes.number,
    save: PropTypes.func.isRequired,
    values: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    children: () => {},
    debounce: 200,
  };

  state = {
    saving: false,
  };

  componentDidUpdate(prevProps) {
    const { debounce, values } = this.props;

    const valuesDiff = {
      ...diff(prevProps.values, values),
      ...diff(values, prevProps.values),
    };

    if (Object.keys(valuesDiff).length) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.save(valuesDiff), debounce);
    }
  }

  save = async valuesDiff => {
    const { save } = this.props;
    if (this.promise) await this.promise;
    this.setState({ saving: true });
    this.promise = save(valuesDiff);
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

const AutoSave = props => (
  <FormSpy
    component={AutoSaveComponent}
    subscription={{ values: true }}
    {...props}
  />
);

export default AutoSave;
