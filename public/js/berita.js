// const request = require('postman-request');

// const berita = (callback) => {
//     const apiKey = '01d2df9d612185469d38bc527d8643de';
//     const apiUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=berita`;

//     request({ url: apiUrl, json: true }, (error, response) => {
//         if (error) {
//             callback('Gagal mengambil berita', undefined);
//         } else if (response.body.error) {
//             callback('Tidak dapat menemukan berita', undefined);
//         } else {
//             const beritaData = response.body.data.map(item => {
//                 // Menambahkan URL gambar (misalnya, item.image) ke setiap berita jika tersedia
//                 return {
//                     title: item.title,
//                     description: item.description,
//                     url: item.url,
//                     image: item.image, // Ini adalah contoh URL gambar
//                 };
//             });
//             callback(undefined, beritaData);
//         }
//     });
// };

// module.exports = berita;