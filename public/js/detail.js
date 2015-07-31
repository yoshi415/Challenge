angular.module('challengeApp.detail', [])
.controller('DetailController', ['$scope','$location','$state','$stateParams', 'ChallengeFactory',
  function($scope,$location,$state,$stateParams,ChallengeFactory){
    $scope.challenge = $stateParams.itemId;
    $scope.getChallengeInfo = function(id) {
      ChallengeFactory.getChallengeInfo(id).then(function(res) {
        $scope.challengeData = res;

        $scope.winner = res.participants.filter(function(participant) { return participant.id === res.winner; })[0] || null;
        $scope.started = res.started;
        $scope.canUpvote = $scope.started === 'Started';
        $scope.complete = res.complete;
        $scope.isParticipant = res.participants.some(function(participant) { return participant.id === $scope.loginUser.id; });
        $scope.hasAccepted = res.participants.some(function(participant) { return participant.id === $scope.loginUser.id && participant.accepted; });
        $scope.players = res.participants;
      });
    };
    $scope.getChallengeInfo($stateParams.itemId);

  $scope.vote = function(player){
    if ($scope.loginUser.id === player.id) {
      return;
    }
    ChallengeFactory.upvoteUser($scope.challenge, player.id)
    .then(function () {
      $scope.getChallengeInfo($scope.challenge);
    });
    console.log(challengeData)
    
  };

  $scope.accept = function () {
    console.log('accept clicked!');
    ChallengeFactory.acceptChallenge($scope.challenge)
    .then(function () {
      $scope.getChallengeInfo($scope.challenge);
    });
    $scope.hasAccepted = true;
  };
  
  // $scope.showTimer = false;
  // $scope.toggleTimer = function() {
  //   $scope.showTimer = !$scope.showTimer;
  // }

}]);
