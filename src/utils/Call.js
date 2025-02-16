import AsyncStorage from '@react-native-async-storage/async-storage';
import RNCallKeep from 'react-native-callkeep';


const callerName = "New Order";

const fireCall = async (orderId) => {
    const order_id = await AsyncStorage.getItem(orderId);

    if(order_id === null) {
        await AsyncStorage.setItem(orderId, orderId);
        RNCallKeep.displayIncomingCall(orderId, callerName, callerName);

        RNCallKeep.addEventListener('answerCall', ({ callUUID }) => {
            RNCallKeep.endCall(callUUID);
            RNCallKeep.backToForeground();
        });
        RNCallKeep.addEventListener('endCall', () => {
            RNCallKeep.backToForeground();
        });
    }
}

export default fireCall;