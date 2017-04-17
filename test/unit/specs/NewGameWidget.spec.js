import Vue from 'vue';
import NewGameWidget from '@/components/NewGameWidget';
import { assert } from 'chai';

describe('NewGameWidget.vue', () => {
  it('should be initialised correctly', () => {
    const VM = new Vue(NewGameWidget);
    assert.typeOf(VM, 'object');
  });

  it('should add two players to the "players" object', () => {
    const VM = new Vue(NewGameWidget);

    VM.$data.p1 = 'Lee Davies';
    VM.$data.p2 = 'Davies Lee';
    VM.newGame();

    assert.equal(VM.$data.p1, 'Lee Davies');
    assert.equal(VM.$data.p2, 'Davies Lee');
  });

  describe('Generating scores for a set', () => {
    it('should return an array', () => {
      const VM = new Vue(NewGameWidget);
      const scores = VM.generateSet();
      assert.isArray(scores);
    });

    it('should add at least five sets to the array', () => {
      const VM = new Vue(NewGameWidget);
      const scores = VM.generateSet();
      assert.isArray(scores);
      assert.isAtLeast(scores.length, 2, 'at least two sets have been played to determine the winner');
      assert.isAtMost(scores.length, 5);
    });

    it('should generate two scores between 0 and 11', () => {
      const VM = new Vue(NewGameWidget);
      const scores = VM.generateSetScores();

      assert.isObject(scores);
      assert.isAtLeast(scores.p1, 0);
      assert.isAtLeast(scores.p2, 0);
      assert.isAtMost(scores.p1, 11);
      assert.isAtMost(scores.p2, 11);
    });

    it('should check the scores for a 2 point lead', () => {
      const VM = new Vue(NewGameWidget);
      const game = VM.checkSetScores({ p1: 0, p2: 0 });
      assert.isAbove(game.p1, 0);
      assert.isAbove(game.p2, 0);

      const p1Diff = game.p1 - game.p2;
      const p2Diff = game.p2 - game.p1;

      if (p1Diff > p2Diff) {
        assert.isAtLeast(p1Diff, 2);
      } else {
        assert.isAtLeast(p2Diff, 2);
      }
    });
  });

  it('should count the scores from sets', () => {
    const VM = new Vue(NewGameWidget);

    let game = VM.countWins([
          { p1: 11, p2: 5 },
          { p1: 11, p2: 5 },
          { p1: 5, p2: 11 },
    ]);
    assert.equal(game.p1, 2);
    assert.equal(game.p2, 1);

    game = VM.countWins([
          { p1: 11, p2: 5 },
          { p1: 11, p2: 5 },
          { p1: 5, p2: 1 },
          { p1: 11, p2: 0 },
          { p1: 9, p2: 11 },
    ]);
    assert.equal(game.p1, 4);
    assert.equal(game.p2, 1);
  });
});
