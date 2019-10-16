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

  it('renders a submit button with default text', () => {
    const { getByText } = render(
      <Modal isOpen onClose={() => {}} onSubmit={() => {}}>
        foo
      </Modal>
    );

    expect(getByText('Ok')).toBeEnabled();
  });

  it('disables cancel button when submitting', () => {
    const { getByText } = render(
      <Modal isOpen onClose={() => {}} onSubmit={() => {}} submitting>
        foo
      </Modal>
    );

    expect(getByText('Cancel')).toBeDisabled();
  });

  it('has customizable close text', () => {
    const { getByText } = render(
      <Modal closeText="fooClose" isOpen onClose={() => {}}>
        foo
      </Modal>
    );

    expect(getByText('fooClose')).toBeEnabled();
  });

  it('has customizable submit text', () => {
    const { getByText } = render(
      <Modal
        isOpen
        onClose={() => {}}
        onSubmit={() => {}}
        submitText="fooSubmit"
      >
        foo
      </Modal>
    );

    expect(getByText('fooSubmit')).toBeEnabled();
  });
});
