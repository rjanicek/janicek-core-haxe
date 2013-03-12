(function () { "use strict";
var HxOverrides = function() { }
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
var List = function() {
	this.length = 0;
};
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
}
var MainDemo = function() { }
MainDemo.main = function() {
	console.log(false);
	console.log(true);
	console.log("Hobbit");
	console.log(co.janicek.core.NullCore.coalesceIter([null,"Bilbo","Hobbit"]));
	var hobbit = null;
	if(hobbit == null) hobbit = { name : "Drogo", parent : null, children : []};
	var frodo = { name : "Frodo", parent : hobbit};
	hobbit.children.push(frodo);
	console.log(Lambda.count(co.janicek.core.FamilyCore.family(hobbit)));
	console.log(Lambda.count(co.janicek.core.FamilyCore.descendants(hobbit)));
	console.log(Lambda.count(co.janicek.core.FamilyCore.lineage(frodo)));
	console.log(Lambda.array(Lambda.map(co.janicek.core.FamilyCore.lineage(frodo),function(h) {
		return h.name;
	})));
	console.log(co.janicek.core.LambdaCore.first(co.janicek.core.FamilyCore.family(hobbit),function(h) {
		return co.janicek.core.StringCore.contains(h.name,"odo");
	}).name);
}
var Reflect = function() { }
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
var co = {}
co.janicek = {}
co.janicek.core = {}
co.janicek.core.FamilyCore = function() { }
co.janicek.core.FamilyCore.lineage = function(node) {
	return { iterator : function() {
		return { hasNext : function() {
			return node != null;
		}, next : function() {
			var current = node;
			node = node.parent;
			return current;
		}};
	}};
}
co.janicek.core.FamilyCore.family = function(parent) {
	var stack = new Array();
	stack.push(parent);
	return { iterator : function() {
		return { hasNext : function() {
			return stack.length > 0;
		}, next : function() {
			var node = stack.pop();
			if(Reflect.hasField(node,"children")) stack = stack.concat(node.children);
			return node;
		}};
	}};
}
co.janicek.core.FamilyCore.descendants = function(parent) {
	var stack = new Array();
	var loadStack = function(node) {
		if(Reflect.hasField(node,"children")) stack = stack.concat(node.children);
	};
	loadStack(parent);
	return { iterator : function() {
		return { hasNext : function() {
			return stack.length > 0;
		}, next : function() {
			var n = stack.pop();
			loadStack(n);
			return n;
		}};
	}};
}
co.janicek.core.LambdaCore = function() { }
co.janicek.core.LambdaCore.first = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return x;
	}
	return null;
}
co.janicek.core.NullCore = function() { }
co.janicek.core.NullCore.coalesceIter = function(nullables) {
	return co.janicek.core.LambdaCore.first(nullables,function(n) {
		return n != null;
	});
}
co.janicek.core.StringCore = function() { }
co.janicek.core.StringCore.contains = function(string,pattern,ignoreCase) {
	if(ignoreCase == null) ignoreCase = false;
	if(ignoreCase) {
		string = string.toLowerCase();
		pattern = pattern.toLowerCase();
	}
	return string.indexOf(pattern) != -1;
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
MainDemo.main();
})();

//@ sourceMappingURL=janicek-core-demo-node.js.map