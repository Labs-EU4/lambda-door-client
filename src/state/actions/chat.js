/* eslint-disable import/prefer-default-export */

import * as types from '../types';

import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyAZsLzEsGjOdUeWVj7Z7vu2tqv6tBpIzfU',
  authDomain: 'lambda-door.firebaseapp.com',
  databaseURL: 'https://lambda-door.firebaseio.com',
  projectId: 'lambda-door',
  storageBucket: 'lambda-door.appspot.com',
  messagingSenderId: '1083433035630',
  appId: '1:1083433035630:web:4dd012a984da9b39b4437f',
  measurementId: 'G-NV9850LZBG',

  // apiKey: 'AIzaSyBFL_tGeDK3NSX3tIl15jqqGQ42j8IOerk',
  // authDomain: 'lambda-door-rodrigo.firebaseapp.com',
  // databaseURL: 'https://lambda-door-rodrigo.firebaseio.com',
  // projectId: 'lambda-door-rodrigo',
  // storageBucket: 'lambda-door-rodrigo.appspot.com',
  // messagingSenderId: '121959076298',
  // appId: '1:121959076298:web:cb70f10972b960cced3f33',
  // measurementId: 'G-CLR79T2DMD',
});

const db = firebase.firestore();

export const openChat = (
  fromUserID,
  fromUserName,
  toUserID,
  toUserName
) => dispatch => {
  Promise.all([
    db
      .collection('chats')
      .where('toUserID', '==', toUserID)
      .where('fromUserID', '==', fromUserID)
      // .limit(1)
      .get(),
    db
      .collection('chats')
      .where('toUserID', '==', fromUserID)
      .where('fromUserID', '==', toUserID)
      // .limit(1)
      .get(),
  ]).then(results => {
    let found = false;
    results.forEach(result => {
      if (result.size) {
        found = true;
        // should update "open:true" instead and it would auto show up?
        putInState(result, dispatch);
      }
    });
    if (!found) {
      db.collection('chats')
        .add({
          fromUserName: fromUserName,
          fromUserID: fromUserID,
          toUserID: toUserID,
          toUserName: toUserName,
          open: true,
          createdAt: new Date(),
        })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function (error) {
          console.error('Error adding document: ', error);
        });
    }
  });
};

export const getChats = (fromUserID, toUserID) => dispatch => {
  db.collection('chats')
    .where('toUserID', '==', 6)
    .where('open', '==', true)

    .onSnapshot(function (querySnapshot) {
      putInState(querySnapshot, dispatch);
    });

  db.collection('chats')
    .where('fromUserID', '==', 6)
    .where('open', '==', true)

    .onSnapshot(function (querySnapshot) {
      putInState(querySnapshot, dispatch);
    });
};

const putInState = (querySnapshot, dispatch) => {
  const chats = [];
  querySnapshot.forEach(function (doc) {
    doc.ref
      .collection('messages')
      .orderBy('sentAt', 'asc')
      .onSnapshot(function (messageSnapshot) {
        const messages = [];

        messageSnapshot.forEach(message => {
          messages.push(message.data());
        });

        dispatch({
          type: types.SET_CHAT_MESSAGES,
          payload: {
            messages,
            docID: doc.id,
          },
        });
      });
    dispatch({
      type: types.GET_OPEN_CHATS,
      payload: { ...doc.data(), messages: [], docID: doc.id },
    });
  });
};

export const sendMessage = (
  message,
  chatID,
  fromUserID,
  toUserID
) => dispatch => {
  db.collection('chats')
    .doc(chatID)
    .collection('messages')
    .add({
      fromUserID: fromUserID,
      toUserID: 1,
      message: message,
      sentAt: new Date(),
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
};

export const closeChat = chatID => dispatch => {
  db.collection('chats')
    .doc(chatID)
    //  .collection('messages')
    .update({
      open: false, // was here
    })
    .then(function () {
      dispatch({
        type: types.CLOSE_CHAT,
        payload: chatID,
      });
      console.log('Document successfully updated!');
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
};
