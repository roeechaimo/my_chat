$(function() {
  var socket = io();
  var d = new Date();
  var gongLocation = '../audio/chinese-gong-daniel_simon.mp3';

  $('#send-massage').on('click', function() {
    if ($('#massage-to-send').val() !== '') {
      socket.emit('chat message', $('#massage-to-send').val());
      $('#massage-to-send').val('');
      return false;
    } else {
      return false;
    }
  });

  $('#bell').on('click', function() {
    socket.emit('ring bell', gongLocation);
    return false;
  });

  socket.on('chat message', function(msg) {
    var message = JSON.parse(msg);
    var timeOfMassage = massageTime();
    $('.massages-container').append($('<p>').text(timeOfMassage + ': ').addClass('date-class'));
    $('.massages-container').append($('<p>').text(message.text).css('color', '#' + message.color));
    $('.massages-container').animate({
      scrollTop: $('.massages-container').prop("scrollHeight")
    }, 500);
  });

  socket.on('ring bell', function(fileLocation) {
    var audio = new Audio(fileLocation);
    audio.play();
  });

  function massageTime() {
    var dateStr = d.toDateString();
    var timeStr = d.toTimeString();
    return dateStr + ', ' + timeStr;
  }


});
