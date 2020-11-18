import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/styles.css';
import PictureService from './picture-service';

function clearFields() {
  $('.showErrors').text("");
  //$('.showPicture').text(""); //to check
  $('.showDate').text("");
  
}


function getElements(picture) {
  if (picture.url) {
    $('.showDate').text(`The current date is ${picture.date}`);
    $('.showPicture').prepend(`<img id="picture" src="${picture.url}" />`);
   // <img src="https://apod.nasa.gov/apod/image/2011/DoubleCluster_Polanski_960.jpg">Our picture</img>
    
   // $('#theDiv').prepend('<img id="theImg" src="theImg.png" />')
  } else {
   $('.showErrors').text(`There was an error: ${picture}`);
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
});