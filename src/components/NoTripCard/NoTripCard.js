import { View, Text, Image } from 'react-native'
import React from 'react'

import { useTranslation } from 'react-i18next'
import { AppImages } from '../../constants/AppImages';

import styles from './styles';
const NoTripCard = ({ title }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Image source={AppImages.NoTrip} style={styles.noTrip} resizeMode='contain' />
            <Text style={styles.messageText}>
                {title}
            </Text>
        </View>
    )
}

export default NoTripCard