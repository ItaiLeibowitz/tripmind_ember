import ENV from 'tripmind/config/environment';








export default {
	name: 'zopim',
	initialize: function () {
		if (ENV.environment != "production") {
			window.$zopim || (function (d, s) {
				var $zopim;
				var z = $zopim = function (c) {
					z._.push(c)
				}, $ = z.s =
					d.createElement(s), e = d.getElementsByTagName(s)[0];
				z.set = function (o) {
					z.set.
						_.push(o)
				};
				z._ = [];
				z.set._ = [];
				$.async = !0;
				$.setAttribute("charset", "utf-8");
				$.src = "https://v2.zopim.com/?3wRQmF84hVatQ9SLRjzyoi541Nn9BmLn";
				z.t = +new Date;
				$.
					type = "text/javascript";
				e.parentNode.insertBefore($, e)
			})(document, "script");
		}
	}
};
