import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, ViewBase } from 'react-native';
import { Button, TextInput, Appbar } from 'react-native-paper';

export default function App() {
  let [lat, setLat] = useState(0);
  let [lng, setLng] = useState(0);
  let [dataJson, setDataJson] = useState(0);

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

      <MapView style={styles.mapStyle}>
        <Marker
          coordinate={{
            latitude: dataJson.results[0].geometry.lat,
            longitude: dataJson.results[0].geometry.lng,
          }}
        />
      </MapView>

      <View style={styles.container}>
        <TextInput
          mode="outlined"
          placeholder="Latitude"
          onChangeText={setLat}
        />
        <TextInput
          mode="outlined"
          placeholder="Longitude"
          onChangeText={setLng}
        />
        <Button mode="contained" onPress={fetchLocation}>
          Search
        </Button>
        <Text>{dataJson.results[0].formatted}</Text>
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
