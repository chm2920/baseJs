
var Drag = (function(){
	var dragObject = null;
	var mouseOffset = null;
	var isDragging = null;
	var ghostElement = null;
	
	function getMouseOffset(target, ev){
		ev = ev || window.event;
		var docPos = getPosition(target);
		var mousePos = mouseCoords(ev);
		return {x: mousePos.x - docPos.x, y: mousePos.y - docPos.y};
	}
	
	function getPosition(e){
		var left = 0;
		var top = 0;		
		do {
			left += e.offsetLeft || 0;
			top += e.offsetTop || 0;
			e = e.offsetParent;
			if (e) {
				if(e.tagName=='BODY') break;
				var p = e.style.position;
				if (p == 'relative' || p == 'absolute') break;
			}
		} while (e);		
		return {x: left, y: top};
	}
	
	function mouseCoords(ev){
		if(ev.pageX || ev.pageY){
			return {x: ev.pageX, y: ev.pageY}
		}
		return {
			x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
			y: ev.clientY + document.body.scrollTop - document.body.clientTop
		}
	}
	
	function start(ev){
		dragObject = this.obj;
		mouseOffset = getMouseOffset(this, ev);
		dragObject.onDragStart();
		document.onmousemove = Drag.drag;
		document.onmouseup = Drag.end;
		return false;
	}
	
	function start_Drag(){
		dragObject.style.position = 'absolute';
		dragObject.style.zIndex = 100;
		isDragging = false;
		var _ghostElement = getGhostElement();
		_ghostElement.style.width = dragObject.offsetWidth + 'px';
		_ghostElement.style.height = dragObject.offsetHeight + 'px';
		dragObject.parentNode.insertBefore(_ghostElement, dragObject.nextSibling);
	}
	
	function when_Drag(clientX, clientY){
		var found = null;
		var max_distance = 100000000;
		var dragArray = getElementsByClassName('dragdrop-draggable');
		for(var i = 0 ; i < dragArray.length; i++) {
			var ele = dragArray[i];
			var distance = Math.sqrt(Math.pow(clientX - getPosition(ele).x, 2 ) + Math.pow(clientY - getPosition(ele).y, 2 ));
			if(ele == this) {
				continue;
			}
			if(isNaN(distance)){
				continue;
			}
			if(distance < max_distance){
				max_distance = distance;
				found = ele;
			}
		}
		// 把虚线框插到 found 元素的前面
		var _ghostElement = getGhostElement();
		if(found != null && _ghostElement.nextSibling != found) {
			found.parentNode.insertBefore(_ghostElement, found);
		}
	}
	
	function end_Drag(){
		this.style.position = '';
		this.style.top = '';
		this.style.left = '';
		this.style.zIndex = '';
		this.style.filter = '';
		this.style.opacity = '';
		
		var ele = getGhostElement();
		ele.parentNode.insertBefore(this, ele.nextSibling);
		ele.parentNode.removeChild(ele);
	}
	
	function getGhostElement(){
		if(!ghostElement){
			ghostElement = document.createElement('div');
			ghostElement.style.border = '2px dashed #aaa';
			ghostElement.style.margin = '0 0 14px 0';
			ghostElement.innerHTML = '&nbsp;';
		}
		return ghostElement;
	}
	
	return {
		init : function(){
			var tmpEls = getElementsByClassName('dragdrop-draggable');
			for( var i = 0, l = tmpEls.length; i < l; i ++ ){
				var tmpEl = tmpEls[i];
				var el = tmpEls[i]; //document.getElementById(tmpEls[i].id);
				var el_h = document.getElementById(tmpEls[i].id + '_h');
				el_h.style.cursor = 'move';
				el_h.obj = el;
				el_h.onmousedown = start;
				el.onDragStart = start_Drag;
				el.onDragEnd = end_Drag;
				el.onDrag = when_Drag;
			}
		},
		drag : function(ev){
			if (!isDragging){	// 第一次移动鼠标，设置它的样式
				dragObject.style.filter = "alpha(opacity=70)";
				dragObject.style.opacity = 0.7;
				isDragging = true;
			}
			ev = ev || window.event;
			var mousePos = mouseCoords(ev);
			if(dragObject){
				dragObject.style.top = mousePos.y - mouseOffset.y + "px";
				dragObject.style.left = mousePos.x - mouseOffset.x + "px";
				dragObject.onDrag(mousePos.x - mouseOffset.x, mousePos.y - mouseOffset.y);
				return false;
			}
		},
		end : function(){
			document.onmousemove = null;
			document.onmouseup = null;
			dragObject.onDragEnd();
			dragObject = null;
		}
	}
})();

function getElementsByClassName(searchClass, node, tag){
	if(document.getElementsByClassName){
		return document.getElementsByClassName(searchClass);
	} else {
		node = node || document;
		tag = tag || "*";
		var classes = searchClass.split(" "),
			elements = (tag=='*' && node.all) ? node.all : node.getElementsByTagName(tag),
			patterns = [],
			returnElements = [],
			current,
			match;
		var i = classes.length;
		while(--i >= 0){
			patterns.push(new RegExp('(^|\\s)' + classes[i] + '(\\s|$)'));
		}
		var j = elements.length;
		while(--j >= 0){
			current = elements[j];
			match = false;
			for(var k = 0, kl = patterns.length; k < kl; k ++){
				match = patterns[k].test(current.className);
				if(!match){
					break;
				}
				if(match){
					returnElements.push(current);
				}
			}				
		}
		return returnElements;
	}
};
	
window.onload = function(){
	Drag.init();
}