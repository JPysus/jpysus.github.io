function ajaxCall_steamMiniprofile(){
  $.ajax({
    type: 'GET',
    dataType: 'html',
    url: 'https://steamcommunity.com/miniprofile/235021538',
    crossDomain: true,
    headers:{
      "access-control-allow-origin": "*",
    },
    xhrFields: {
      withCredentials: false,
    },
  })
  .done(function (data) {
    $("#steam_miniprofile").html(DOMPurify.sanitize(data))
    console.log()
    $('#steam_btn').attr('class', 'steam-status col-2')
    if($('#steam_miniprofile span.friend_status_online').html()) 
      $('#steam_btn').addClass('online')
    else if($('#steam_miniprofile span.game_state').html()) 
      $('#steam_btn').addClass('gaming')
    else if($('#steam_miniprofile span.friend_status_offline').html())
      $('#steam_btn').addClass('offline')

      $('#steam_btn img').attr('src', $('#steam_miniprofile .playersection_avatar img').attr('src'))
      $('#steam_btn p').text($('#steam_miniprofile span.persona').html())
  })
  .fail(function (xhr, textStatus, errorThrown) {
    $("#steam_miniprofile").html("")
  });
}
$(document).ready(function(){
  ajaxCall_steamMiniprofile()
  $("#steam_btn a.btn")
    .on("mouseenter",function(){$("#steam_miniprofile").fadeIn( "fast" );})
    .on("mouseleave",function(){$("#steam_miniprofile").fadeOut( "fast" );})

})
