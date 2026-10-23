import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { participants } from '../generated/participants';
import { styles } from '../shared/ui';
export function ParticipantList({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={participants}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.page}
        ListHeaderComponent={
          <View>
            <View style={styles.top}>
              <Text style={styles.brand}>BILGI / EDU</Text>
            </View>
            <Text style={styles.eyebrow}>YAPAY ZEKA ILE MOBIL OYUN</Text>
            <Text style={styles.title}>{'Bir fikir.\nSenin oyunun.'}</Text>
            <Text style={styles.body}>Bir katilimci sec, oyununu kesfet.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={item.name + ' oyununu ac'}
            onPress={() => onSelect(item.id)}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          >
            <Text style={[styles.eyebrow, { color: item.accent }]}>
              KATILIMCI
            </Text>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.detail}>{item.gameTitle} / Oyunu ac</Text>
          </Pressable>
        )}
        ListFooterComponent={
          <Text style={styles.footer}>
            BilgiEdu atolye uygulamasi / 1.0 (1)
          </Text>
        }
      />
    </SafeAreaView>
  );
}
