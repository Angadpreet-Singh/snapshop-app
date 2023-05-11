import { SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useEffect, useState } from "react";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";
import { ShoppingCartIcon, QrCodeIcon, Bars3Icon, CurrencyBangladeshiIcon } from "react-native-heroicons/solid"
import { Scanner } from "../../components/Scanner";
import { ProductCard } from "../../components/ProductCard";
import { URLfor } from "../../sanity"
import { useSelector } from "react-redux";
import 'react-native-url-polyfill/auto'

export const HomeScreen = () => {

  const navigation = useNavigation()
  const menuProduct = useSelector((state) => state.menu.items)
  const [scanner, setScanner] = useState(false)
  const shopName = useSelector((state) => state.shop.shopInfo.shopName)
  const cartProduct = useSelector((state) => state.cart.items)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>

      {/* Header */}

      <View className="flex-row items-center mt-4">
        <View className="w-16 h-16 p-1">
          <Image className="w-full h-full rounded-full"
            source={require("../../assets/logo.png")}
          />
        </View>
        <View className="flex-row flex-1 items-center space-x-16">
          <Text className="text-gray-600 text-lg font-bold">{!shopName ? "Shop now!" : shopName}</Text>
          <TouchableOpacity onPress={() => { setScanner(!scanner) }}>{scanner ? <Bars3Icon width={50} height={70} color="#AAC8A7" /> : <QrCodeIcon width={50} height={70} color="#AAC8A7" />}</TouchableOpacity>
        </View>
        <View className="flex-row space-x-5 mr-2">
          <TouchableOpacity><CurrencyBangladeshiIcon onPress={() => { navigation.navigate('Token') }} size={50} color="#AAC8A7" /></TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Cart') }}>
            <View>
              {cartProduct.length != 0 && <View className="absolute right-1 z-30 bg-red-400 p-1 rounded-full w-7 flex items-center">
                <Text className="font-bold">{cartProduct.length}</Text>
              </View>}
              <ShoppingCartIcon height={50} width={50} color="#AAC8A7" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/*Screen*/}

      {scanner ? <Scanner setScanner={setScanner} /> :
        <ScrollView contentContainerStyle={{ paddingHorizontal: 3, paddingVertical: 20 }} >
          {
            menuProduct?.map((e, index) => <ProductCard key={index} id={e._id} PhotoURL={e.photo?.asset ? URLfor(e.photo.asset._ref).url() : e.photo} productName={e.name} price={e.price} />)
          }
        </ScrollView>}
    </SafeAreaView>
  )
}
