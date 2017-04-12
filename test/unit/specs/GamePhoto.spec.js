import Vue from 'vue';
import GamePhoto from '@/components/GamePhoto';
import { assert } from 'chai';

describe('GamePhoto.vue', () => {
  it('should be initialised correctly', () => {
    const VM = new Vue(GamePhoto);
    assert.typeOf(VM, 'object');
  });

  it('should apply the LEFT class when a prop is passed', () => {
    const Instance = Vue.extend(GamePhoto);
    const VM = new Instance({
      propsData: {
        player: '',
        position: 'left',
      },
    });

    assert.isTrue(VM.classPosition['game__photo_container-left']);
    assert.isFalse(VM.classPosition['game__photo_container-right']);
  });

  it('should apply the RIGHT class when a prop is passed', () => {
    const Instance = Vue.extend(GamePhoto);
    const VM = new Instance({
      propsData: {
        player: '',
        position: 'right',
      },
    });

    assert.isTrue(VM.classPosition['game__photo_container-right']);
    assert.isFalse(VM.classPosition['game__photo_container-left']);
  });
});
