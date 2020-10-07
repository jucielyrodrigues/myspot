import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, TextInput, Appbar } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  let [lat, setLat] = useState('');
  let [lng, setLng] = useState('');
  let [dataJson, setDataJson] = useState('');

  // function to fetch data from opencage
  const fetchLocation = () => {
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=ad3b7da594ad4a239eb32622118085e1&q=${lat}+${lng}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setDataJson(json);
      });
  };
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content style={{ textAlign: 'center' }} title="MySpot" />
      </Appbar.Header>

      <MapView
        style={styles.mapStyle}
        region={{
          latitude: Number(dataJson && dataJson.results[0].geometry.lat),
          longitude: Number(dataJson && dataJson.results[0].geometry.lng),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={17}
      >
        <Marker
          coordinate={{
            latitude: Number(dataJson && dataJson.results[0].geometry.lat),
            longitude: Number(dataJson && dataJson.results[0].geometry.lng),
          }}
        />
      </MapView>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          placeholder="Latitude"
          value={lat}
          onChangeText={(lat) => setLat(lat)}
        />
        <TextInput
          mode="outlined"
          placeholder="Longitude"
          value={lng}
          onChangeText={(lng) => setLng(lng)}
        />
        <Button mode="contained" onPress={fetchLocation}>
          Search
        </Button>
        <Text>{dataJson && dataJson.results[0].formatted}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  mapStyle: {
    width: '90%',
    height: '47%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
  },
});
