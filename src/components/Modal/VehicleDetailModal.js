import React from 'react'
import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'

import BottomModal from './BottomModal'
import SmallButton from '../Button/SmallButton'
import { getStyles } from './VehicleDetailsModalStyles'


const VehicleDetailModal = ({ visible, onClose, vehicle }) => {
    const { t, i18n } = useTranslation()

    const styles = getStyles(i18n.language)

    return (
        <BottomModal visible={visible} onModalClose={onClose}>
            <View style={styles.container}>
                <View style={styles.vehicleDetails}>
                    <View style={styles.headingView}>
                        <Text style={styles.vehicleDetailsHeading}>{t("vehicle_details")}</Text>
                    </View>
                    <View style={styles.detailSubView}>
                        <Text style={styles.vehicleLabel}>{t("dimensions")}</Text>
                        <Text style={styles.valueText}>{vehicle?.dimensions}</Text>
                    </View>
                    <View style={styles.detailSubView}>
                        <Text style={styles.vehicleLabel}>{t("items_you_can_fit")}</Text>
                        <Text style={styles.valueText}>{vehicle?.item_suggestions}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <SmallButton title={t("done")} onPress={onClose} />
                </View>
            </View>
        </BottomModal>
    )
}

export default VehicleDetailModal

