var express = require('express');
var router = express.Router();
var needle = require('needle');
var cheerio = require('cheerio');

router.get('/', function(req, res, next) {
	res.render('index', {
		content: 'home',
		contentIsFile: true
	});
});

router.post('/fetch', function(req, res, next) {
	formatDate = function(date) {
		return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
	}

	calcStartDate = function() {
		var date = new Date();
		date.setDate(1);

		if (date.getMonth() <= 3) // up to March - winter
			date.setMonth(0);
		else if (date.getMonth() <= 7) // up to August - spring
			date.setMonth(4);
		else // fall
			date.setMonth(8);

		return formatDate(date);
	}

	calcEndDate = function() {
		return formatDate(new Date());
	}

	needle.post('https://account.watcard.uwaterloo.ca/watgopher661.asp', {
		acnt_1: req.body.number,
		acnt_2: req.body.pin,
		DBDATE: calcStartDate(),
		DEDATE: calcEndDate(),
		PASS: 'PASS',
		STATUS: 'HIST'
	}, function(err, response) {
		buildTableJSON = function($, selectors) {
			table = $('#oneweb_financial_history_table');

			if (table.length != 1)
				return {};

			// column indices with requested headers
			cols = [];
			for (var i = 0; i < selectors.length; i++)
				cols.push(table.find(selectors[i]).index());

			// get respective td's
			ans = [];
			table.children('tr').each(function(index) {
				if ($(this).children('td').length == 0)
					return;

				// actual columns in this row
				var row = {};
				for (var i = 0; i < selectors.length; i++)
					row[selectors[i]] = $($(this).children().get(cols[i])).html().trim();

				ans.push(row);
			});

			return ans;
		}

		if (!err && response.statusCode == 200) {
			$ = cheerio.load(response.body);

			var table_json = buildTableJSON($, [
				'#oneweb_financial_history_th_date',
				'#oneweb_financial_history_th_amount',
				'#oneweb_financial_history_th_bal'
			]);
			var table_param = JSON.stringify(table_json);

			res.render('index', {
				content: '\
					<div ng-controller="FetchController"><script> app.constant("table_json", ' + table_param + ') </script> </div>',
				contentIsFile: false
			});
		} else
			res.send('Error: ' + response.statusCode);
	});
});

module.exports = router;