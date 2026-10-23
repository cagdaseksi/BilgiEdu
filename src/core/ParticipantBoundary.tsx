import React, { Component, type ReactNode } from 'react';
import { Text } from 'react-native';
import { Action, Page, styles } from '../shared/ui';
export class ParticipantBoundary extends Component<
  {
    children: ReactNode;
    onExit: () => void;
  },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) {
      return this.props.children;
    }
    return (
      <Page title="Bir hata olustu" eyebrow="OYUN" onBack={this.props.onExit}>
        <Text style={styles.body}>
          Bu oyun acilamadi. Katilimci listesine donup baska bir oyun
          secebilirsin.
        </Text>
        <Action title="Katilimcilara don" onPress={this.props.onExit} />
      </Page>
    );
  }
}
