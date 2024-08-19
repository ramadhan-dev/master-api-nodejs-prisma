const bcrypt = require("bcryptjs");



// Function to get formatted date string (YYYY-MM-DD)
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}




const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt); //hashedPassword
}


/**
 * 
 * @param {*} lat1 
 * @param {*} lon1 
 * @param {*} lat2 
 * @param {*} lon2 
 * @returns 
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRad = (x) => x * Math.PI / 180;

    const R = 6371e3; // Radius of the Earth in meters
    const radianLat1 = toRad(lat1);
    const radianLat2 = toRad(lat2);
    const radianDifferenceLat = toRad(lat2 - lat1);
    const radianDifferenceLong = toRad(lon2 - lon1);

    const a = Math.sin(radianDifferenceLat / 2) * Math.sin(radianDifferenceLat / 2) +
        Math.cos(radianLat1) * Math.cos(radianLat2) *
        Math.sin(radianDifferenceLong / 2) * Math.sin(radianDifferenceLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters
    return distance;
}

module.exports = {
    getFormattedDate,
    hashedPassword,
    haversineDistance
};