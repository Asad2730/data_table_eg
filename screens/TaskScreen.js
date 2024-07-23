import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native'
import { fecthData } from '../api_requests/TaskScreen'
import { RenderDataItem } from '../components/RenderDataItem'


const TaskScreen = () => {

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [sortedCol, setSortedCol] = useState('asc')

    useEffect(() => {
     
        (async () => {
            try {
                const data = await fecthData()
                setData(data)
            } catch (ex) {
                console.error('error', ex)
            }
        })()
    }, [])


    const handleSort = col => {
        const order = (sortedCol === col && sortedCol === 'asc') ? 'desc' : 'asc'
        const sortedData = [...data].sort((a, b) => {
            if (a[col] < b[col]) return order === 'asc' ? -1 : 1
            if (a[col] > b[col]) return order === 'desc' ? 1 : -1
            return 0
        })

        setData(sortedData)
        setSortedCol(col)
        setSortedCol(order)
    }

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.age.toString().includes(search) ||
        item.dob.toLowerCase().includes(search)
    )


    const handleCheckedChange = (id) => {
        console.log('id',id)
        const update_Screen_Data = data.map(item => {
            if (item.id === id) {
                return { ...item, checked: !item.checked }
            }
            return item
        })

        setData(update_Screen_Data)
      
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder='Search...'
                value={search}
                onChangeText={(text) => setSearch(text)}
            />

            <View style={styles.header}>
                <Pressable onPress={() => handleSort('name')}>
                    <Text style={styles.headerText}>Name</Text>
                </Pressable>
                <Pressable onPress={() => handleSort('age')}>
                    <Text style={styles.headerText}>age</Text>
                </Pressable>
                <Pressable onPress={() => handleSort('dob')}>
                    <Text style={styles.headerText}>dob</Text>
                </Pressable>
            </View>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => <RenderDataItem item={item} onCheckedChange={handleCheckedChange} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

export default TaskScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    searchBar: {
        marginTop: 30,
        marginBottom: 20,
        padding: 8,
        borderBlockColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
        marginBottom: 8,
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
    },

})