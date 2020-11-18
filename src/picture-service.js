export default class PictureService{
  static async getPicture(){
    try {
      const picture = await fetch (`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`);
  //    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
     if (!picture.ok){
       throw Error(picture.statusText);
     }
      return picture.json();
    } catch (error){
      return error.message;
    }
  }
}