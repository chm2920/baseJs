
(function(window){
	var base = (function(){
		var base = function(){
		};
		base.prototype.test = function(){
			alert('test');
		}
	});
	window.base = base;
})(window);

base.test;


/*
	Error	EvalError	RangeError	Syntax	TypeError
*/

