<template>
  <div class="game__photo_container" v-bind:class="classPosition">
    <img
      v-bind:src="player.photo"
      v-bind:alt="player.name"
      v-bind:class="{ 'game__photo-winner': player.winner }"
      class="game__photo"/>
  </div>
</template>

<script>
export default {
  name: 'game-photo',
  props: ['player', 'position'],
  computed: {
    classPosition() {
      return {
        'game__photo_container-left': this.position === 'left',
        'game__photo_container-right': this.position === 'right',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './src/scss/settings/colours';
  @import './src/scss/settings/spacing';
  @import './src/scss/tools/mixin-media-queries';

  .game__photo_container {
    width: 50%;

    @include tablet {
      width: auto;
    }

    &-left {
      order: 1;
      text-align: right;

      @include tablet {
        order: 1;
      }
    }

    &-right {
      order: 2;
      text-align: left;

      @include tablet {
        order: 4;
      }
    }
  }

  $thumb_size: 30px;

  .game__photo {
    border: $thumb_size / 10 solid transparent;
    border-radius: 50%;
    height: $thumb_size;
    margin: 0 $base-space;
    width: $thumb_size;

    &-winner {
      border-color: $winner_colour;
    }
  }
</style>
