  $(function() {

  let index = 0;
  let getColor;


  $("#activityText").text(header);
  $("#activityText").css({'color':headerColor});
  $("#fillTheBlank").css({'color':fillTheBlanksColor});
  // $('.wrapper').css({'outline':borderColor});
  $('body').css({'background':bgColor});
  // $('#LetterText').text(alphabate);

  // url value
  let url = window.location.href;
  if(url.indexOf('?') > 0){
    let params = new URLSearchParams(url.substring(1));
    index = parseInt(params.get('qno'));
    console.log("url variable available....");
  }else{
    console.log("url variable not available...");
  }


  // check all image color filled or not
  let count = 1;
  function checkColorFill(){
    let colored = $('.colored');
    count = 0;
    for(var i=0; i<colored.length; i++){
      if($(colored[i]).css('display') == 'block'){
        count++;
      }
    }
    console.log("count colored img " +count)
  }


  let questionHtml = '';
  let x ="";
  let color= '';
  // function to load the data
  function loadData(){

      let images = data[index];
 
      // console.log(data[index]);

      $.each(images,function(i,array){
        let x =`<div class="imgBox">
                       <p class='colorName' style='color:${images[i][2]}'>${images[i][2]}</p>
                       <img src="${images[i][0]}" class="transparent" data-color='${images[i][2]}'/>
                       <img src="${images[i][1]}" class="colored" />
                       </div>`; 
            let y = `<div class="fillColor shadow" id="${images[i][2]}"></div>`;
           questionHtml = questionHtml + x;
           color = color+y;

          $('.imageWrapper').html(questionHtml);
          $('.suggestionContainer').html(color);

      });

   
  }  // end function to load the data

  loadData();



 // choose the color  
  $('.fillColor').click(function(){
    chooseColor(this);
  })

  function chooseColor(choose){
     $('.fillColor').addClass('shadow');
     $(choose).removeClass('shadow');
     getColor = $(choose).attr('id');
     console.log(getColor);
  }
// end choose the color

// fill the color
$('.transparent').click(function(){
  fillColor(this);
  checkColorFill();


})

function fillColor(fill){
   let matchColor = $(fill).attr('data-color');
   if( matchColor == getColor ){
      $(fill).hide();
      $(fill).next('.colored').show();
      playAudio()
      $(fill).parent().css({'background-image':"url(img/gif2.gif)"});
   }

}
//end fill the color


$('.colored').click(function(){
  $(this).hide();
  $(this).prev('.transparent').show();
   $(this).parent().css({'background-image':"none"});
})


  $('#reset').click(function(){
       // location.reload();
       $('.transparent').show();
       $('.colored').hide();
       $('.fillColor').addClass('shadow');
      $('.imgBox').css({'background-image':"none"});

       getColor = '';
  })

$('#next').click(function(){
  if(count == 4){
      index++;
      let url2 = window.location.pathname;
      var newurl = url2 + `?data=all&qno=${index}`;
      window.location.href = newurl;
   }else{
    completeTask()
    console.log("Please complete task..")
   }
   
  });


  $('#prev').click(function(){
     if(count == 4){
    index--;
    let url2 = window.location.pathname;
    var newurl = url2 + `?data=all&qno=${index}`;
    window.location.href = newurl;
    }else{
      completeTask()
      console.log('please complete task..')
    }
  })

  if(index > 0){
    $('#prev').fadeIn();
    $('#next').fadeIn();
  }else{
     $('#prev').hide();
  }

  if(index == data.length-1){
    $('#next').hide();
  }


  function completeTask(){
    $('#completeTask').fadeIn();
    setTimeout(function(){
      $('#completeTask').fadeOut();
    },1000)
  }


  // function to play audio well done
  function playAudio(){
    let audio = new Audio(wellDone);
    audio.play();
  }




});