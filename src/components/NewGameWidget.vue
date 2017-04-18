<template>
  <section class="newgame tc">
    <h2 class="tc">Add Game</h2>

    <div>
      <player-dropdown :players="players" player="p1" v-model="p1"></player-dropdown>
      vs.
      <player-dropdown :players="players" player="p2" v-model="p2"></player-dropdown>
    </div>

    <button class="btn btn-positive" v-on:click="newGame" v-bind:disabled="isDisabled">Add game</button>
  </section>
</template>

<script>
  import { EventBus } from '../eventbus';
  import PlayerDropdown from './PlayerDropdown';

  export default {
    name: 'new-game-widget',
    components: {
      PlayerDropdown,
    },
    computed: {
      // Disables the button if no player
      // (or same players) are selected
      isDisabled() {
        return (this.p1 === this.p2) || (this.p1 === '' || this.p2 === '');
      },
    },
    created() {
      // When this component is rendered, create two
      // games with mock data
      this.p1 = 'Lee Davies';
      this.p2 = 'Marc Zee';
      this.newGame();
      this.p1 = 'Niclas Anders';
      this.p2 = 'Louis Martin';
      this.newGame();
      // Then set the names back to default
      this.p1 = '';
      this.p2 = '';
    },
    data() {
      return {
        p1: '',
        p2: '',
        // Mock player data
        players: [
          { name: 'Emily M. Mills' },
          { name: 'Kerge Kotzher' },
          { name: 'Lee Davies' },
          { name: 'Louis Martin' },
          { name: 'Marc Zee' },
          { name: 'Niclas Anders' },
        ],
      };
    },
    methods: {
      /**
       * Creates an object of mocked game data
       * Random number at the end of placebeard.it links
       * to bust cache, ensuring a different image each time
       *
       * @return {object}  Completed object of game data
       */
      newGame() {
        // Build up game object
        const theGames = this.generateSet();
        const wins = this.countWins(theGames);
        const newGame = {
          players: {
            p1: {
              name: this.p1,
              photo: `http://placebeard.it/60/60/notag?${Math.floor(Math.random() * 10000)}`,
              winner: (wins.p1 > wins.p2),
            },
            p2: {
              name: this.p2,
              photo: `http://placebeard.it/60/60/notag?${Math.floor(Math.random() * 10000)}`,
              winner: (wins.p2 > wins.p1),
            },
          },
          games: theGames,
          scores: wins,
        };
        EventBus.$emit('newgame', newGame);
        return newGame;
      },
      /**
       * Generates a new object for scores
       * TODO: Tidy this up. I don't like these IFs.
       *
       * @return {array}  Array of set scores
       */
      generateSet() {
        const scores = [];
        const wins = { p1: 0, p2: 0 };

        for (let i = 0; i < 5; i += 1) {
          const genScores = this.checkSetScores((this.generateSetScores()));

          if (genScores.p1 > genScores.p2) {
            wins.p1 += 1;
          } else {
            wins.p2 += 1;
          }

          if (wins.p1 > 2 && wins.p2 < 2) {
            break;
          } else if (wins.p2 > 2 && wins.p1 < 2) {
            break;
          }
          scores.push(genScores);
        }

        return scores;
      },
      /**
       * Starts a new set by defaulting scores to zero
       *
       * @return {object}  Player scores
       */
      generateSetScores() {
        // We could generate random scores with
        // Math.floor(Math.random() * 11)
        // but we'd still have to do the following checks anyway
        const p1Score = 0;
        const p2Score = 0;

        return {
          p1: p1Score,
          p2: p2Score,
        };
      },
      /**
       * Checks to see if there's a clear victor with
       * a 2 point lead, returns the score if there is
       * otherwise calls itself again after calling
       * incrementRandomPlayer()
       *
       * @param  {object} score   Contains the player scores
       * @return {object} mixed   Either new scores, or incremented scores
       */
      checkSetScores(score) {
        const p1Diff = score.p1 - score.p2;
        const p2Diff = score.p2 - score.p1;

        // test to see if there's a clear victor
        // with a two point lead
        if (score.p1 >= 11 && p1Diff >= 2) {
          return score;
        } else if (score.p2 >= 11 && p2Diff >= 2) {
          return score;
        }

        // Else if there's no clear victor, let's
        // increment a random players score until there is
        const newScores = this.incrementRandomPlayer(score.p1, score.p2);
        return this.checkSetScores(newScores);
      },
      /**
       * Used to increment a random players set score
       *
       * @param  {integer} p1Score Player 1's score
       * @param  {integer} p2Score Player 2's score
       * @return {object}          The new, incremented scores
       */
      incrementRandomPlayer(p1Score, p2Score) {
        const playerToBump = Math.floor((Math.random() * 2) + 1);
        const newScores = { p1: p1Score, p2: p2Score };

        if (playerToBump === 1) {
          newScores.p1 += 1;
        } else {
          newScores.p2 += 1;
        }

        return newScores;
      },
      /**
       * Loops through an array of scores to determine
       * the overall winner
       *
       * @param  {array} scores The scores for a set
       * @return {object}       Count of the scores
       */
      countWins(scores) {
        const wins = { p1: 0, p2: 0 };

        for (let i = 0; i < scores.length; i += 1) {
          if (scores[i].p1 > scores[i].p2) {
            wins.p1 += 1;
          } else if (scores[i].p2 > scores[i].p1) {
            wins.p2 += 1;
          }
        }

        return wins;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './src/scss/settings/colours';
  @import './src/scss/settings/spacing';

  .newgame {
    background-color: $white;
    margin: $base-space;
    padding: $base-space;

    > div {
      margin: $base-space 0;
    }
  }
</style>
