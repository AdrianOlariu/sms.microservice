const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const sms = require('./routes/api.js');
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());//for parsing the json

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

app.listen(PORT, () => {
	console.log(`server running on port: ${PORT}`);
});
