import React, { type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export const palette = {
  background: '#0C1324',
  panel: '#172137',
  border: '#2A3650',
  text: '#F4F7FF',
  muted: '#A8B5CF',
  accent: '#B7F36B',
};
export function Page({
  title,
  eyebrow,
  onBack,
  children,
}: {
  title: string;
  eyebrow: string;
  onBack?: () => void;
  children: ReactNode;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.top}>
          <Text style={styles.brand}>BILGI / EDU</Text>
          {onBack && (
            <Pressable accessibilityRole="button" onPress={onBack} hitSlop={12}>
              <Text style={styles.back}>Geri</Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
export function Action({
  title,
  onPress,
  secondary = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.action,
        secondary && styles.secondary,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.actionText, secondary && styles.secondaryText]}>
        {title}
      </Text>
    </Pressable>
  );
}
export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  page: { padding: 24, paddingBottom: 48, flexGrow: 1 },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 52,
  },
  brand: {
    color: palette.text,
    letterSpacing: 3,
    fontSize: 12,
    fontWeight: '900',
  },
  back: { color: palette.muted, fontSize: 16, padding: 8 },
  eyebrow: {
    color: palette.accent,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '800',
    marginBottom: 12,
  },
  title: {
    color: palette.text,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '800',
    marginBottom: 16,
  },
  body: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 24,
  },
  card: {
    backgroundColor: palette.panel,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 22,
    padding: 22,
    marginBottom: 14,
  },
  cardTitle: {
    color: palette.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  detail: { color: palette.muted, fontSize: 14, lineHeight: 22 },
  action: {
    backgroundColor: palette.accent,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 12,
    minHeight: 56,
  },
  actionText: { color: palette.background, fontSize: 16, fontWeight: '800' },
  secondary: {
    backgroundColor: palette.panel,
    borderWidth: 1,
    borderColor: palette.border,
  },
  secondaryText: { color: palette.text },
  pressed: { opacity: 0.72 },
  footer: {
    color: palette.muted,
    fontSize: 12,
    lineHeight: 20,
    marginTop: 'auto',
    paddingTop: 40,
  },
  placeholder: {
    minHeight: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
