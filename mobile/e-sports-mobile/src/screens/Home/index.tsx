import React, { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LogoImg from '../../assets/logo-nlw-esports.png';

import { GameCard } from '../../components/GameCard';
import { Headding } from '../../components/Heading';

import { GameCardProps } from '../../components/GameCard'
import { api } from '../../services/api';

import { styles } from './styles';
import Background from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps) {
    navigation.navigate('game', {id, title, bannerUrl});
  }

  useEffect(() => {
    const responseData = async () => {
      const response = await api.get('/games');
      return setGames(response.data);
    }
    responseData()

    // fetch('http://192.168.0.12:3333/games')
    //   .then(response => response.json())
    //   .then(data => setGames(data))

  }, []);


  return (
    <Background >
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={LogoImg}
        />
        <Headding
          title='Encontre seu duo'
          subtitle='Selecione o game que deseja jogar...'
        />
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />

          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.conntentList}
        />
        
      </SafeAreaView>
    </Background>
  );
}
