import Ember from 'ember'
import sanitizeHtml from 'npm:sanitize-html';

export default function(dirty) {
	return sanitizeHtml(dirty, {
		allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
			'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
			'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre' , 'img'],
		allowedAttributes: {
			a: [ 'href', 'name', 'target' ],
			// We don't currently allow img itself by default, but this
			// would make sense if we did
			img: [ 'src' ]
		},
		// Lots of these won't come up by default because we don't allow them
		selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
		// URL schemes we permit
		allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ],
		allowedSchemesByTag: {},
		transformTags: {
			'a': sanitizeHtml.simpleTransform('a', {target: '_blank'})
		}
	});
}

