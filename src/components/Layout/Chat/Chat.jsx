import React from 'react';
// import { getMessages } from '../../../utils/firebase';
// import { getMessages } from '../../../state/actions/chat';

import { connect } from 'react-redux';

const Chat = ({ chatState }) => {
  const chatClick = e => {};

  return (
    <>
      {chatState.isChatOpen ? (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 5,
            background: '#ccc',
            width: '300px',
            height: '300px',
          }}
          onClick={e => chatClick()}
        >
          {console.log('chatState.messages')}
          {console.log(chatState.messages)}
          {chatState.messages.map(message => {
            console.log(message);

            return (
              <>
                <br />
                {message.message}
              </>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default connect(state => state, {})(Chat);
