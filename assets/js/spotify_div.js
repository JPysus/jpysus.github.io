function ajaxCall_spotifyMiniprofile(){
  $.ajax({
    method: 'POST',
    url: 'https://transpose.pythonanywhere.com/_spotify_current_music',
    data: {refresh_token: 'AQAbAJygOyxJfcbRqFZYqbnxHNkSkTuLf1pXtTDwCYt_4dZAynhqd8k9esx0yxIS41PIRxR0HXa3zxlIDvi6SXLgoS7gzfgeNtGMmJRq5g9WrHrRUlfePDPbZaeJCvkgtNk'}
    // crossDomain: true,
    // xhrFields: {
    //   withCredentials: false,
    // },
  })
  .done(function (data) {
    if(!data.hasOwnProperty("error") && data["currently_playing_type"] != "ad"){
      check = data
      $('#spotify_div').attr('class', 'col-2 align-content-center')
      
      $("#spotify_miniprofile .song_title").html(data["item"]["name"])
      temp_str = Array.from(data["item"]["album"]["artists"], (x) => x["name"]).join(', ')
      $("#spotify_miniprofile .song_artists").html(temp_str)
      $("#spotify_miniprofile img").attr('src', data["item"]["album"]["images"][0]["url"])
    }
  })
  .fail(function (xhr, textStatus, errorThrown) {
    
  });
}

$(document).ready(function(){
  ajaxCall_spotifyMiniprofile()
  $("#spotify_div")
    .on("mouseenter",function(){$("#spotify_miniprofile").fadeIn( "fast" );})
    .on("mouseleave",function(){$("#spotify_miniprofile").fadeOut( "fast" );})
  setInterval(function(){ ajaxCall_steamBtn(); ajaxCall_spotifyMiniprofile()}, 10000);

})
