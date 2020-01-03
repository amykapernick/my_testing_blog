require('dotenv').config()

const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	nunjucks = require('nunjucks'),
	showdown = require('showdown'),
	converter = new showdown.Converter(),
	format = require('date-fns/format'),
	contentful = require('contentful'),
	client = contentful.createClient({
		accessToken: process.env.API_KEY,
		space: process.env.SPACE_ID,
	})

nunjucks.configure(['views/'], {
	autoescape: true,
	express: app,
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('resources'))

app.get('/', async (req, res) => {
	const posts = await client.getEntries().then(data => {
		let posts = data.items
		posts.forEach(post => {
			post.fields.body = converter.makeHtml(post.fields.body.substr(0, 150))
			post.fields.date = format(new Date(post.fields.publish), 'dd MMM yy')
		})

		return posts
	})

	res.render('index.html', {
		title: 'My Testing Blog',
		posts: posts,
	})
})

app.get('/:post', async (req, res) => {
	const post = await client.getEntries().then(data => {
		data.items.some(item => {
			if (item.fields.slug == req.params.post) {
				item.fields.body = converter.makeHtml(item.fields.body)
				item.fields.date = format(new Date(item.fields.publish), 'dd MMM yy')

				res.render('post.html', {
					post: item,
				})
			}
		})
	})
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`Blog is running on port ${process.env.PORT || 3000}`)
})
