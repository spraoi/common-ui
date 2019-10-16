import React from 'react';
import Paginator from '../index';
import { fireEvent, render } from '../../../../__utilities__/testing-library';

describe('Paginator component', () => {
  it('renders 1-10 correctly', () => {
    const onNextClick = jest.fn();

    const { getByText } = render(
      <Paginator
        leftButtonContent="<"
        onNextClick={onNextClick}
        onPreviousClick={jest.fn()}
        pageTotal={10}
        rightButtonContent=">"
      />
    );

    const previousButton = getByText('<');
    const nextButton = getByText('>');
    expect(getByText('1–10')).toBeInTheDocument();
    expect(previousButton).toBeDisabled();
    fireEvent.click(nextButton);
    expect(onNextClick).toHaveBeenCalled();
  });

  it('renders 11-20 correctly', () => {
    const onPreviousClick = jest.fn();
    const onNextClick = jest.fn();

    const { getByText } = render(
      <Paginator
        leftButtonContent="<"
        offset={10}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        pageTotal={10}
        rightButtonContent=">"
      />
    );

    const previousButton = getByText('<');
    const nextButton = getByText('>');
    expect(getByText('11–20')).toBeInTheDocument();
    fireEvent.click(previousButton);
    expect(onPreviousClick).toHaveBeenCalled();
    fireEvent.click(nextButton);
    expect(onNextClick).toHaveBeenCalled();
  });

  it('renders 11-19 correctly', () => {
    const onPreviousClick = jest.fn();
    const onNextClick = jest.fn();

    const { getByText } = render(
      <Paginator
        leftButtonContent="<"
        offset={10}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        pageTotal={9}
        rightButtonContent=">"
      />
    );

    const previousButton = getByText('<');
    const nextButton = getByText('>');
    expect(getByText('11–19')).toBeInTheDocument();
    fireEvent.click(previousButton);
    expect(onPreviousClick).toHaveBeenCalled();
    expect(nextButton).toBeDisabled();
  });

  it('renders 1-10 of 100 total correctly', () => {
    const { getByText } = render(
      <Paginator
        leftButtonContent="<"
        onNextClick={jest.fn()}
        onPreviousClick={jest.fn()}
        pageTotal={10}
        rightButtonContent=">"
        total={100}
      />
    );

    expect(getByText('1–10 of 100')).toBeInTheDocument();
  });

  it('renders 1-10 of 10 total correctly', () => {
    const { getByText } = render(
      <Paginator
        leftButtonContent="<"
        onNextClick={jest.fn()}
        onPreviousClick={jest.fn()}
        pageTotal={10}
        rightButtonContent=">"
        total={10}
      />
    );

    expect(getByText('1–10 of 10')).toBeInTheDocument();
    expect(getByText('>')).toBeDisabled();
  });
});
