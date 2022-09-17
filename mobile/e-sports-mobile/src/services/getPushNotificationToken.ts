import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken() {
  const { granted } = await Notifications.getPermissionsAsync();

  !granted && await Notifications.requestPermissionsAsync();
  
  if(granted) {
    const pushToken = await Notifications.getExpoPushTokenAsync();
    console.log('NOTIFICATION TOKEN =>', pushToken.data);
    return pushToken.data;
  }
}