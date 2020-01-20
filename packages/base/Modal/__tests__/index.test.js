import React from 'react';
import Modal from '../index';
import { render } from '../../../../__utilities__/testing-library';

describe('Modal component', () => {
  it('renders a modal with content', () => {
    const { getByText } = render(
      <Modal isOpen onClose={() => {}}>
        foo
      </Modal>
    );

    expect(getByText('foo')).toBeInTheDocument();
  });

  it('renders a submit button with defined text', () => {
    const { getByText } = render(
      <Modal isOpen onClose={() => {}} onSubmit={() => {}} submitText="Ok">
        foo
      </Modal>
    );

    expect(getByText('Ok')).toBeEnabled();
  });

  it('disables cancel button when submitting', () => {
    const { getByText } = render(
      <Modal
        closeText="Cancel"
        isOpen
        onClose={() => {}}
        onSubmit={() => {}}
        submitting
      >
        foo
      </Modal>
    );

    expect(getByText('Cancel')).toBeDisabled();
  });
});
