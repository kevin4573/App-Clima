import clearSkyDay from "../assets/icons/clear_sky_day.svg";
import clearSkyNight from "../assets/icons/clear_sky_night.svg";
import fewCloudsDay from "../assets/icons/few_clouds_day.svg";
import fewCloudsNight from "../assets/icons/few_clouds_night.svg";
import scatteredClouds from "../assets/icons/scattered_clouds.svg";
import brokenClouds from "../assets/icons/broken_clouds.svg";
import showerRain from "../assets/icons/rain.svg";
import rainDay from "../assets/icons/shower_rain_day.svg";
import rainNight from "../assets/icons/shower_rain_night.svg";
import thunderstorm from "../assets/icons/thunderstorm.svg";
import snow from "../assets/icons/snow.svg";
import mist from "../assets/icons/mist.svg";
export const getIconById = (idIcon) => {
  switch (idIcon) {
    case "01d":
      return clearSkyDay;
    case "01n":
      return clearSkyNight;
    case "02d":
      return fewCloudsDay;
    case "02n":
      return fewCloudsNight;
    case "03d":
    case "03n":
      return scatteredClouds;
    case "04d":
    case "04n":
      return brokenClouds;
    case "09d":
    case "09n":
      return showerRain;
    case "10d":
      return rainDay;
    case "10n":
      return rainNight;
    case "11d":
    case "11n":
      return thunderstorm;
    case "13d":
    case "13n":
      return snow;
    case "50d":
    case "50n":
      return mist;
  }
};