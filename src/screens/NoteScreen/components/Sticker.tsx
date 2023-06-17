import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import {sticker} from '../../../types/noteTypes'
import Draggable from 'react-native-draggable'
import { imageUris } from './stickerlist'
import { MaterialIcons } from '@expo/vector-icons'; 


const Sticker = ({sticker, viewMode, offsetY, stickers, setStickers, index}) => {

  const oldXY = useRef({x:sticker.x, y:sticker.y})

    const handleDragRelease = (x, y) => {
        let newStickers : sticker[] = [...stickers]
        newStickers[index] = {stickerId:sticker.stickerId , x:x, y:y-230 + offsetY, isMove: true }
        setStickers(newStickers)
    }

    const handleDelete = () => {
      const newStickers = stickers.filter(stickerT => stickerT !== sticker)
      setStickers(newStickers)
    }
    
    useEffect(() => {
       let newStickers : sticker[] = [...stickers]
        newStickers[index] = {...sticker, isMove: false }
        console.log(newStickers[index].x)
        setStickers(newStickers)
    }, [])

    // {(event, gesture) => handleDragRelease(gesture.moveX, gesture.dy)}
  return (
    <Draggable x={sticker.isMove ? oldXY.current.x : sticker.x} y={sticker.isMove ? oldXY.current.y : sticker.y} 
    disabled={viewMode ? true : false} renderSize={90}  
    onDragRelease={(e) =>  handleDragRelease(e.nativeEvent.pageX - e.nativeEvent.locationX, e.nativeEvent.pageY - e.nativeEvent.locationY)}>
         <Image source={imageUris[sticker.stickerId]} style={{width: 90, height: 90}}/>
         {!viewMode && 
                 <TouchableOpacity style={{ position:'absolute', top: 0, right:0}} onPress={handleDelete}>
                 <MaterialIcons name="cancel" size={20} color="red" />
                 </TouchableOpacity>
         } 
    </Draggable>
  )
}

export default Sticker

const styles = StyleSheet.create({})