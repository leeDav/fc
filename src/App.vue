<template>
  <div id="app">
    <h2 class="tc">Latest Games</h2>
    <div v-for="game in games" :key="game.id">
      <game-widget v-bind:game="game"></game-widget>
    </div>
  </div>
</template>

<script>
import { EventBus } from './eventbus';
import GameWidget from './components/GameWidget';

export default {
  name: 'app',
  components: {
    GameWidget,
  },
  created() {
    EventBus.$on('remove', (game) => {
      this.removeGame(game);
    });
  },
  methods: {
    removeGame(gameID) {
      this.games = this.games.map((game) => {
        if (game.id === gameID) {
          return false;
        }
        return game;
      }).filter(Boolean);
    },
  },
  data() {
    return {
      // Mock game data
      games: [
        {
          id: 1,
          players: {
            p1: {
              name: 'Kerge Kotzher',
              photo: 'http://placebeard.it/60/60/notag?1',
              winner: true,
            },
            p2: {
              name: 'Emily M. Mills',
              photo: 'http://placebeard.it/60/60/notag?2',
              winner: false,
            },
          },
          scores: {
            p1: 4,
            p2: 2,
          },
          games: [
            { p1: 11, p2: 7 },
            { p1: 11, p2: 9 },
            { p1: 11, p2: 3 },
            { p1: 9, p2: 11 },
            { p1: 7, p2: 11 },
            { p1: 11, p2: 8 },
          ],
        },
        {
          id: 2,
          players: {
            p1: {
              name: 'Lee Davies',
              photo: 'http://placebeard.it/60/60/notag?3',
              winner: true,
            },
            p2: {
              name: 'Louis Martin',
              photo: 'http://placebeard.it/60/60/notag?4',
              winner: true,
            },
          },
          scores: {
            p1: 3,
            p2: 3,
          },
          games: [
            { p1: 7, p2: 11 },
            { p1: 11, p2: 9 },
            { p1: 11, p2: 3 },
            { p1: 9, p2: 11 },
            { p1: 7, p2: 11 },
            { p1: 11, p2: 8 },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
  @import './src/scss/settings/colours';
  @import './src/scss/trumps/text-align';

  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    color: $grey-dark;
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.3;
  }

  body {
    background-color: $grey-light;
  }
</style>
