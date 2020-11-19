import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/styles.css';
import PictureService from './picture-service';
import MarsRoverPhoto from './mars-rover-photos';
import MarsTemp from './mars-temp';

function clearFields() {
  $('.showErrors1').text("");
  $('.showErrors2').text("");
  $('.showDate').text("");

}

function getMarsTemp(marsTemp) {
  console.log(marsTemp); //{696: {…}, 697: {…}, 698: {…}, 699: {…}, 700: {…}, 701: {…}, 703: {…}, sol_keys: Array(7), validity_checks: {…}}
  let marsTempArray = marsTemp.sol_keys;
  //["696", "697", "698", "699", "700", "701", "703"]

  for (let i = 0; i < marsTempArray.length; i++) { 
    if (marsTemp[marsTempArray[i]]) {//marsTempArray[0]=696 marsTemp[696].AT.av
      if ('AT' in marsTemp[marsTempArray[i]]) {
        console.log(marsTemp[marsTempArray[i]].AT.av);
        $('.showMarsTemp').append(`The temperature on Mars is: ${marsTemp[marsTempArray[i]].AT.av}`);
      }
    } else {
      $('.showErrors3').text(`There was an error: ${marsTemp[marsTempArray[i]]}`);
    }
  }
}

function getMarsElements(marsPicture) {
  if (marsPicture.photos[0].img_src) {
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

$(document).ready(function () {
  $('#marsTemp').click(function () {

    clearFields();
    (async function () {
      const marsTemp = await MarsTemp.getMarsTemp();
      getMarsTemp(marsTemp);
    })();
  });

  $('#picture').click(function () {

    clearFields();
    (async function () {
      const picture = await PictureService.getPicture();
      getElements(picture);
    })();
  });

  $('#marsPicture').click(function () {

    clearFields();
    (async function () {
      const marsPicture = await MarsRoverPhoto.getMarsRoverPhoto();
      getMarsElements(marsPicture);
    })();
  });
});