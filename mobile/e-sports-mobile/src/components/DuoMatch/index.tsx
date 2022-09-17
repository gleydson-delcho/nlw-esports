import React, { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Activity, CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { Headding } from '../Heading';

import { THEME } from '../../theme';
import { styles } from './styles';


interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props,) {

  const [isCopying, setIsCopying] = useState<boolean>(false);

  async function handleCopyDiscordUserToClipboard() {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert('Discord copiado!', 'Um usuário foi copiado para a área de trasferência.')
    setIsCopying(false)
  }

  return (
    <Modal
    animationType='fade'
      transparent
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeIcon}
          >
            <MaterialIcons
              name='close'
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight='bold'
          />
          <Headding
            style={{ alignItems: 'center', marginTop: 24 }}
            title="Let's Play"
            subtitle='Agora é só jogar!'
          />
          <Text
            style={styles.label}
          >
            Adicione no discord
          </Text>
          <TouchableOpacity
            onPress={handleCopyDiscordUserToClipboard}
            style={styles.discordButton}
            disabled={isCopying}
          >
            <Text style={styles.discord}>
              {isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}