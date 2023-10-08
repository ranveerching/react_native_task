/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useCallback} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import CleverTap from 'clevertap-react-native';

const App = () => {
  useEffect(() => {
    const request = async () => {
      await requestNotifications();
    };

    CleverTap.registerForPush();

    CleverTap.createNotificationChannel(
      'Custom_Channel',
      'Clever Tap React Native Testing',
      'CT React Native Testing',
      5,
      true,
    );

    request();

    CleverTap.getCleverTapID((err, res) => {
      console.log('CleverTapID', res, err);
    });
  }, []);

  const sendEvent = useCallback(() => {
    CleverTap.onUserLogin({
      Name: 'Aakruti Kumari',
      Email: 'test@gmail.com',
    });
    CleverTap.recordEvent('Product Viewed', {
      'Product ID': 1,
      'Product Image':
        'https://d35fo82fjcw0y8.cloudfront.net/2018/07/26020307/customer-success-clevertap.jpg ',
      'Product Name': 'CleverTap',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Send Event" onPress={sendEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
