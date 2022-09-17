import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteParams } from '../../@types/navigation';

import Background from '../../components/Background';
import { Headding } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

import LogoImg from '../../assets/logo-nlw-esports.png';

import { api } from '../../services/api';

import { THEME } from '../../theme';
import { styles } from './styles';



export function Game() {
  const route = useRoute();
  const game = route.params as RouteParams;
  const navigation = useNavigation();
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('')

  function handleGoBack() {
    navigation.navigate('home');
  }

  async function getDiscordUser(adsId: string) {
    const response = await api.get(`/ads/${adsId}/discord`);
    return setDiscordDuoSelected(response.data.discord);
  }

  useEffect(() => {
    const responseData = async () => {
      const response = await api.get(`/games/${game.id}/ads`);
      return setDuos(response.data);
    }
    responseData()

    // fetch('http://192.168.0.12:3333/games')
    //   .then(response => response.json())
    //   .then(data => setGames(data))

  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleGoBack}
          >
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image
            source={LogoImg}
            style={styles.logo}
          />
          <View style={styles.right} />
        </View>

        <Image
          style={styles.cover}
          source={{ uri: game.bannerUrl }}
          resizeMode="cover"
        />

        <Headding
          title={game.title}
          subtitle='Conect-se e comece a jogar'
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (

            <DuoCard
              data={item}
              onConnect={() => {getDiscordUser(item.id)}}
            />
          )
          }
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}

          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para este game, ainda.
            </Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => { setDiscordDuoSelected('') }}
        />
      </SafeAreaView>
    </Background>
  );
}