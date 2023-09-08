import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen'

TrackPlayer.registerPlaybackService(() => require('./player-service'));

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playerInitialized, setPlayerInitialized] = useState(false); // Nuevo estado para verificar si el reproductor está inicializado


  useEffect(() => {
    if(Platform.OS==='android');
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setupPlayer();
  }, []);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: 'radio',
      url: 'http://usa15.ciudaddigital.com.uy:8040/FederalFM',
      title: 'Radio Federal FM',
      artist: 'Online',
    });
    setPlayerInitialized(true); // Establecer el estado a true una vez que el reproductor esté inicializado
  };

  const togglePlay = async () => {
    if (!playerInitialized) {
        console.warn("El reproductor aún no está inicializado.");
        return; // Si el reproductor no está inicializado, no hacer nada
    }

    if (isPlaying) {
        await TrackPlayer.pause();
    } else {
        await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
};

  return (
    <View style={styles.container}>
      <Text style={styles.niceText}>Ponele onda, Ponele Play!</Text>
      <Icon 
        name={isPlaying ? 'pause' : 'play'} 
        size={120} 
        color="#34B6E4" 
        onPress={togglePlay} 
        style={styles.playButton}
      />
      <Slider
        style={styles.volumeControl}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onValueChange={(value) => {
          setVolume(value);
          TrackPlayer.setVolume(value);
        }}
        minimumTrackTintColor="#34B6E4"
        maximumTrackTintColor="#FFFFFF"
        thumbTintColor="#34B6E4"
      />
      <Text style={styles.footerText}>La 99.1 va contigo a donde vayas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF00',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20%',
    paddingBottom: '20%',
  },
  niceText: {
    fontSize: 40,
    color: '#34B6E4',
    fontFamily: 'DancingScript-Regular',
  },
  playButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  volumeControl: {
    width: '50%',
  },
  footerText: {
    fontSize: 18,
    color: '#34B6E4',
    fontFamily: 'Exo2-Regular',
  },
});

export default App;