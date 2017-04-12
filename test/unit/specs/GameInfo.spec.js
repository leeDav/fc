import Vue from 'vue';
import GameInfo from '@/components/GameInfo';
import { assert } from 'chai';

describe('GameInfo.vue', () => {
  it('should be initialised correctly', () => {
    const VM = new Vue(GameInfo);
    assert.typeOf(VM, 'object');
  });

  it('should apply the LEFT class when a prop is passed', () => {
    const Instance = Vue.extend(GameInfo);
    const VM = new Instance({
      propsData: {
        player: '',
        score: 0,
        position: 'left',
      },
    });

    assert.isTrue(VM.classPosition['game__info-left']);
    assert.isFalse(VM.classPosition['game__info-right']);
  });

  it('should apply the RIGHT class when a prop is passed', () => {
    const Instance = Vue.extend(GameInfo);
    const VM = new Instance({
      propsData: {
        player: '',
        score: 0,
        position: 'right',
      },
    });

    assert.isTrue(VM.classPosition['game__info-right']);
    assert.isFalse(VM.classPosition['game__info-left']);
  });
});
