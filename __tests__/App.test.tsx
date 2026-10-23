import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import { ParticipantList } from '../src/core/ParticipantList';
import Screen from '../src/participants/cagdas/Screen';

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return { SafeAreaProvider: View, SafeAreaView: View };
});

test('opens a participant and level, then unmounts the game on return to the list', async () => {
  let tree!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<App />);
  });
  await ReactTestRenderer.act(() =>
    tree.root.findByType(ParticipantList).props.onSelect('cagdas'),
  );
  expect(tree.root.findByType(Screen).props.screen).toBe('home');
  await ReactTestRenderer.act(() =>
    tree.root.findByType(Screen).props.onOpenLevels(),
  );
  expect(tree.root.findByType(Screen).props.screen).toBe('levels');
  await ReactTestRenderer.act(() =>
    tree.root.findByType(Screen).props.onPlayLevel(2),
  );
  expect(tree.root.findByType(Screen).props.screen).toBe('game');
  expect(tree.root.findByType(Screen).props.level).toBe(2);
  await ReactTestRenderer.act(() =>
    tree.root.findByType(Screen).props.onBack(),
  );
  expect(tree.root.findByType(Screen).props.screen).toBe('levels');
  await ReactTestRenderer.act(() =>
    tree.root.findByType(Screen).props.onExit(),
  );
  expect(tree.root.findAllByType(Screen)).toHaveLength(0);
  expect(tree.root.findAllByType(ParticipantList)).toHaveLength(1);
  await ReactTestRenderer.act(() => tree.unmount());
});
