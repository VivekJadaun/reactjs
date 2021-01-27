class Utility {

  static randomBetween = (min, max, int_only = false) => {
    return int_only 
           ? Math.floor(Math.random() * (max - min + 1)) + min
           : Math.random() * (max - min + 1) + min;
  }

  static convertToUniqueHash(string) {
    let hash = 0;

    if (string.length === 0) return hash;
    
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash     = (( hash<<5 ) - hash) + char;
        hash     = hash & hash; // Convert to 32bit integer
    }

    return hash;
  }
}

export default Utility;