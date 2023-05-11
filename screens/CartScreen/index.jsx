import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useEffect, useState } from "react";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";
import { CartItem } from "../../components/CartItem";
import { ChevronDoubleRightIcon } from "react-native-heroicons/solid"
import { useSelector } from 'react-redux'
import { client } from "../../sanity";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { useDispatch } from "react-redux";
import { emptyAllCart } from "../../store/cart";
import { emptyAllMenu } from "../../store/menu";
import { removeShop } from "../../store/shop";
export const CartScreen = () => {

    const navigation = useNavigation()
    const [totalprice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const [localStorage, setLocalStotage] = useState({})
    const cartproducts = useSelector((state) => state.cart.items)
    const shopId = useSelector((state) => state.shop.shopInfo.shopId)
    const dispatch = useDispatch()

    const calculateTotalPrice = () => {
        let tempPrice = 0
        cartproducts.map(e => {
            tempPrice = tempPrice + (Number(e.price) * e.count)
        })
        setTotalPrice(tempPrice)
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('tokenValue', jsonValue)
            setLoading(false)
            navigation.navigate('Home')
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('tokenValue')
            setLocalStotage(jsonValue != null ? JSON.parse(jsonValue) : null)
            return jsonValue
        } catch (e) {
            console.log(e)
        }
    }

    const bookingOrder = () => {
        setLoading(true)
        orderProducts = cartproducts.map(e => ({
            photoURL: e.PhotoURL,
            count: e.count + "",
            price: e.price,
            productId: e.productId,
            productName: e.productName,
            _key: (Math.random() + 1).toString(36).substring(7)
        }))

        const doc = {
            _type: 'order',
            orderStatus: false,
            totalPrice: totalprice,
            shopId: shopId,
            order: orderProducts
        }

        client.create(doc).then((res) => {
            storeData({
                token: res._id,
                totalprice
            })
        })
        dispatch(emptyAllCart())
        dispatch(emptyAllMenu())
        dispatch(removeShop())
    }

    useEffect(() => {
        calculateTotalPrice()
    }, [cartproducts])

    useEffect(() => {
        getData()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
    return (
        <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea} >
            {loading && <View className='absolute z-40 flex w-full h-full justify-center items-center'>
                <Progress.Circle size={100} indeterminate={true} color='gray' borderWidth={10} />
            </View>}
            <View className='flex items-center'>
                <Text className='text-gray-600 text-lg font-bold'>CART</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 3, paddingVertical: 5 }} >
                {cartproducts.map((e, index) => <CartItem key={index} id={e.productId} PhotoURL={e.PhotoURL} productName={e.productName} price={e.price} itemCount={e.count} />)}
            </ScrollView>
            {totalprice != 0 && <View className='flex items-center'>
                <View className='bg-blue-100 w-full rounded-md'>
                    <View className='flex-row items-center justify-between p-8'>
                        <Text className='text-2xl font-medium'>Total Price  :   {"\u20B9" + " " + totalprice}</Text>
                        <TouchableOpacity onPress={bookingOrder}><ChevronDoubleRightIcon size={50} color='black' /></TouchableOpacity>
                    </View>
                </View>
            </View>}
        </SafeAreaView>
    )
}
