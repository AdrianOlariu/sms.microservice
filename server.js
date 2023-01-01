const express = require('express');
const app = express();
const path = require('path');
const sms = require('./routes/api.js');

app.get('^/$|/index(.html)?',(req,res)=>{
	res.sendFile(path.join(__dirname,'views','index.html'));
	}
);

app.get('/json', (req,res)=>{
	res.send({'json':'working'});
});

app.use('/sms', require('./routes/sms'));
app.use('/api', require('./routes/api'));

app.get('/*', (req,res)=>{
	res.redirect(301, '/index');
});

app.listen(4000, () => {
	console.log('server running');
});

console.log('sms');
//test git client in linux (pi)
//test web hook
//test web hook (we use the port in the web hook because of the port forwarding and not using ddns for the router so we need to specify the port. the app port it is set on nginx reverse proxy)
//test 4
//test 5
//test 6 final!
//yet another test 7