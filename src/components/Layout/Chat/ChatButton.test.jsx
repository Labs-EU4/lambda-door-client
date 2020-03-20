import React from 'react';
import * as rtl from '@testing-library/react';
import ChatButton from './ChatButton';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

const openChat = jest.fn();
const chatClick = jest.fn();

describe('ChatButton', () => {
  it('renders without crashing', () => {
    renderWithRedux(<ChatButton openChat={openChat} />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<ChatButton openChat={openChat} />).baseElement
    ).toMatchSnapshot();
  });

  it('onClick should trigger openChat', () => {
    const { getByText } = rtl.render(
      <button onClick={chatClick}>Chat with me</button>
    );

    const node = getByText('Chat with me');
    rtl.fireEvent.click(node);
    expect(chatClick).toHaveBeenCalled();
  });
});
