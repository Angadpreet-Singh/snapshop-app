import { useState } from "react"
import { Image, Text, View, TouchableOpacity } from "react-native"
import { PlusCircleIcon, MinusCircleIcon } from "react-native-heroicons/solid"
import { addToCart } from "../store/cart"
import { addToMenu } from "../store/menu"
import { useSelector, useDispatch } from "react-redux"
export const CartItem = (props) => {

    const { id, PhotoURL, productName, price, itemCount } = props
    const dispatch = useDispatch()
    const menuProducts = useSelector(state => state.menu.items)
    const cartProducts = useSelector(state => state.cart.items)
    const [count, setCount] = useState(itemCount)

    const filterProducts = () => {
        let newList = JSON.parse(JSON.stringify(menuProducts))
        newList.push({
            _id: id,
            price,
            name: productName,
            photo: PhotoURL
        })
        dispatch(addToMenu(newList))
        newList = JSON.parse(JSON.stringify(cartProducts))
        newList = newList.filter(e => e.productId != id)
        dispatch(addToCart(newList))
    }

    const handleAddToCart = () => {
        setCount(count + 1)
        let newList = JSON.parse(JSON.stringify(cartProducts))
        newList = newList.map(e => {
            if (e.productId == id) {
                return { ...e, count: e.count += 1 }
            }
            return e
        })
        dispatch(addToCart(newList))
    }

    const removeFromCart = () => {
        if (count == 1)
            filterProducts()
        else {
            setCount(count - 1)
            let newList = JSON.parse(JSON.stringify(cartProducts))
            newList = newList.map(e => {
                if (e.productId == id) {
                    return { ...e, count: e.count -= 1 }
                }
                return e
            })
            dispatch(addToCart(newList))
        }
    }
    return (
        <View className="flex-row items-center justify-between bg-gray-300 p-3 rounded-lg mt-2 mb-2">
            {PhotoURL && <Image className="w-36 h-36 rounded-full" source={{
                uri: PhotoURL
            }} />}
            <View className='flex items-center'>
                <Text className="font-bold text-2xl text-slate-700 mr-2 mb-3">{productName}</Text>
                <View className="flex-col items-center justify-end">
                    <Text className="font-bold text-lg mr-2">{"\u20B9" + " " + price}</Text>
                    <View className='flex-row mt-3 items-center'>
                        <TouchableOpacity onPress={removeFromCart}><MinusCircleIcon size={50} color='blue' /></TouchableOpacity>
                        <Text className='mr-3 ml-3 font-extrabold text-2xl'>{count}</Text>
                        <TouchableOpacity onPress={handleAddToCart}><PlusCircleIcon size={50} color='blue' /></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
