<template>
  <article class="game">
    <header class="game__header">
      <game-photo v-bind:player="game.players.p1" position="left"></game-photo>

      <game-info v-bind:player="game.players.p1" v-bind:score="game.scores.p1" position="left"></game-info>
      <game-info v-bind:player="game.players.p1" v-bind:score="game.scores.p2" position="right"></game-info>

      <game-photo v-bind:player="game.players.p2" position="right"></game-photo>
    </header>

    <section>
      <ul class="game__scores">
        <li v-for="game in game.games">{{ game.p1 }}-{{ game.p2 }}</li>
      </ul>
    </section>

    <button class="btn__delete" v-on:click="remove">X</button>
  </article>
</template>

<script>
import { EventBus } from '../eventbus';
import GamePhoto from './GamePhoto';
import GameInfo from './GameInfo';

export default {
  name: 'game-widget',
  props: ['game'],
  components: { GamePhoto, GameInfo },
  methods: {
    remove() {
      EventBus.$emit('remove', this.game.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import './src/scss/settings/colours';
  @import './src/scss/settings/spacing';
  @import './src/scss/tools/mixin-media-queries';
  @import './src/scss/tools/mixin-vertical-align';
  @import './src/scss/tools/placeholder-button-size';

  .game {
    background-color: $white;
    margin: $base-space;
    padding: $base-space;
    position: relative;
    text-align: center;
  }

  .game__header {
    align-items: center;
    display: flex;
    justify-content: center;

    @include mobile-only {
      flex-wrap: wrap;
    }
  }

  .game__scores {
    list-style: none;
    margin: $base-space 0 0;
    padding: 0;

    @include tablet {
      margin: 0;
    }

    li {
      display: inline-block;

      &:not(:last-child) {
        &::after {
          content: '|';
          margin: 0 $base-space / 2;
        }
      }
    }
  }

  .btn__delete {
    @extend %button-size;
    @include vertical-align(absolute);

    border: 0;
    border-radius: 50%;
    cursor: pointer;
    right: $base-space;
  }
</style>
