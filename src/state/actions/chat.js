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
});

const db = firebase.firestore();

export const getMessages = (fromUserID, toUserID) => dispatch => {
  db.collection('chats')
    .collection('messages')
    .where('fromUserID', '==', fromUserID)
    .where('toUserID', '==', toUserID)
    // .orderBy('sentAt', 'asc')

    .onSnapshot(function(querySnapshot) {
      const messages = [];
      console.log('got messages');

      querySnapshot.forEach(function(doc) {
        messages.push(doc.data());
      });

      dispatch({
        type: types.GET_CHAT_MESSAGES,
        payload: messages,
      });
    });
};

export const getChats = (fromUserID, toUserID) => dispatch => {
  console.log('chats');

  db.collection('chats')
    .where('fromUserID', '==', 6)
    .where('toUserID', '==', 1)
    .where('open', '==', true)

    .onSnapshot(function(querySnapshot) {
      const chats = [];
      querySnapshot.forEach(function(doc) {
        doc.ref
          .collection('messages')
          .orderBy('sentAt', 'asc')
          .onSnapshot(function(messageSnapshot) {
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
        chats[doc.id] = { ...doc.data(), messages: [] };
        dispatch({
          type: types.GET_OPEN_CHATS,
          payload: chats,
        });
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
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
};
