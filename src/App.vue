<template>
  <div id="app">
    <new-game-widget></new-game-widget>
    <h2 class="tc">Latest Games</h2>
    <div v-for="game in games" :key="game.id">
      <game-widget v-bind:game="game"></game-widget>
    </div>
  </div>
</template>

<script>
import { EventBus } from './eventbus';
import GameWidget from './components/GameWidget';
import NewGameWidget from './components/NewGameWidget';

export default {
  name: 'app',
  components: {
    GameWidget,
    NewGameWidget,
  },
  data() {
    return {
      games: [],
    };
  },
  created() {
    // Listens for a "delete" button click and removes the game
    EventBus.$on('remove', (game) => {
      this.removeGame(game);
    });

    // Listens for a "new game" event
    EventBus.$on('newgame', (gameData) => {
      const game = this.generateGame(gameData);

      if (game) {
        this.games.push(game);
      }
    });
  },
  methods: {
    removeGame(game) {
      /**
       *  Loops through the array of games, and removes
       *  the game with the matching ID
       *  @param  {array} game the game to remove
       */
      this.games = this.games.map((theGame) => {
        if (theGame.id === game) {
          return false;
        }
        return theGame;
      }).filter(Boolean);
    },
    /**
     * Generates an ID for the new game and
     * appends it to the object
     *
     * @param  {object} gameData Scores/info for the new game
     * @return {object}          The new game
     */
    generateGame(gameData) {
      const newGame = gameData;
      newGame.id = this.games.length + 1;
      return newGame;
    },
  },
};
</script>

<style lang="scss">
  @import './src/scss/settings/colours';
  @import './src/scss/settings/font-sizes';
  @import './src/scss/settings/spacing';
  @import './src/scss/tools/mixin-font';
  @import './src/scss/trumps/text-align';

  @import './src/scss/elements/button';

  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    color: $grey-dark;
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    font-size: $base-font;
    font-weight: 300;
    line-height: 1.3;
  }

  h2 {
    @include fs(2);
    margin: 0;
  }

  body {
    background-color: $grey-light;
  }
</style>
