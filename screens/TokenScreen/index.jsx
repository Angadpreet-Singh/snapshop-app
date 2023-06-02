import { useLayoutEffect, useEffect, useState } from "react";
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from "react-native"
import SafeAreaAndroid from "../../components/SafeAreaAndroid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { client } from "../../sanity";

export const TokenScreen = () => {

    const navigation = useNavigation()
    const [localStorage, setLocalStotage] = useState({})
    const [queueNumber, setQueueNumber] = useState(0)

    const getAllOrders = async () => {
        let id = localStorage.token
        try {
            const data = await client.fetch(`*[_type=='order' && orderStatus == false] | order(_createdAt)`)
            let queueNo = data.findIndex(e => e._id == id) + 1
            setQueueNumber(queueNo)
        } catch (error) {
            console.log("error : ", error)
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('tokenValue')
            setLocalStotage(jsonValue != null ? JSON.parse(jsonValue) : null)
            return jsonValue
        } catch (e) {
            console.log("error : ", e)
        }
    }

    useEffect(() => {
        getData()
        getAllOrders()
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea} >
            <View className='flex items-center'>
                <Text className='text-gray-600 text-lg font-bold'>ORDER DETAILS</Text>
            </View>
            <View className='mt-4 p-3'>
                <Text className='text-lg font-bold text-gray-500'>Order Number : {localStorage.token}</Text>
                <Text className='text-xl font-bold text-gray-500 mt-2 mb-2'>Order Details : </Text>
                {localStorage?.order?.map((e) => <Text key={e._key} className='text-xl font-bold text-gray-500' >{e.productName + " x " + e.count + " = " + Number(e.price) * Number(e.count)}</Text>)}
                <Text className='text-xl font-bold text-gray-500 mt-5'>Price : {"\u20B9" + " " + localStorage.totalprice}</Text>
                <Text className='text-xl font-bold text-gray-500'>Order Status : {queueNumber == 0 ? "Packed" : "Under Process"}</Text>
                {queueNumber != 0 && <Text className='text-xl font-bold text-gray-500'>Queue Number : {queueNumber}</Text>}
            </View>
        </SafeAreaView>
    )
}
