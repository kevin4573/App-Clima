import { kelvinToCelcius } from "./kelvinToCelcius";


export const kelvinToFahrenheit = (kelvinDegrades) => {
    const celsius = kelvinToCelcius(kelvinDegrades)
    const fahrenheitConversion = 9/5;
    const fahrenheitInit = 32;
    return (celsius * fahrenheitConversion + fahrenheitInit).toFixed(2);
    
}