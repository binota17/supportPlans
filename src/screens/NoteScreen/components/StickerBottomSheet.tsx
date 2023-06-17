import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { sticker } from '../../../types/noteTypes';
import { imageUris } from './stickerlist';

const StickerBottomSheet = ({bottomSheetRef, stickers, setStickers, offsetY}) => {

    
    const total = 12


    // for(let i = 1; i <= total; i++) {
    //     imageUris.push(require(`../../../../assets/Sticker/1.png`))
    // }    

    const snapPoints = useMemo(() => ["16%", "30%",'45%'], []);

    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={3}
        />
      ),
      []
    );

    const handleStickerPress = (index : number) => {
        const newSticker : sticker = {
            stickerId: index,
            x: 0,
            y: 0,
            isMove: false,
        }
        //300
        setStickers([...stickers, newSticker])
    }

  return (
    <View style={styles.container}>
      <BottomSheet
        style={{flex:1}}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        // footerComponent={renderFooter}
        enableContentPanningGesture = {false}
      >
        <View style={styles.list}>
        {imageUris.length !== 0 && imageUris.map((imageUri, index) => 
            // <Text key={imageUri}>{imageUri} </Text>
            <TouchableOpacity key={imageUri} onPress={() => handleStickerPress(index)}>
              <Image source={imageUri} style={{width: 90, height: 90}}/>
            </TouchableOpacity>
            
        )}
        </View>
      </BottomSheet>
    </View>
  )
}

export default StickerBottomSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        position: "absolute",
        width: "100%",
        height: "100%",
        // backgroundColor: 'grey',
      },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
    }
})