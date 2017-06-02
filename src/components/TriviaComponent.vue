<template lang="html">
    <div class="container" id="triviaBox">
      <div class="page-header">
        <h1>IPL Trivia</h1>
      </div>
      <div class="panel-group">
        <div class="row">
          <div class="col-md-6">
            <div class="panel panel-primary">
              <div class="panel-heading">
                <center>Interesting Facts</center>
              </div>
              <div class="panel-body">
                <ul style="">
                  <li>Maximum runs scored in a Super Over: <span style="font-weight: bold">{{trivia.superOverMaxRuns}}</span></li>
                  <li>Team with most wins in all Seasons: <span style="font-weight: bold">{{trivia.mostVictoriousTeam}}</span></li>
                  <li>Number of matches with super overs in all seasons: <span style="font-weight: bold">{{trivia.superOverMatchCount}}</span></li>
                  <li>Most played at Venue: <span style="font-weight: bold">{{trivia.mostPlayedAtVenue}}</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="panel panel-primary">
              <div class="panel-heading">
                <center>Top Performers</center>
              </div>
              <div class="panel-body">
                <ul style="">
                  <li>Player with maximum "Player of the Match awards": <span style="font-weight: bold">{{trivia.mostConsistentPlayerOfMatch.name}} ({{trivia.mostConsistentPlayerOfMatch.val}})</span></li>
                  <li>Player with most catches: <span style="font-weight: bold">{{trivia.maxCatchesPlayer.name}} ({{trivia.maxCatchesPlayer.val}})</span></li>
                  <li>Fielder with most runouts: <span style="font-weight: bold">{{trivia.maxRunoutsPlayer.name}} ({{trivia.maxRunoutsPlayer.val}})</span></li>
                  <li>Player with most runs: <span style="font-weight: bold">{{trivia.maxRunsPlayer.name}} ({{trivia.maxRunsPlayer.val}})</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-primary">
              <div class="panel-heading">
                <center>Probabilities</center>
              </div>
              <div class="panel-body">
                <ul style="">
                  <li>Winning Probability of the team that won the toss and chose to bat: <span style="font-weight: bold">{{trivia.tossBattingWinProb}}</span></li>
                  <li>Winning Probability of the team that won the toss and chose to field: <span style="font-weight: bold">{{trivia.tossFieldingWinProb}}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  computed: {
    trivia: function () {
      return this.$Store.getters.triviaGetter
    }
  }
}
</script>

<style lang="css">
#triviaBox {
  margin-top: 50px;
}

.panel {
  margin-top: 15px;
}
</style>
