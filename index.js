/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import RNCallKeep from 'react-native-callkeep';
import { EventRegister } from 'react-native-event-listeners';
import fireCall from './src/utils/Call';

const { emit } = EventRegister;

const options = {
    ios: {
        appName: 'YourAppName',
    },
    android: {
        alertTitle: 'Permissions Required',
        alertDescription: 'This application needs to access your phone accounts',
        cancelButton: 'Cancel',
        okButton: 'OK',
        foregroundService: {
            channelId: 'com.yourapp.incoming_call',
            channelName: 'Incoming Calls',
            notificationTitle: 'Incoming Call',
        },
    },
}; //Our change to ask for permissions for call

// Setup RNCallKeep during app initialization
RNCallKeep.setup(options);
RNCallKeep.setAvailable(true);

// RNCallKeep.addEventListener('answerCall', (data) => {
//     RNCallKeep.endAllCalls();
//     RNCallKeep.backToForeground();
// })

// RNCallKeep.addEventListener('endCall', (data) => {
//     RNCallKeep.backToForeground();
// })

/**
 * Push Notifications Configurations
 * We will just use EventRegister to pass up.
 */

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);

    const orderId = remoteMessage.data.id;
    const orderType = remoteMessage.data.type;

    if (orderType === 'order_dispatched') {
        await fireCall(orderId);
    }

    return Promise.resolve(); // Ensure the function completes
});

// AppRegistry.registerComponent(appName, () => App);
import './index.native.tsx';
