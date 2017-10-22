$(function() {
  var socket = io();
  var d = new Date();

  $('#send-massage').on('click', function() {
    socket.emit('chat message', $('#massage-to-send').val());
    $('#massage-to-send').val('');
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

  function massageTime() {
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var hour = d.getUTCHours();
    var minute = d.getMinutes();
    var dateStr = d.toDateString();
    var timeStr = d.toTimeString();
    return dateStr + ', ' + timeStr;
  }
});
