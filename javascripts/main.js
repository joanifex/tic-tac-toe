$(document).ready(function(){
  // TODO: refactor into board object and player objects
  var winningCombinations = [
    [1,2,3], [4,5,6], [7,8,9], // horizontals
    [1,4,7], [2,5,8], [3,6,9], // verticals
    [1,5,9], [3,5,7]           // diagonals
  ];
  var playerChoices = [],
      computerChoices = [];

  var $display = $('.display');

  function computerRound(){
    computerTurn();
    // TODO: refactor has_won to be with player object
    if (has_won(computerChoices)){
      computerWin();
    }
    if ( is_tie() ){
      tie();
      reset();
    }
  }

  function computerTurn(){
    // TODO: refactor selection function
    if ( $('.box-5').hasClass('box-open') ){
      $('.box-5').html('<p class="text">o</p>');
      $('.box-5').removeClass('box-open');
      $('.box-5').addClass('box-closed');
      computerChoices.push($('.box-5').data('boxNumber'));
    } else {
      var random = Math.floor( Math.random() * $(".box-open").length);
      var $button = $(".box-open").eq(random);
      $button.html('<p class="text">o</p>');
      $button.removeClass('box-open');
      $button.addClass('box-closed');
      computerChoices.push($button.data('boxNumber'));
    }
  };

  function has_won(choices){
    if ( choices.length >= 3 ) {
      return winningCombinations.some(function(combination){
        return combination.every(function(number){
          return choices.indexOf(number) > - 1;
        });
      });
    } else {
      return false;
    }
  };

  function is_tie(){
    if ( $('.box-open').length === 0 ){
      return true
    } else {
      return false
    }
  };

  // TODO: refactor into board functions

  function computerWin(){
    $display.html('Computer Wins');
    reset();
  };
  function playerWin(){
    $display.html('Player Wins');
    reset();
  };
  function tie(){
    $display.html('Tie');
    reset();
  };

  function reset(){
    playerChoices = [];
    computerChoices = [];
    $('.btn').html('')
  }

  $('.btn').each(function( index ){
    $(this).data('boxNumber', index + 1);
  });

  $('.btn').on('click', function(){
    if ( $(this).hasClass('box-open') ){
      $(this).html('<p class="text">x</p>');
      $(this).removeClass('box-open');
      $(this).addClass('box-closed');
      playerChoices.push($(this).data('boxNumber'));
      if ( has_won(playerChoices)){
        playerWin();
      }
      else if ( is_tie() ){
        tie();
        reset();
      }
      else {
        computerRound();
      }
    }
  });
});
