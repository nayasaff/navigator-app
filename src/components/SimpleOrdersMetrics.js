import React from 'react';
import { View, Text } from 'react-native';
import { pluralize, formatDuration, formatMetersToKilometers, getActiveOrdersCount, getTotalStops, getTotalDuration, getTotalDistance } from 'utils';
import { Order } from '@fleetbase/sdk';
import { tailwind } from 'tailwind';
import { format } from 'date-fns';
import {translate} from "utils"
import { getLanguage } from '../utils/Localize';
import moment from 'moment';
import 'moment/locale/ar';

const SimpleOrdersMetrics = ({ orders, date = new Date(), wrapperStyle, containerStyle }) => {
    const currentLanguage = getLanguage()
    moment.locale(getLanguage());
    
    return (
        <View style={[wrapperStyle]}>
            <View style={[tailwind('px-4'), containerStyle]}>
                <Text style={tailwind('font-semibold text-lg text-gray-50 w-full mb-1')}>{`${moment(date).format('dddd')} ${translate("Account.AccountScreen.ordersLinkText")}`}</Text>
                <View>
                    <View style={tailwind('flex flex-row items-center mb-1')}>
                        <Text style={tailwind('text-base text-gray-100')}> {translate(`SimpleOrderMetricts.${pluralize(getActiveOrdersCount(orders), 'order')}`)}</Text>
                        <Text style={tailwind('text-base text-gray-100 mx-2')}>•</Text>
                        <Text style={tailwind('text-base text-gray-100')}>{`${getTotalStops(orders)} ${translate("SimpleOrderMetricts.stops")}`}</Text>
                        <Text style={tailwind('text-base text-gray-100 mx-2')}>•</Text>
                        <Text style={tailwind('text-base text-gray-100')}>{formatDuration(getTotalDuration(orders))}</Text>
                        <Text style={tailwind('text-base text-gray-100 mx-2')}>•</Text>
                        <Text style={tailwind('text-base text-gray-100')}>{formatMetersToKilometers(getTotalDistance(orders))}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SimpleOrdersMetrics;
