var express = require('express');
var router = express.Router();
var needle = require('needle');
var cheerio = require('cheerio');

router.get('/', function(req, res, next) {
	res.render('index', { content: 'home', contentIsFile: true });
});

router.post('/fetch', function(req, res, next) {
	needle.post('https://account.watcard.uwaterloo.ca/watgopher661.asp',
	{
		acnt_1: req.body.number,
		acnt_2: req.body.pin,
		DBDATE: '02/15/2015',
		DEDATE: '02/17/2015',
		PASS: 'PASS',
		STATUS: 'HIST'
	}, function(err, response) {
		if (!err && response.statusCode == 200) {
			$ = cheerio.load(response.body);
			res.render('index', {
				content: $.html('#oneweb_financial_history_table'),
				contentIsFile: false
			});
		}
		else
			res.send('Error: ' + response.statusCode);
	});
});

module.exports = router;