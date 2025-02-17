/***
 * This file all includes Our change to fire call when new order is dispatched for the driver
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNCallKeep from 'react-native-callkeep';


const callerName = "New Order";

const fireCall = async (orderId) => {
    const order_id = await AsyncStorage.getItem(orderId); //To avoid multiple calls in case component re-renders

    if(order_id === null) { //If condition ensures that the call is made only once
        await AsyncStorage.setItem(orderId, orderId);
        RNCallKeep.displayIncomingCall(orderId, callerName, callerName); //Display incoming call

        RNCallKeep.addEventListener('answerCall', ({ callUUID }) => {
            RNCallKeep.endCall(callUUID); //End call when user answers
            RNCallKeep.backToForeground(); //If app is closed open app
        });
        RNCallKeep.addEventListener('endCall', () => {
            RNCallKeep.backToForeground(); //If app is closed open app
        });
    }
}

export default fireCall;