module.exports.home = function(req, res) {
    // return res.send('<h1>Express is up and running for Codial!</h1>')
    return res.render('home', {
        title: "Home"
    });
}