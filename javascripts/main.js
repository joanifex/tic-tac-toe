$(document).ready(function(){

  var winningCombinations = [
    [1,2,3], [4,5,6], [7,8,9], // horizontals
    [1,4,7], [2,5,8], [3,6,9], // verticals
    [1,5,9], [3,5,7]           // diagonals
  ];

  var playerChoices = [];
  var computerChoices = [];

  function computerTurn(){};

  function win(choices){
    if ( choices.length >= 3 ) {
      return winningCombinations.some(function(combination){
        return combination.every(function(number){
          return playerChoices.indexOf(number) > (-1);
        });
      });
    } else {
      return false;
    }
  };

  $('.btn').each(function( index ){
    $(this).data('boxNumber', index + 1);
  });

  $('.btn').on('click', function(){
    if ( $(this).hasClass('box-open') ){
      $(this).html('<p class="text">x</p>');
      $(this).removeClass('box-open');
      $(this).addClass('box-closed');
      playerChoices.push($(this).data('boxNumber'));
      if ( win(playerChoices)){
        alert('win');
      }
    }
    computerTurn();
  });
});
