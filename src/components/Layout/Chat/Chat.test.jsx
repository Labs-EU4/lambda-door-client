import React from 'react';
import * as rtl from '@testing-library/react';
import Chat from './Chat';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

const chats = [
  {
    toUserID: 1,
    fromUserID: 6,
    fromUserName: 'Rodrigo Graça',
    toUserName: 'Lisa Wilton',
    messages: [
      {
        fromUserID: 6,
        message: 'some new message 1',
      },
      {
        fromUserID: 6,
        message: 'some new message 2',
      },
    ],
    open: true,
  },
  {
    toUserID: 1,
    fromUserID: 6,
    fromUserName: 'Rodrigo Graça',
    toUserName: 'Lisa Wilton',
    messages: [
      {
        fromUserID: 6,
        message: 'what new message?',
      },
      {
        fromUserID: 6,
        message: 'wowza',
      },
    ],
    open: true,
  },
];

const messages = chats.map(messages => messages);

const chatMessages = [
  {
    fromUserID: 6,
    message: 'wowza',
  },
];

const sendMessage = jest.fn();
const closeChat = jest.fn();
const markAsRead = jest.fn();

describe('Chat Interface', () => {
  test('should render the Chat Interface without crashing', () => {
    const chatElement = renderWithRedux(
      <Chat
        sendMessage={sendMessage}
        closeChat={closeChat}
        markAsRead={markAsRead}
        messages={messages}
        chat={chats}
      />
    );
    expect(chatElement.baseElement).toMatchSnapshot();
  });

  test('should display the correct messages', () => {
    const chatElement = renderWithRedux(
      <Chat
        sendMessage={sendMessage}
        closeChat={closeChat}
        markAsRead={markAsRead}
        messages={chatMessages}
        chat={chats}
      />
    ).queryAllByText(/wowza/i);

    expect(chatElement[0].textContent).toEqual('wowza');
  });
});
