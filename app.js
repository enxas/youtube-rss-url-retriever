const https = require("https");

// is argument present flags
let idFlag = false;

// parse arguments
process.argv.forEach(function (val, index, array) {
	if (val == "--id") 
	{
		idFlag = true;
	} else if (val == "-h" || val == "--help")
	{
		console.log("To get YouTube channel RSS feed url run this command:");
		console.log(`node app "https://www.youtube.com/@NoCopyrightSounds"`);
		console.log("To get only YouTube channel id, add --id parameter:");
		console.log(`node app "https://www.youtube.com/@NoCopyrightSounds --id"`);
		process.exit();
	}
});

if (process.argv[2] == null || !process.argv[2].startsWith("https"))
{
	console.error("Error: Valid YouTube URL must be the first argument!");
	process.exit();
}

// do the work
getRssUrl(process.argv[2].trim())
	.then((rssUrl) => {
		var result = rssUrl;

		if (idFlag == true) 
		{
			const indexOfFirst = rssUrl.indexOf("=");

			result = rssUrl.substring(indexOfFirst + 1);
		}

		console.log(result);
	})
	.catch((error) => {
		console.error('Error:', error);
	});

// parse youtube source html and retrieve channel rss url
function getRssUrl(youtubeUrl) {
	return new Promise((resolve, reject) => {
		const options = {
			headers: { 
				// if using User Agent YouTube will redirect to tracking cookie consent page, so set cookie beforehand
				/*
				'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36`,
				'cookie': `SOCS=CAESNQgDEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjMwODA4LjA1X3AwGgJlbiACGgYIgLrgpgY`,
				*/
			}
		};

		https.get(youtubeUrl, options, resp => {
			let data = "";

			// A chunk of data has been recieved.
			resp.on("data", chunk => {
				data += chunk;
			});

			// The whole response has been received. Print out the result.
			resp.on("end", () => {
				// detect first appearance of "rssUrl"
				const indexOfFirst = data.indexOf("rssUrl");

				// offset beginning and end to extract only rss url
				var rssUrl = data.substring(indexOfFirst + 9, indexOfFirst + 85);
				resolve(rssUrl);
			});
		})
		.on("error", err => {
			reject(err);
		});
	});
}
