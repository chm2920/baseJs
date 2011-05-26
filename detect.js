
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