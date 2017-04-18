<template>
  <div class="game__info"  v-bind:class="classPosition">
    <h3 class="game__info_h3 game__info_h3-player">{{ player.name }}</h3>
    <h3 class="game__info_h3 game__info_h3-score">{{ score }}</h3>
  </div>
</template>

<script>
export default {
  name: 'game-info',
  props: ['player', 'score', 'position'],
  computed: {
    // Applies the relevant classes when
    // certain prop values are matched
    classPosition() {
      return {
        'game__info-left': this.position === 'left',
        'game__info-right': this.position === 'right',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './src/scss/settings/colours';
  @import './src/scss/settings/spacing';
  @import './src/scss/tools/mixin-font';
  @import './src/scss/tools/mixin-media-queries';
  @import './src/scss/tools/mixin-vertical-align';
  @import './src/scss/tools/placeholder-button-size';

  .game__info {
    display: flex;
    justify-content: center;
    width: 100%;

    @include tablet {
      width: auto;
    }

    &-left {
      order: 3;

      @include tablet {
        order: 2;

        .game__info_h3-score {
          &::after {
            content: '-';
            margin: 0 $base-space / 2;
          }
        }
      }
    }

    &-right {
      order: 4;

      @include tablet {
        order: 3;

        .game__info_h3-score {
          order: 1;
        }

        .game__info_h3-player {
          order: 2;
        }
      }
    }
  }

  .game__info_h3 {
    @include fs(0);

    margin: 0;

    &.game__info_h3-score {
      font-family: 'Lora', serif;
      font-weight: 400;

      @include mobile-only {
        margin: 0 $base-space / 2;
      }
    }

    &-player {
      margin: 0 $base-space / 2;
    }
  }
</style>
