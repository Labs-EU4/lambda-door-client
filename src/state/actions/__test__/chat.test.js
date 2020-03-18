
// putInState (Test to ensure the correct data is sent to redux)
// getChats (Test to ensure the correct chats data is received)
// SendMessage (Test to ensure a message has been successfully sent)
// closeChat (Test when )
// openChat (Test when )

const chats = [
  {
    toUserID: 1,
    fromUserName: "Rodrigo Graça",
    fromUserID: 6,
    toUserName: "Lisa Wilton",
    open: true,
    messages: [
      {
        fromUserID: 6,
        message: 'this is a new message',
        toUserID: 1,
      },
      {
        fromUserID: 6,
        message: 'this is a new message',
        toUserID: 1,
      },
    ],
  },
  {
    toUserID: 1,
    fromUserName: "Rodrigo Graça",
    fromUserID: 6,
    toUserName: "Lisa Wilton",
    open: true,
    messages: [
      {
        fromUserID: 6,
        message: 'second message',
        toUserID: 1,
      },
      {
        fromUserID: 6,
        message: 'second message',
        toUserID: 1,
      },
    ],
  },
]
