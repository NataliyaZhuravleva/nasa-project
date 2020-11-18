export default class MarsTemp {
  static async getMarsTemp() {
    try {
      const marsTemp = await fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`);
      if (!marsTemp.ok) {
        throw Error(marsTemp.statusText);
      }
      return marsTemp.json();
    } catch (error) {
      return error.message;
    }
  }
}