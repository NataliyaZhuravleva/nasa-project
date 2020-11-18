export default class MarsRoverPhoto {
  static async getMarsRoverPhoto() {
    try {
      const marsPicture = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${process.env.API_KEY}`);
      if (!marsPicture.ok) {
        throw Error(marsPicture.statusText);
      }
      return marsPicture.json();
    } catch (error) {
      return error.message;
    }
  }
}

