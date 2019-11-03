import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Appbar, DarkTheme, Button, Text} from 'react-native-paper';

export const ErrorScreen = (props: {refetch: () => void}) => (
  <SafeAreaView
    testID={'ErrorScreen'}
    style={{flex: 1, backgroundColor: DarkTheme.colors.background}}>
    <Appbar.Header>
      <Appbar.Content title={'Rickipedia'} subtitle={'and some Morty stuff.'} />
    </Appbar.Header>
    <View
      style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
      <Text style={{padding: 32}}>
        {
          'Something went wrong. Please try again later and make sure you have a working internet connection'
        }
      </Text>
      <Button
        testID={'ErrorScreenButton'}
        onPress={() => props.refetch()}
        icon={'refresh'}
        mode={'contained'}>
        <Text>{'Try again'}</Text>
      </Button>
    </View>
  </SafeAreaView>
);
