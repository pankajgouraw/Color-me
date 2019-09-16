  $(function() {

  let index = 0;
  let getColor;


  $("#activityText").text(header);
  $("#activityText").css({'color':headerColor});
  $("#fillTheBlank").css({'color':fillTheBlanksColor});
  // $('.wrapper').css({'outline':borderColor});
  $('body').css({'background':bgColor});
  $('#LetterText').text(alphabate);

  // url value
  let url = window.location.href;
  if(url.indexOf('?') > 0){
    let params = new URLSearchParams(url.substring(1));
    index = parseInt(params.get('qno'));
    console.log("url variable available....");
  }else{
    console.log("url variable not available...");
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
  fillColor(this)
})

function fillColor(fill){
   let matchColor = $(fill).attr('data-color');
   // console.log('img color data id ' + matchColor);

   if( matchColor == getColor ){
      $(fill).hide();
      $(fill).next('.colored').show();
   }

}
//end fill the color


$('.colored').click(function(){
  $(this).hide();
  $(this).prev('.transparent').show();
})


 //  $('#tryAgain').click(function(){
 //       location.reload();
 //  })

$('#next').click(function(){
    index++;
    let url2 = window.location.pathname;
    var newurl = url2 + `?data=all&qno=${index}`;
      window.location.href = newurl;
  });


  $('#prev').click(function(){
    console.log("i am the prev one...");
    index--;
    let url2 = window.location.pathname;
    var newurl = url2 + `?data=all&qno=${index}`;
    window.location.href = newurl;
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

});