import React from 'react';
import * as rtl from '@testing-library/react';
import Chat from './Chat';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

const messages = [
  {
    message: 'Jalingo Gombe zombie popopo',
    sentAt: '1234',
  },
  {
    message: 'Ada mode futon jalon dididi',
    sentAt: '4321',
  },
];

const handleChange = jest.fn();
const handleBlur = jest.fn();
const handleSubmit = jest.fn();

describe('Chat', () => {
  it('renders without crashing', () => {
    renderWithRedux(
      <Chat
        messages={messages}
        handleSubmit={handleSubmit}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
    );
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(
        <Chat
          messages={messages}
          handleSubmit={handleSubmit}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      ).baseElement
    ).toMatchSnapshot();

    const message = renderWithRedux(
      <Chat
        messages={messages}
        handleSubmit={handleSubmit}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
    ).queryAllByText(/Jalingo Gombe/i);
    expect(message[0].textContent).toBe('Jalingo Gombe zombie popopo');
  });
});
