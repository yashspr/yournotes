const express = require('express');
const { google } = require('googleapis');
const mongoose = require('mongoose');
const axios = require('axios').default;

const UserModel = mongoose.model('user');
const router = express.Router();
const googleConfig = require('../config/google_auth');
const { dontAllowLoggedIn } = require('../middleware/auth');

// Create an oAuth2 client to authorize the API call
const client = new google.auth.OAuth2(
	process.env.client_id,
	process.env.client_secret,
	googleConfig.redirect_urls[0]
);

router.get('/login', dontAllowLoggedIn, function (req, res) {
	// Generate a Google URL to which user will be redirected to for authorization
	let authorizeUrl = client.generateAuthUrl({
		access_type: 'offline',
		scope: googleConfig.scope,
	});

	res.redirect(authorizeUrl);
});

router.get('/success', async (req, res) => {
	let message = '';
	// Google callback will send a code which must be exchanged for access tokens
	let code = req.query.code;
	if (!code || code === '') {
		res.end('Auth Failed');
	}

	let tokens = null;
	try {
		let tokens_data = await client.getToken(code); // Get access tokens for the received code
		tokens = tokens_data.tokens;
		console.log(tokens);
	} catch (e) {
		console.log('Unable to retrieve token from code. Maye a rogue request');
		// res.end("Invalid");
		message = 'failed';
		return;
	}

	// Get user profile details (name, email, etc) using the access tokens we received
	let response = await axios.get(
		'https://www.googleapis.com/oauth2/v3/userinfo',
		{
			params: {
				access_token: tokens.access_token,
			},
		}
	);

	let userEmail = response.data.email;

	// To check if the signed in user is new user or previously logged in user
	let user = await UserModel.findOne({ email: userEmail });

	if (user) {
		// user is there in database, so we must use the existing access_tokens
		// But everytime the user logins, new access_token is generated which we must save but the refresh token  remains the same
		console.log('user already in the database');
		console.log(user);
		user.tokens = {
			access_token: tokens.access_token,
			refresh_token: tokens.refresh_token
				? tokens.refresh_token
				: user.tokens.refresh_token,
			expiry_date: tokens.expiry_date,
		};
		try {
			await user.save();
			console.log('updated the tokens');
			message = 'success';
		} catch (e) {
			console.log('Failed to update tokens in database');
			message = 'failed';
		}
	} else {
		// We are saving the new user to the database along with the access tokens
		let newTokens = {
			access_token: tokens.access_token,
			refresh_token: tokens.refresh_token,
			expiry_date: tokens.expiry_date,
		};

		const newUser = {
			email: response.data.email,
			name: response.data.name,
			tokens: newTokens,
		};

		try {
			let savedUserDoc = await new UserModel(newUser).save();
			console.log('saved user to db');
			console.log(savedUserDoc);
			message = 'success';
		} catch (e) {
			console.log("Couldn't save new user to database");
			console.log(e);
			message = 'failed';
		}
	}

	// Initialize session for the user and save his email
	req.session.user_email = userEmail;
	// res.end("Success");
	res.render('message', {
		message,
	});
});

router.get('/logout', (req, res) => {
	if (req.user && req.session.user_email) {
		res.setHeader('Content-Type', 'application/json');
		req.session.destroy((err) => {
			if (err) {
				res.end(JSON.stringify({ status: 'failed' }));
			} else {
				res.end(JSON.stringify({ status: 'success' }));
			}
		});
	} else {
		res.end(JSON.stringify({ status: 'failed' }));
	}
});

router.get('/isUserLoggedIn', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	req.session.user_email
		? res.end(JSON.stringify({ status: 'success' }))
		: res.end(JSON.stringify({ status: 'failed' }));
});

module.exports = router;
