import { StyleSheet, Text, View } from 'react-native'
import Checkbox from 'expo-checkbox'

export const RenderDataItem = ({ item ,onCheckedChange }) => (
    <View style={styles.row}>
        <Text style={styles.row}>{item.name}</Text>
        <Text style={styles.row}>{item.age}</Text>
        <Text style={styles.row}>{item.dob}</Text>
        <Checkbox value={item.checked} onValueChange={() => onCheckedChange(item.id)}  />
    </View>
)

const styles = StyleSheet.create({
    row: {
    
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 8,
        padding:10,
    },
    cell: {
        flex: 1,
    }
})