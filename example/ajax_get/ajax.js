// JavaScript Document

var ajax = {
	request: function(url, options) {
		function _serialize(data){
			if (!data)
				return data;
			if (typeof data == 'string')
				return data;
			var result = [], key;
			for (key in data)
				result.push(key + '=' + encodeURIComponent(data[key]));
			return result.join('&');
		}
		function _onStateChange() {
			if (xhr.readyState == 4) {
				try {
					var status = xhr.status;
				} catch (ex) {
					fire('failure');
					return;
				}
				fire(status);
				if ((status >= 200 && status < 300) || status == 304 || status == 1223)
					fire('success');
				else
					fire('failure');
				window.setTimeout(
					function() {
						if (async)
							xhr = null;
					}, 0);
			}
		}
		function fire(type) {
			type = 'on' + type;
			var handler = eventHandlers[type],
				globelHandler = ajax[type];
			if (handler){
				handler(xhr.responseText);
			} else if (globelHandler){
				if (type == 'onsuccess')
					return;
				globelHandler(xhr);
			}
		}

		var xhr = (function(){
			if (window.ActiveXObject) {
				try {
					return new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e) {
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch (e) { }
				}
			}
			if (window.XMLHttpRequest)
				return new XMLHttpRequest();
		})();
		var eventHandlers = {};
		options = options || {};
		var data = options.data || '',
			method = (options.method || "GET").toUpperCase(),
			async = !(options.async === false),
			headers = options.headers || {},
			username = options.username || '',
			password = options.password || '',
			key;
		for (key in options) {
			eventHandlers[key] = options[key];
		}
		headers['X-Request-With'] = 'XMLHttpRequest';
		try	{
			if (method == 'GET' && data){
				var queryString = _serialize(data);
				if (queryString != '')
					url += (url.indexOf('?') >= 0 ? '&' : '?') + queryString;
				data = null;
				if (options['noCache'])
					url += (url.indexOf('?') >= 0 ? '&' : '?') + 'r' + (new Date()).getTime() + '=1';
			}
			if (username)
				xhr.open(method, url, async, username, password);
			else
				xhr.open(method, url, async);
			if (async)
				xhr.onreadystatechange = _onStateChange;
			if (method == 'POST')
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			for (key in headers){
				if (headers.hasOwnProperty(key))
					xhr.setRequestHeader(key, headers[key]);
			}
			fire('beforerequest');
			data = _serialize(data);
			xhr.send(data);
			if (!async)
				_onStateChange();
		} catch (ex) {
			fire('failure');
		}
		return xhr;
	},

	post: function(url, data, onsuccess, failure){
		return ajax.request(
			url,
			{
				'method': 'POST',
				'data': data,
				'onsuccess': onsuccess,
				'onfailure': failure
			});
	},

	get: function(url, onsuccess, failure){
		return ajax.request(url, { 'onsuccess': onsuccess, 'onfailure': failure });
	}
};

ajax.onfailure = function(){
	alert('failed');
}