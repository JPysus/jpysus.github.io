function ajaxCall_steamBtn(){
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://transpose.pythonanywhere.com/_steam_GetPlayerSummaries',
    crossDomain: true,
    xhrFields: {
      withCredentials: false,
    },
  })
  .done(function (data) {
    
    $('#steam_btn').attr('class', 'steam-status col-2')
    if(data.gameid === undefined && data.personastate !== 0) 
      $('#steam_btn').addClass('online')
    else if(data.gameid !== undefined) 
      $('#steam_btn').addClass('gaming')
    else 
      $('#steam_btn').addClass('offline')

    if([3, 4, 5].includes(data.personastate))
      $('#steam_btn').addClass('away')


      $('#steam_btn img').attr('src', data.avatar)
      $('#steam_btn p').text(data.personaname)
  })
  .fail(function (xhr, textStatus, errorThrown) {
  });
}
function ajaxCall_steamMiniprofile(){
  $.ajax({
    type: 'GET',
    dataType: 'html',
    url: 'https://transpose.pythonanywhere.com/_steam_GetMiniProfile',
    crossDomain: true,
    xhrFields: {
      withCredentials: false,
    },
  })
  .done(function (data) {
    $("#steam_miniprofile").html(DOMPurify.sanitize(data))
  })
  .fail(function (xhr, textStatus, errorThrown) {
    $("#steam_miniprofile").html("")
  });
}
$(document).ready(function(){
  ajaxCall_steamBtn()
  ajaxCall_steamMiniprofile()
  $("#steam_btn a.btn")
    .on("mouseenter",function(){$("#steam_miniprofile").fadeIn( "fast" );})
    .on("mouseleave",function(){$("#steam_miniprofile").fadeOut( "fast" );})
  setInterval(function(){ ajaxCall_steamBtn(); ajaxCall_steamMiniprofile()}, 10000);

})
