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
  // dispatch({
  //   type: types.GET_AVG_SALARIES,
  // });
  console.log('aaa');

  // db.collection('messages')
  //   .where('fromUserID', '==', fromUserID)
  //   .where('toUserID', '==', toUserID)
  //   .get()
  //   .then(querySnapshot => {
  //     console.log(querySnapshot);

  //     querySnapshot.forEach(doc => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //       console.log(doc.data());
  //       messages.push(doc.data());
  //     });

  //     dispatch({
  //       type: types.GET_CHAT_MESSAGES,
  //       payload: messages,
  //     });
  //   });

  db.collection('messages')
    .where('fromUserID', '==', fromUserID)
    .where('toUserID', '==', toUserID)
    .orderBy('sentAt', 'asc')

    .onSnapshot(function(querySnapshot) {
      const messages = [];
      querySnapshot.forEach(function(doc) {
        console.log(doc.data());
        messages.push(doc.data());
      });

      dispatch({
        type: types.GET_CHAT_MESSAGES,
        payload: messages,
      });
    });
};
