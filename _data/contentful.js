require(`dotenv`).config();

const contentful = require(`contentful`),
	showdown = require(`showdown`);

const client = contentful.createClient({
		accessToken: process.env.API_KEY,
		space: process.env.SPACE_ID,
	}),
	converter = new showdown.Converter(),
	format = require(`date-fns/format`);

module.exports = () => new Promise((res, rej) => {
	client
		.getEntries({ content_type: `post`, order: `-sys.updatedAt`, limit: 10 })
		.then((data) => {
			const posts = data.items;
			posts.forEach((post) => {
				const update = post.fields.updatedDate || post.fields.publishDate || post.sys.updatedAt,
					publish = post.fields.publishDate || post.sys.createdAt;

				post.fields.body = converter.makeHtml(post.fields.body);
				post.fields.excerpt = converter.makeHtml(post.fields.body.substr(0, 200));
				post.fields.dateUpdate = format(new Date(update), `dd MMM yyyy`);
				post.fields.datePublish = format(new Date(publish), `dd MMM yyyy`);
			});

			res({ posts, siteUrl: process.env.SITE_URL });
		})
		.catch((err) => {
			rej(err);
		});
});
