"use strict";

module.exports = isomorphicParser;

/* Example payload from jsonParser
req.body
{ requests:
   { g0:
      { resource: 'projectService',
        operation: 'create',
        params: { 
        	projectName: 'test',
  			projectImg: 'http://placehold.it/546x408' 
  		},
        body: {} } },
  context: { lang: 'en-US', _csrf: 'a3fc2d' } }
req.query
{ _csrf: 'a3fc2d', lang: 'en-US' }
*/
function isomorphicParser(req, res, next) {

	if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
		//Manually coercing url-encoded body into the body structure that the service expects
		var oldBody = req.body;
		var newBody = {
			requests : {
				g0 : {
					resource: 'projectService',
					operation: 'create',
					params: oldBody
				},
				body: {}
			},
			context: req.query
		};
		req.body = newBody;
	}

	next();

}
