import Vue from 'vue';
import App from '@/components/PlayerDropdown';
import { assert } from 'chai';

describe('App.vue', () => {
  it('should be initialised correctly', () => {
    const VM = new Vue(App);
    assert.equal(VM.$data.peep, '');
  });
});
