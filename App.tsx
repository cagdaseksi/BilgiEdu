import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ParticipantList } from './src/core/ParticipantList';
import { ParticipantBoundary } from './src/core/ParticipantBoundary';
import { participants } from './src/generated/participants';
import type { GameScreen } from './src/shared/types';
import { palette } from './src/shared/ui';

type Route = { id: string; screen: GameScreen; level: number } | null;
export default function App() {
  const [route, setRoute] = useState<Route>(null);
  const selected = participants.find(item => item.id === route?.id);
  const back = () =>
    setRoute(current => {
      if (!current || current.screen === 'home') {
        return null;
      }
      return {
        ...current,
        screen: current.screen === 'game' ? 'levels' : 'home',
      };
    });
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!route) {
          return false;
        }
        back();
        return true;
      },
    );
    return () => subscription.remove();
  }, [route]);
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={palette.background}
      />
      <View style={local.root}>
        {selected && route ? (
          <ParticipantBoundary key={selected.id} onExit={() => setRoute(null)}>
            <selected.Screen
              screen={route.screen}
              level={route.level}
              onBack={back}
              onExit={() => setRoute(null)}
              onOpenLevels={() => setRoute({ ...route, screen: 'levels' })}
              onPlayLevel={level =>
                setRoute({ ...route, screen: 'game', level })
              }
            />
          </ParticipantBoundary>
        ) : (
          <ParticipantList
            onSelect={id => setRoute({ id, screen: 'home', level: 1 })}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}
const local = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.background },
});
