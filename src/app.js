const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')
const berita = require('./utils/berita')
const direktoriPublic = path.join(__dirname, '../public')
const direktoriViews = path.join(__dirname, '../templates/views')
const direktoripartials = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', direktoriViews)
hbs.registerPartials(direktoripartials)
app.use(express.static(direktoriPublic))

//ini halaman untama
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Fathur Rahman'
    })
})

app.get('/berita', (req, res) => {
    // Ambil data berita dari berita.js
    berita((error, dataBerita) => {
        if (error) {
            res.render('error', { error });
        } else {
            res.render('berita', { judul: 'Halaman Berita', nama: 'Fathur Rahman', berita: dataBerita });
        }
    });
});

app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        teksBantuan: 'Ini adalah teks Bantuan',
        nama: 'Fathur Rahman'
    })
})

app.get('/berita', (req, res) => {
    // Ambil data berita dari berita.js
    berita((error, dataBerita) => {
        if (error) {
            res.render('error', { error });
        } else {
            res.render('berita', { judul: 'Halaman Berita', nama: 'Fathur Rahman', berita: dataBerita });
        }
    });
});

//ini halaman tentang
app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Fathur Rahman'
    })
})
app.get('/infocuaca', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Kamu harus memasukan lokasi yang ingin dicari'
        })
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            })
        })
    })
})

app.get('/bantuan/*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Fathur Rahman',
        pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        nama: 'Fathur Rahman',
        pesanError: 'Halaman tidak ditemukan'
    })
})
app.listen(4000, () => {
    console.log('<h1>Server berjalan pada port 4000.</h1>')
})