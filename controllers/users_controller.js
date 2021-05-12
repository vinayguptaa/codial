module.exports.profile = function(req, res) {
    return res.send("<h1>User's Profile here</h1>");
}

module.exports.posts = function(req, res) {
    return res.send("<h1>User's Posts here</h1>");
}