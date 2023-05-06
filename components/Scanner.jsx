import { StyleSheet, View } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useState, useEffect } from 'react'
import { client } from "../sanity"
import { emptyAllCart } from '../store/cart'
import { addToMenu } from '../store/menu'
import { useDispatch } from 'react-redux'
export const Scanner = (props) => {

    const { setShopName, setScanner } = props

    const [cammeraPermission, setCammeraPermission] = useState(null)
    const dispatch = useDispatch()
    // const [scannerData, setScannerData] = useState("")

    const askForPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        setCammeraPermission(status == 'granted')
    }

    const getShopProduct = (id) => {
        client.fetch(`*[_type=='shop' && _id=="${id}"]{
          ...,
          product[]->{
            ...
          }
        }[0]`).then((data) => {
            if (data.length != 0) {
                setShopName(data.name)
                dispatch(addToMenu(data.product))
                dispatch(emptyAllCart())
                setScanner(false)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleScannerScan = ({ type, data }) => {
        // setScannerData(data)
        getShopProduct(data)

    }

    if (cammeraPermission == null || cammeraPermission == false) {
        askForPermission()
    }

    useEffect(() => {
        askForPermission()
    }, [])

    return (
        <View className="flex-1 items-center bg-white">
            <View className="items-center justify-center rounded-3xl w-full h-full">
                <BarCodeScanner
                    onBarCodeScanned={handleScannerScan}
                    style={StyleSheet.absoluteFillObject} />
            </View>
        </View>
    )

}