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
      changed(player) {
        this.$emit('input', player);
      },
    },
  };
</script>
