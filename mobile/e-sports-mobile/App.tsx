
import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';

import { Routes } from './src/routes';
import Background from './src/components/Background';
import { Loading } from './src/components/Loading';

import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import './src/services/notificationConfigs';


export default function App() {
  const getNotificaionListener = useRef<Subscription>();
  const responseNotificaionListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);
  useEffect(() => {
    getNotificaionListener.current = Notifications
      .addNotificationReceivedListener(notification => {
        console.log(notification);
      });

    responseNotificaionListener.current = Notifications
      .addNotificationReceivedListener(response => {
        console.log(response);
      })
    
      return () => {
        if(getNotificaionListener.current && responseNotificaionListener.current){
          Notifications.removeNotificationSubscription(getNotificaionListener.current)
          Notifications.removeNotificationSubscription(responseNotificaionListener.current)
        }
      }
  }, [])
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
;
