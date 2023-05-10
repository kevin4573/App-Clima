//getcoordinates.js
export const getCoordinates = async () => {
    try {
        const position = await new Promise(( resolve, reject ) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return { 
        latitude: position.coords.latitude,
        longitude: position.coords.longitude}
    } catch (error) {
        return null;
    }
    
    
    
}
 