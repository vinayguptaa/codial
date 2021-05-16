const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from subpages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router here
app.use('/', require('./routes')); // app.use('/', require('./routes/index')); are same

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the Server : ${err}`);
        return;
    }

    console.log(`Server is up and running on the port : ${port}`);
});