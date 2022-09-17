import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import { Text, TouchableOpacityProps, TouchableOpacity, ImageBackground, ImageSourcePropType } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

export interface GameCardProps {
  id: string;
  title: string;
  _count: { ads: number };
  bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {

  const testAdsCount =
    data._count.ads > 1 ? `${data._count.ads} anúncios` : `${data._count.ads} anúncio`;

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={{ uri: data.bannerUrl }}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.title}
          </Text>
          <Text style={styles.ads}>
            {testAdsCount}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}