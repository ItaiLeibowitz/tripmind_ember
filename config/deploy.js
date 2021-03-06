/* jshint node: true */

module.exports = function (deployTarget) {
	var ENV = {
		build: {}
		// include other plugin configuration that applies to all deploy targets here
	};

	if (deployTarget === 'development') {
		ENV.build.environment = 'development';
		// configure other plugins for development deploy target here
	}

	if (deployTarget === 'staging') {
		ENV.build.environment = 'production';
		// configure other plugins for staging deploy target here
	}

	if (deployTarget === 'production') {
		ENV.build.environment = 'production';

		// configure other plugins for production deploy target here
		ENV.s3 = {
			accessKeyId: process.env.AWS_KEY,
			secretAccessKey: process.env.AWS_SECRET,
			bucket: process.env.AWS_BUCKET,
			region: process.env.AWS_REGION,
			filePattern: "*"
		}

		ENV.cloudfront = {
			accessKeyId: process.env.AWS_KEY,
			secretAccessKey: process.env.AWS_SECRET,
			distribution: process.env.AWS_DIST_ID
		}
	}

	// Note: if you need to build some configuration asynchronously, you can return
	// a promise that resolves with the ENV object instead of returning the
	// ENV object synchronously.
	return ENV;
};
