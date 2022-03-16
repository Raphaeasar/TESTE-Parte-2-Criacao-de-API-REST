const mongoose = require('mongoose');

const Universities = mongoose.model('Universities', {
    alpha_two_code: String,
    web_pages: String,
    name: String,
    country: String,
    domains: String,
    state_province: String,

})

module.exports = Universities;