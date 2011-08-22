
var detect = (function(elem){
	var p = document.createElement('div');
	p.id = 'detect';
	p.style.cssText = 'position:absolute;z-index:10000;top:40px;right:40px;padding:10px 10px;width:800px;border:1px solid #EBEBEB;';
	
	var tb = document.createElement('table');
	tb.style.cssText = 'width:100%;border:0;border-collapse:seperate !important;border-spacing:1px;background:#333;font-size:12px;font-weight:normal;';
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.setAttribute('colspan', '2');
	td.style.cssText = 'padding:4px 8px;background:#AAA;font-size:14px;font-weight:bold;';
	td.innerText = elem;
	tr.appendChild(td);
	tb.appendChild(tr);
	for( var t in elem ){
		tr = document.createElement('tr');
		td = document.createElement('td');
		td.style.cssText = 'width:50%;background:#EEE;padding:4px 8px;font-size:12px;font-weight:bold;';
		td.innerText = t;
		tr.appendChild(td);
		td = document.createElement('td');
		td.style.cssText = 'width:50%;background:#FFF;padding:4px 8px;line-height:16px;';
		td.innerText = elem[t];
		tr.appendChild(td);
		tb.appendChild(tr);
	}
	p.appendChild(tb);
	document.body.appendChild(p);
})

// http://i-res.fetionpic.com/j/public/framework/framework.js
//browser
(function(fk, undef)
{
	var ua = navigator.userAgent, core, type, version;
	core = (function()
	{
		if (/gecko/i.test(ua) && !/like gecko/i.test(navigator.userAgent)) return 'Gecko';
		if (/webkit/i.test(ua)) return 'WebKit';
		return 'Trident';
	})();
	type = (function()
	{
		if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua))
		{
			version = +(RegExp['\x241'] || RegExp['\x242']);
			return 'safari';
		}
		if (/opera\/(\d+\.\d)/i.test(ua))
		{
			version = +RegExp['\x241'];
			return 'opera';
		}
		if (/chrome\/(\d+\.\d)/i.test(ua))
		{
			version = +RegExp['\x241'];
			return 'chrome';
		}
		if (/msie (\d+\.\d)/i.test(ua))
		{
			//IE 8下，以documentMode为准
			//在模板中可能会有$，为防止冲突，将$1 写成 \x241
			version = document.documentMode || +RegExp['\x241'];
			return 'ie';
		}
		if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent))
		{
			version = +RegExp['\x241'];
			return 'firefox';
		}
	})();
	fk.browser = {
		isStrict: document.compatMode == "CSS1Compat",
		core: core,
		type: type,
		version: version
	};
})(framework);