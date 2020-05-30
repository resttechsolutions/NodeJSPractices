const express = require('express');
const app = express();

//settings
app.set('port', 3000);

//midlewares

//routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

//static files


//listening the server  
app.listen(app.get('port'), () => {
    console.log('Server on port: ' + app.get('port'));
})