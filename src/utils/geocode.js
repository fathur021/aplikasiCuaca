const request = require('postman-request');

const geocode = (address, callback) => {
    const token = 'dace7dc5c1c619210477f299763dee1b';
    const url = `http://api.positionstack.com/v1/forward?access_key=${token}&query=${encodeURIComponent(address)}`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Tidak dapat terkoneksi ke layanan', undefined);
        } else {
            const responseData = response.body;

            if (responseData && responseData.data && responseData.data.length > 0) {
                const result = responseData.data[0];
                callback(undefined, {
                    latitude: result.latitude,
                    longitude: result.longitude,
                    location: result.label,
                });
            } else {
                callback('Tidak dapat menemukan lokasi. Lakukan pencarian lokasi yang lain', undefined);
            }
        }
    });
};

module.exports = geocode;
