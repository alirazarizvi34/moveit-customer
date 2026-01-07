import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

import { THEME } from '../../shared/theme'
import { moderateScale, scale } from 'react-native-size-matters'
const { colorWhite, colorCircle } = THEME.colors


const ListBottomLoader = () => {
    return (
        <View style={styles.container}>
                <ActivityIndicator
                    size={40}
                    color={colorCircle}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorWhite,
        justifyContent:'center',
        alignItems:'center',
        padding:10

    },
})

export default ListBottomLoader