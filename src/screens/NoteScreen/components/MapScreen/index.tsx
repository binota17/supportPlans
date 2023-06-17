import React, { FC, useMemo, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from "react-native";
import createStyles from "./styles";
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import MapView, { MapEvent, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { position } from "../../../../types/noteTypes";
import { FontAwesome5 } from '@expo/vector-icons'; 

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const MapScreen: FC<IProps> = ({ navigation }) => {
  const route = useRoute()

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [position, setPosition] = useState<position>(route.params? route.params['position']: undefined);


  const getLocationName = (latitude:number, longitude:number) => {
    
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      console.log(position)
      if(position) {
        console.log(position)
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
      // setLocation(currentLocation);
      console.log(currentLocation)

      if (errorMsg) {
        text = errorMsg;
      } else if (currentLocation) {
        const latitude = currentLocation.coords.latitude;
        const longitude = currentLocation.coords.longitude;
        const regionName = await Location.reverseGeocodeAsync({
          latitude: latitude,
          longitude: longitude,
        });
        const locationName =
        (regionName[0].streetNumber ? regionName[0].streetNumber + " " : "") +
        (regionName[0].street ? regionName[0].street + ", " : "") +
        (regionName[0].subregion ? regionName[0].subregion + ", " : "") +
        (regionName[0].city ? regionName[0].city + ", " : "") +
        (regionName[0].region ? regionName[0].region + ", " : "") +
        regionName[0].country

        setPosition({
          name: locationName,
          latitude: latitude,
          longitude: longitude,
        });
      }
      
    });
    return unsubscribe;
  }, []);

  let text = "Waiting..";
  let _mapView: MapView;

  // let locationName: string;

  const handleMapPress = async (e: MapEvent) => {
    Keyboard.dismiss();
    const latitude = e.nativeEvent.coordinate.latitude;
    const longitude = e.nativeEvent.coordinate.longitude;

    _mapView.animateCamera(
      {
        center: {
          latitude: latitude,
          longitude: longitude,
        },
      },
      { duration: 1000 }
    );
    const regionName = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });
    const locationName =
      (regionName[0].streetNumber ? regionName[0].streetNumber + " " : "") +
      (regionName[0].street ? regionName[0].street + ", " : "") +
      (regionName[0].subregion ? regionName[0].subregion + ", " : "") +
      (regionName[0].city ? regionName[0].city + ", " : "") +
      (regionName[0].region ? regionName[0].region + ", " : "") +
      regionName[0].country

    setPosition({
      name: locationName,
      latitude: latitude,
      longitude: longitude,
    });
  };

  const onPoiClick = async (e: MapEvent, name: string) => {
    Keyboard.dismiss();
    const latitude = e.nativeEvent.coordinate.latitude;
    const longitude = e.nativeEvent.coordinate.longitude;

    _mapView.animateCamera(
      {
        center: {
          latitude: latitude,
          longitude: longitude,
        },
      },
      { duration: 1000 }
    );
    const regionName = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });
    const locationName =
      name.replace(/\n|\r/g, " ") + ", " +
      (regionName[0].streetNumber ? regionName[0].streetNumber + " " : "") +
      (regionName[0].street ? regionName[0].street + ", " : "") +
      (regionName[0].subregion ? regionName[0].subregion + ", " : "") +
      (regionName[0].city ? regionName[0].city + ", " : "") +
      (regionName[0].region ? regionName[0].region + ", " : "") +
      regionName[0].subregion +
      ", " +
      regionName[0].region +
      ", " +
      regionName[0].country;

    setPosition({
      name: locationName,
      latitude: latitude,
      longitude: longitude,
    });
  };

  const updatePosition = () => {
    if(route.params) {
          route.params['setPosition'](position);
    }
    navigation.goBack()
  }

  const styles = useMemo(() => createStyles(), []);

  return (
    <View style={styles.body}>
      {!position ? (
        <Text>{text}</Text>
      ) : (
        <View style={styles.body}>
        <MapView
          ref={(mapView) => {
            if (mapView) _mapView = mapView;
          }}
          style={styles.map}
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.002, 
            longitudeDelta: 0.002
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsPointsOfInterest={true}
          showsBuildings={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          // pitchEnabled={true}
          rotateEnabled={true}
          moveOnMarkerPress={true}
          onPress={(e) => handleMapPress(e)}
          onPoiClick={(e) => onPoiClick(e, e.nativeEvent.name)}
          // loadingEnabled={true}
        >
          <Marker
            // title="Pick here"
            // description={locationName}
            coordinate={position}
          />
        </MapView>
        <TextInput 
          style={styles.name}
          value={position.name}
          onChangeText={(name) => setPosition((prevPosition) => ({...prevPosition, name: name}))}
          />
        <TouchableOpacity style={[styles.button]} onPress={updatePosition}>
        <FontAwesome5 name="check-circle" size={30} color="black" />
      </TouchableOpacity> 
        </View>
      )}
    </View>
  );
};

export default MapScreen;
