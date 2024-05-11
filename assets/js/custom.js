/*
  carousel
  left key, previous image
  right key, next image
*/
$(document).bind('keyup', function(e) {
    if(e.which == 39){
        $('.carousel').carousel('next');
    }
    else if(e.which == 37){
        $('.carousel').carousel('prev');
    }
});
const steam_url = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=6D52E58F3B901C0A25B2D5C77A3C59EF&steamids=76561198195287266'

$.getJSON(steam_url, function(data) {
    console.log(data)// JSON result in `data` variable
});
$(document).ready(function(){
  /*Navbar Scroll*/
  // Add smooth scrolling to all links buttons
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 0, function(){
        window.location.hash = hash;
      });
    }
  });

  /*
  card_cert list
  <script src="assets/json/cert_list.json"></script>
  */
  var htmldata = ""
    for (var i = 0; i < cert_list.length; i++) {
      htmldata += `
                <div class="col">
                  <div class="card card_cert btn">
                    <img value="`+i+`"src="./assets/images/certs/`+cert_list[i]['src']+`" class="rounded-start p-3" alt="`+cert_list[i]['alt']+`">
                    <div class="card-body">
                      <h5 class="card-title text-center">`+cert_list[i]['alt']+`</h5>
                    </div>  
                  </div>
                </div>
      `
    }
  $('#cert_container').append(htmldata)
  
  /*
  skill_cards
  <script src="assets/json/generated_filenames.json"></script>
  */
  var htmldata = ""
  for (var i = 0; i < data.length; i++) {
    htmldata += `
              <div class="col">
                <div class="skill_div p-3">
                  <img class="skill_img d-block pb-3" src="assets/images/icons/`+escape(data[i])+`"/>
                  <h4 class="skill_name">`+data[i].substr(0, data[i].length - 4).replace('_', ' ')+`</h4>
                </div>
              </div>
    `
  }
  $('#skill_cards').append(htmldata)

  /*
  card_cert on click, show modal
  */
  $('.card_cert').on('click', function(event){
    var indicator = ""
    var inner = ""
    let index = $(this).find('img').attr('value')

    indicator += `<button type="button" data-bs-target="#modal_car" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>\n\n`
    inner += `
      <div class="carousel-item active">
        <img src="./assets/images/certs/`+cert_list[index]['src']+`" class="w-100" alt="`+cert_list[index]['alt']+`">
        <div class="carousel-caption position-static pb-0">
          <h5>`+cert_list[index]['hed']+`</h5>
          <p>`+cert_list[index]['add']+`</p>
        </div>
      </div>
    `
    $('.car_cont').hide()

    //if theres more, show previous and next and others on list
    if(cert_list[index].hasOwnProperty('mor') && Array.isArray(cert_list[index]['mor'])) {
      for(var i=0; i < cert_list[index]['mor'].length; i++){

        indicator += `<button type="button" data-bs-target="#modal_car" data-bs-slide-to="`+(i+1)+`"aria-label="Slide `+(i+2)+`"></button>\n\n`
        inner += `
      <div class="carousel-item">
        <img src="./assets/images/certs/`+cert_list[index]['mor'][i]['src']+`" class="w-100" alt="`+cert_list[index]['mor'][i]['hed']+`">
        <div class="carousel-caption position-static pb-0">
          <h5>`+cert_list[index]['mor'][i]['hed']+`</h5>
          <p>`+cert_list[index]['mor'][i]['add']+`</p>
        </div>
      </div>
        `

      }
      $('.car_cont').show()
    }

    $('.carousel-inner').html(inner)
    $('.carousel-indicators').html(indicator)

    $('#modal').modal('show')
  })
});
