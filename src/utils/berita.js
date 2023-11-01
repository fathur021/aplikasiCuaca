const request = require('postman-request');

const berita = (callback) => {
    const apiKey = '01d2df9d612185469d38bc527d8643de';
    const apiUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=berita`;

    request({ url: apiUrl, json: true }, (error, response) => {
        if (error) {
            callback('Gagal mengambil berita', undefined);
        } else if (response.body.error) {
            callback('Tidak dapat menemukan berita', undefined);
        } else {
            callback(undefined, response.body.data);
        }
    });
};

module.exports = berita;
