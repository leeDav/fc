<template>
  <select
    v-bind:name="player"
    v-model="peep"
    v-on:change="changed($event.target.value)">
    <option disabled value="">Find a player...</option>
    <option v-for="p in players" :value="p.name">
      {{ p.name }}
    </option>
  </select>
</template>

<script>
  export default {
    name: 'player-dropdown',
    props: ['players', 'player'],
    data() {
      return {
        peep: '',
      };
    },
    methods: {
      /**
       * Triggers the change event when the
       * dropdown value has... changed
       *
       * @param  {string} player Players name
       */
      changed(player) {
        this.$emit('input', player);
      },
    },
  };
</script>
