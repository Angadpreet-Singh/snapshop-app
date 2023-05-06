import { Image, Text, View, TouchableOpacity } from "react-native"
import { PlusCircleIcon } from "react-native-heroicons/solid"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../store/cart"
import { addToMenu } from "../store/menu"
export const ProductCard = (props) => {

    const { id, PhotoURL, productName, price } = props
    const dispatch = useDispatch()
    const cartProducts = useSelector((state) => state.cart.items)
    const menuProducts = useSelector((state) => state.menu.items)

    const filterMenuProducts = () => {
        let newList = JSON.parse(JSON.stringify(menuProducts))
        newList = newList.filter(e => e._id != id)
        dispatch(addToMenu(newList))
    }

    const handleAddToCart = () => {
        let newList = JSON.parse(JSON.stringify(cartProducts))
        newList.push({
            productId: id,
            count: 1,
            price,
            productName,
            PhotoURL
        })
        dispatch(addToCart(newList))
        filterMenuProducts()
    }

    return (
        <View className="flex-row items-center justify-between bg-gray-300 p-3 rounded-lg mt-2 mb-2">
            {PhotoURL && <Image className="w-36 h-36 rounded-full" source={{
                uri: PhotoURL
            }} />}
            <View>
                <Text className="font-bold text-2xl text-slate-700 mr-2">{productName}</Text>
                <View className="flex-row items-center justify-end">
                    <Text className="font-bold text-lg mr-2">{"\u20B9" + " " + price}</Text>
                    <TouchableOpacity onPress={handleAddToCart}><PlusCircleIcon width={50} height={50} color='black' /></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
