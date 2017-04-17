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
