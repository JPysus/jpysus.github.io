const steam_url = 'https://transpose.pythonanywhere.com/_steam_GetPlayerSummaries'
$(document).ready(function(){
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: steam_url,
    crossDomain: true,
    xhrFields: {
      withCredentials: false,
    },
  })
  .done(function (data) {
    
    $('#steam_btn').attr('class', 'fixed-top steam-status')
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
      $('#steam_btn').addClass('offline')
  });
})