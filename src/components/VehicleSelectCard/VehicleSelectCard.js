import { View, Text, TouchableOpacity, Image } from 'react-native'
import { getStyles } from './styles'
import { AppImages } from '../../constants/AppImages'

const VehicleSelectCard = ({ getIndexChecked, vehicle, selectVehicle,onCheckClick }) => {
    const styles = getStyles(getIndexChecked, vehicle)
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    getIndexChecked?.indexChecked !=
                        vehicle?.item?.id && selectVehicle(vehicle);
                }}>
                <View>

                    <TouchableOpacity onPress={onCheckClick}>
                        <Image source={AppImages.Information} style={styles.checkImage} />
                    </TouchableOpacity>
                    <Text
                        style={styles.truckHeading}>
                        {vehicle?.item?.name}
                    </Text>
                </View>
                <View>

                    <Image
                        source={{
                            uri: vehicle?.item?.image,
                        }}
                        style={styles.truckImage}
                        resizeMode="contain"
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default VehicleSelectCard