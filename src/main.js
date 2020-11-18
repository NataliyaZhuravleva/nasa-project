import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/styles.css';
import PictureService from './picture-service';
import MarsRoverPhoto from './mars-rover-photos';
import MarsTemp from './mars-temp'

function clearFields() {
  $('.showErrors1').text("");
  $('.showErrors2').text("");
  $('.showDate').text("");
  
}

function getMarsElements(marsPicture){
  if (marsPicture.photos[0].img_src)  {
    $('.showMarsPicture').prepend(`<img id="marsPicture" src="${marsPicture.photos[0].img_src}" />`);
  } else {
    $('.showErrors2').text(`There was an error: ${marsPicture.photos[0]}`);
  }
}


function getElements(picture) {
  if (picture.url) {
    $('.showDate').text(`The current date is ${picture.date}`);
    $('.showPicture').prepend(`<img id="picture" src="${picture.url}" />`);
   
  } else {
   $('.showErrors1').text(`There was an error: ${picture}`);
  }
}

$(document).ready(function() {
  $('#picture').click(function() {
   
    clearFields();
    (async function() {
      const picture = await PictureService.getPicture();
      getElements(picture);
    })();  
  });

  $('#marsPicture').click(function() {
   
    clearFields();
    (async function() {
      const marsPicture = await MarsRoverPhoto.getMarsRoverPhoto();
      getMarsElements(marsPicture);
    })();  
  });

});