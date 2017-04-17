import Vue from 'vue';
import App from '@/App';
import { assert } from 'chai';

describe('App.vue', () => {
  it('should be initialised correctly', () => {
    const VM = new Vue(App);
    assert.typeOf(VM, 'object');
  });

  it('should remove a game', () => {
    const Instance = Vue.extend(App);
    const VM = new Instance();

    VM.$data.games = [{ id: 1 }, { id: 2 }];

    assert.lengthOf(VM.$data.games, 2);
    VM.removeGame(1);
    assert.lengthOf(VM.$data.games, 1);
  });
});
