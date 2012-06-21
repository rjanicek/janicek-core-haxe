var $_, $hxClasses = $hxClasses || {}, $estr = function() { return js.Boot.__string_rec(this,''); }
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIter
}
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = b.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
Lambda.prototype = {
	__class__: Lambda
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b[s.b.length] = "{";
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = ", ";
			s.add(Std.string(l[0]));
			l = l[1];
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
			s.add(l[0]);
			l = l[1];
		}
		return s.b.join("");
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
}
var Main = $hxClasses["Main"] = function() { }
Main.__name__ = ["Main"];
Main.main = function() {
	if(!js.Lib.isIE) haxe.Firebug.redirectTraces();
	haxe.Log.trace("Testing...",{ fileName : "Main.hx", lineNumber : 27, className : "Main", methodName : "main"});
	new specs.co.janicek.core.Array2dSpec();
	new specs.co.janicek.core.BaseCode64Spec();
	new specs.co.janicek.core.html.CanvasCoreSpec();
	new specs.co.janicek.core.html.ColorCoreSpec();
	new specs.co.janicek.core.math.HashCoreSpec();
	new specs.co.janicek.core.math.MathCoreSpec();
	new specs.co.janicek.core.PathCoreSpec();
	new specs.co.janicek.core.math.PerlinNoiseSpec();
	new specs.co.janicek.core.math.RandomCoreSpec();
	new specs.co.janicek.core.StringCoreSpec();
	jasmine.Jasmine.getEnv().addReporter(jasmine.Jasmine.newHtmlReporter());
	jasmine.Jasmine.getEnv().execute();
	haxe.Log.trace("Done testing.",{ fileName : "Main.hx", lineNumber : 42, className : "Main", methodName : "main"});
}
Main.prototype = {
	__class__: Main
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype = {
	__class__: Std
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = new Array();
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b[this.b.length] = x == null?"null":x;
	}
	,addSub: function(s,pos,len) {
		this.b[this.b.length] = s.substr(pos,len);
	}
	,addChar: function(c) {
		this.b[this.b.length] = String.fromCharCode(c);
	}
	,toString: function() {
		return this.b.join("");
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype = {
	__class__: StringTools
}
var co = co || {}
if(!co.janicek) co.janicek = {}
if(!co.janicek.core) co.janicek.core = {}
co.janicek.core.BaseCode64 = $hxClasses["co.janicek.core.BaseCode64"] = function() { }
co.janicek.core.BaseCode64.__name__ = ["co","janicek","core","BaseCode64"];
co.janicek.core.BaseCode64.base64EncodeBytesData = function(bytesData) {
	var bytes = haxe.io.Bytes.ofData(bytesData);
	var encodings = haxe.io.Bytes.ofString("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
	var base64 = new haxe.BaseCode(encodings).encodeBytes(bytes).toString();
	var remainder = base64.length % 4;
	if(remainder > 1) base64 += "=";
	if(remainder == 2) base64 += "=";
	return base64;
}
co.janicek.core.BaseCode64.base64DecodeBytesData = function(base64) {
	var paddingSize = -1;
	if(base64.charAt(base64.length - 2) == "=") paddingSize = 2; else if(base64.charAt(base64.length - 1) == "=") paddingSize = 1;
	if(paddingSize != -1) base64 = base64.substr(0,base64.length - paddingSize);
	var encodings = haxe.io.Bytes.ofString("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
	var bytes = new haxe.BaseCode(encodings).decodeBytes(haxe.io.Bytes.ofString(base64));
	return bytes.b;
}
co.janicek.core.BaseCode64.base64EncodeString = function(string) {
	var bytesData = haxe.io.Bytes.ofString(string).b;
	return co.janicek.core.BaseCode64.base64EncodeBytesData(bytesData);
}
co.janicek.core.BaseCode64.base64DecodeString = function(base64) {
	return haxe.io.Bytes.ofData(co.janicek.core.BaseCode64.base64DecodeBytesData(base64)).toString();
}
co.janicek.core.BaseCode64.prototype = {
	__class__: co.janicek.core.BaseCode64
}
co.janicek.core.PathCore = $hxClasses["co.janicek.core.PathCore"] = function() { }
co.janicek.core.PathCore.__name__ = ["co","janicek","core","PathCore"];
co.janicek.core.PathCore.getDirectoryName = function(path,pathDelimeter) {
	if(pathDelimeter == null) pathDelimeter = "/";
	return path.substr(0,path.lastIndexOf(pathDelimeter));
}
co.janicek.core.PathCore.getFileName = function(path,pathDelimeter) {
	if(pathDelimeter == null) pathDelimeter = "/";
	var fragments = path.split(pathDelimeter);
	return fragments[fragments.length - 1];
}
co.janicek.core.PathCore.removeFileNameExtension = function(path,fileExtensionDelimeter) {
	if(fileExtensionDelimeter == null) fileExtensionDelimeter = ".";
	return path.split(fileExtensionDelimeter)[0];
}
co.janicek.core.PathCore.prototype = {
	__class__: co.janicek.core.PathCore
}
co.janicek.core.StringCore = $hxClasses["co.janicek.core.StringCore"] = function() { }
co.janicek.core.StringCore.__name__ = ["co","janicek","core","StringCore"];
co.janicek.core.StringCore.removeFromEnd = function(string,pattern) {
	if(StringTools.endsWith(string,pattern)) return string.substr(0,string.lastIndexOf(pattern));
	return string;
}
co.janicek.core.StringCore.contains = function(string,pattern) {
	return string.indexOf(pattern) != -1;
}
co.janicek.core.StringCore.isNullOrEmpty = function(string) {
	if(string == null) return true;
	if(string.length == 0) return true;
	return false;
}
co.janicek.core.StringCore.isInteger = function(s) {
	if(co.janicek.core.StringCore.contains(s,".")) return false;
	return Std.parseInt(s) != null;
}
co.janicek.core.StringCore.prototype = {
	__class__: co.janicek.core.StringCore
}
if(!co.janicek.core.array) co.janicek.core.array = {}
co.janicek.core.array.Array2dCore = $hxClasses["co.janicek.core.array.Array2dCore"] = function() { }
co.janicek.core.array.Array2dCore.__name__ = ["co","janicek","core","array","Array2dCore"];
co.janicek.core.array.Array2dCore.get = function(a,x,y) {
	if(a[y] == null) return null;
	return a[y][x];
}
co.janicek.core.array.Array2dCore.set = function(a,x,y,value) {
	if(a[y] == null) a[y] = new Array();
	a[y][x] = value;
	return a;
}
co.janicek.core.array.Array2dCore.getIndices = function(index,width,blockSize) {
	if(blockSize == null) blockSize = 1;
	return { x : (index / blockSize | 0) % width, y : index / blockSize / width | 0};
}
co.janicek.core.array.Array2dCore.foreachY = function(a,f) {
	var _g = 0;
	while(_g < a.length) {
		var y = a[_g];
		++_g;
		if(y != null) f(y);
	}
}
co.janicek.core.array.Array2dCore.foreachXY = function(a,f) {
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var yIndex = _g1++;
		if(a[yIndex] != null) {
			var _g3 = 0, _g2 = a[yIndex].length;
			while(_g3 < _g2) {
				var xIndex = _g3++;
				var value = a[yIndex][xIndex];
				if(value != null) f(xIndex,yIndex,value);
			}
		}
	}
}
co.janicek.core.array.Array2dCore.any = function(a,f) {
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var yIndex = _g1++;
		if(a[yIndex] != null) {
			var _g3 = 0, _g2 = a[yIndex].length;
			while(_g3 < _g2) {
				var xIndex = _g3++;
				var value = a[yIndex][xIndex];
				if(value != null) {
					if(f(value)) return { x : xIndex, y : yIndex};
				}
			}
		}
	}
	return null;
}
co.janicek.core.array.Array2dCore.dimensions = function(array) {
	var height = array.length;
	var width = 0;
	co.janicek.core.array.Array2dCore.foreachY(array,function(y) {
		width = Math.max(width,y.length);
	});
	return { x : width, y : height};
}
co.janicek.core.array.Array2dCore.values = function(array) {
	return { iterator : function() {
		return new co.janicek.core.array.Array2dValueIterator(array);
	}};
}
co.janicek.core.array.Array2dCore.indexes = function(array) {
	return { iterator : function() {
		return new co.janicek.core.array.Array2dIterator(array);
	}};
}
co.janicek.core.array.Array2dCore.prototype = {
	__class__: co.janicek.core.array.Array2dCore
}
co.janicek.core.array.Array2dIterator = $hxClasses["co.janicek.core.array.Array2dIterator"] = function(a) {
	this.a = a;
	this.y = 0;
	this.x = 0;
	this.nextValue = null;
};
co.janicek.core.array.Array2dIterator.__name__ = ["co","janicek","core","array","Array2dIterator"];
co.janicek.core.array.Array2dIterator.prototype = {
	a: null
	,nextValue: null
	,y: null
	,x: null
	,hasNext: function() {
		if(this.nextValue != null) return true;
		while(this.y < this.a.length) {
			if(this.a[this.y] != null) {
				while(this.x < this.a[this.y].length && this.a[this.y][this.x] == null) this.x++;
				if(this.a[this.y][this.x] != null) {
					this.nextValue = { x : this.x, y : this.y};
					this.x++;
					return true;
				}
				this.x = 0;
			}
			this.y++;
		}
		return false;
	}
	,next: function() {
		var n = this.nextValue;
		this.nextValue = null;
		return n;
	}
	,__class__: co.janicek.core.array.Array2dIterator
}
co.janicek.core.array.Array2dValueIterator = $hxClasses["co.janicek.core.array.Array2dValueIterator"] = function(a) {
	this.yIterator = a.iterator();
	this.xIterator = null;
	this.nextValue = null;
};
co.janicek.core.array.Array2dValueIterator.__name__ = ["co","janicek","core","array","Array2dValueIterator"];
co.janicek.core.array.Array2dValueIterator.prototype = {
	yIterator: null
	,xIterator: null
	,nextValue: null
	,hasNext: function() {
		if(this.nextValue != null) return true;
		if(this.xIterator != null) while(this.xIterator.hasNext()) {
			this.nextValue = this.xIterator.next();
			if(this.nextValue != null) return true;
		}
		while(this.yIterator.hasNext()) {
			var z = this.yIterator.next();
			if(z != null) {
				this.xIterator = z.iterator();
				return this.hasNext();
			}
		}
		return false;
	}
	,next: function() {
		var n = this.nextValue;
		this.nextValue = null;
		return n;
	}
	,__class__: co.janicek.core.array.Array2dValueIterator
}
if(!co.janicek.core.html) co.janicek.core.html = {}
co.janicek.core.html.CanvasCore = $hxClasses["co.janicek.core.html.CanvasCore"] = function() { }
co.janicek.core.html.CanvasCore.__name__ = ["co","janicek","core","html","CanvasCore"];
co.janicek.core.html.CanvasCore.renderCanvasPixelArray = function(imageData,f) {
	var pixels = imageData.data;
	var index;
	var _g1 = 0, _g = pixels.length / 4 | 0;
	while(_g1 < _g) {
		var i = _g1++;
		index = i * 4;
		var newValues = f(index,pixels[index],pixels[index + 1],pixels[index + 2],pixels[index + 3]);
		if(newValues != null) {
			if(newValues.red != null) pixels[index] = newValues.red;
			if(newValues.green != null) pixels[index + 1] = newValues.green;
			if(newValues.blue != null) pixels[index + 2] = newValues.blue;
			if(newValues.alpha != null) pixels[index + 3] = newValues.alpha;
		}
	}
}
co.janicek.core.html.CanvasCore.addNoise = function(pixelData,randomSeed,noiseLevel,grayScale,changeRed,changeGreen,changeBlue,changeAlpha) {
	if(changeAlpha == null) changeAlpha = false;
	if(changeBlue == null) changeBlue = true;
	if(changeGreen == null) changeGreen = true;
	if(changeRed == null) changeRed = true;
	if(grayScale == null) grayScale = false;
	noiseLevel = co.janicek.core.math.MathCore.clampInt(noiseLevel,1,255);
	var delta;
	co.janicek.core.html.CanvasCore.renderCanvasPixelArray(pixelData,function(index,red,green,blue,alpha) {
		delta = co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0,-noiseLevel,noiseLevel);
		var newColors = { red : null, green : null, blue : null, alpha : null};
		if(changeRed) newColors.red = red + delta;
		if(changeGreen) newColors.green = green + (grayScale?delta:co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0,-noiseLevel,noiseLevel));
		if(changeBlue) newColors.blue = blue + (grayScale?delta:co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0,-noiseLevel,noiseLevel));
		if(changeAlpha) newColors.alpha = alpha + co.janicek.core.math.RandomCore.toIntRange(randomSeed = randomSeed * 16807.0 % 2147483647.0,-noiseLevel,noiseLevel);
		return newColors;
	});
	return pixelData;
}
co.janicek.core.html.CanvasCore.addNoiseToCanvas = function(context,randomSeed,noiseLevel,grayScale,red,green,blue,alpha) {
	if(alpha == null) alpha = false;
	if(blue == null) blue = true;
	if(green == null) green = true;
	if(red == null) red = true;
	if(grayScale == null) grayScale = false;
	var imageData = context.getImageData(0,0,context.canvas.width,context.canvas.height);
	imageData = co.janicek.core.html.CanvasCore.addNoise(imageData,randomSeed,noiseLevel,grayScale,red,green,blue,alpha);
	context.putImageData(imageData,0,0);
}
co.janicek.core.html.CanvasCore.loadImage = function(url,f) {
	var image = js.Lib.document.createElement("img");
	image.onload = function() {
		f(image);
	};
	image.src = url;
}
co.janicek.core.html.CanvasCore.getImageData = function(image) {
	var canvas = js.Lib.document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(image,0,0);
	var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
	return imageData;
}
co.janicek.core.html.CanvasCore.makeAverageThresholdBitmap = function(imageData,threshold) {
	threshold = co.janicek.core.math.MathCore.clampInt(threshold,0,255);
	return co.janicek.core.html.CanvasCore.makeBitmap(imageData,function(red,green,blue,alpha) {
		return co.janicek.core.math.MathCore.averageInt([red,green,blue]) > threshold;
	});
}
co.janicek.core.html.CanvasCore.makeBitmap = function(imageData,f) {
	var array = new Array();
	co.janicek.core.html.CanvasCore.renderCanvasPixelArray(imageData,function(index,red,green,blue,alpha) {
		var indices = co.janicek.core.array.Array2dCore.getIndices(index,imageData.width | 0,4);
		co.janicek.core.array.Array2dCore.set(array,indices.x,indices.y,f(red,green,blue,alpha));
		return null;
	});
	return array;
}
co.janicek.core.html.CanvasCore.invertBitmap = function(bitmap) {
	co.janicek.core.array.Array2dCore.foreachXY(bitmap,function(x,y,value) {
		co.janicek.core.array.Array2dCore.set(bitmap,x,y,!value);
	});
	return bitmap;
}
co.janicek.core.html.CanvasCore.prototype = {
	__class__: co.janicek.core.html.CanvasCore
}
co.janicek.core.html.ColorCore = $hxClasses["co.janicek.core.html.ColorCore"] = function() { }
co.janicek.core.html.ColorCore.__name__ = ["co","janicek","core","html","ColorCore"];
co.janicek.core.html.ColorCore.interpolateColor = function(color0,color1,f) {
	var r = (1 - f) * (color0 >> 16) + f * (color1 >> 16) | 0;
	var g = (1 - f) * (color0 >> 8 & 255) + f * (color1 >> 8 & 255) | 0;
	var b = (1 - f) * (color0 & 255) + f * (color1 & 255) | 0;
	if(r > 255) r = 255;
	if(g > 255) g = 255;
	if(b > 255) b = 255;
	return r << 16 | g << 8 | b;
}
co.janicek.core.html.ColorCore.intToHexColor = function(color) {
	return "#" + StringTools.hex(color,6);
}
co.janicek.core.html.ColorCore.rgba = function(red,green,blue,alpha) {
	var core = "" + red + "," + green + "," + blue;
	return alpha == null?"rgb(" + core + ")":"rgba(" + core + "," + alpha + ")";
}
co.janicek.core.html.ColorCore.rgbaFraction = function(red,green,blue,alpha) {
	var core = "" + red * 100 + "%," + green * 100 + "%," + blue * 100 + "%";
	return alpha == null?"rgb(" + core + ")":"rgba(" + core + "," + alpha + ")";
}
co.janicek.core.html.ColorCore.colorFraction = function(fraction) {
	return 255 * fraction | 0;
}
co.janicek.core.html.ColorCore.prototype = {
	__class__: co.janicek.core.html.ColorCore
}
if(!co.janicek.core.math) co.janicek.core.math = {}
co.janicek.core.math.HashCore = $hxClasses["co.janicek.core.math.HashCore"] = function() { }
co.janicek.core.math.HashCore.__name__ = ["co","janicek","core","math","HashCore"];
co.janicek.core.math.HashCore.djb2 = function(s) {
	var hash = 5381;
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		hash = (hash << 5) + hash + s.charCodeAt(i);
	}
	return hash;
}
co.janicek.core.math.HashCore.sdbm = function(s) {
	var hash = 0;
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		hash = s.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
	}
	return hash;
}
co.janicek.core.math.HashCore.javaHashCode = function(s) {
	var hash = 0;
	if(s.length == 0) return hash;
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		hash = (hash << 5) - hash + s.charCodeAt(i);
		hash = hash & hash;
	}
	return hash;
}
co.janicek.core.math.HashCore.prototype = {
	__class__: co.janicek.core.math.HashCore
}
co.janicek.core.math.MathCore = $hxClasses["co.janicek.core.math.MathCore"] = function() { }
co.janicek.core.math.MathCore.__name__ = ["co","janicek","core","math","MathCore"];
co.janicek.core.math.MathCore.isEven = function(n) {
	return n % 2 == 0;
}
co.janicek.core.math.MathCore.isOdd = function(n) {
	return !co.janicek.core.math.MathCore.isEven(n);
}
co.janicek.core.math.MathCore.clampInt = function(value,min,max) {
	return value < min?0:value > max?max:value;
}
co.janicek.core.math.MathCore.clamp = function(value,min,max) {
	return value < min?0:value > max?max:value;
}
co.janicek.core.math.MathCore.degreesToRadians = function(degrees) {
	return degrees * Math.PI / 180;
}
co.janicek.core.math.MathCore.radiansToDegrees = function(radians) {
	return radians * 180 / Math.PI;
}
co.janicek.core.math.MathCore.average = function(numbers) {
	return Lambda.fold(numbers,function(number,total) {
		return total + number;
	},0) / numbers.length;
}
co.janicek.core.math.MathCore.averageInt = function(numbers) {
	return Lambda.fold(numbers,function(number,total) {
		return total + number;
	},0) / numbers.length;
}
co.janicek.core.math.MathCore.prototype = {
	__class__: co.janicek.core.math.MathCore
}
co.janicek.core.math.PerlinNoise = $hxClasses["co.janicek.core.math.PerlinNoise"] = function() { }
co.janicek.core.math.PerlinNoise.__name__ = ["co","janicek","core","math","PerlinNoise"];
co.janicek.core.math.PerlinNoise.makePerlinNoise = function(width,height,_x,_y,_z,seed,octaves,falloff,_) {
	if(falloff == null) falloff = 0.5;
	if(octaves == null) octaves = 4;
	if(seed == null) seed = 666;
	var baseFactor = 0.015625;
	var iXoffset = seed = seed * 16807. % 2147483647 | 0;
	var iYoffset = seed = seed * 16807. % 2147483647 | 0;
	var iZoffset = seed = seed * 16807. % 2147483647 | 0;
	var aOctFreq = [];
	var aOctPers = [];
	var fPersMax = 0.0;
	var fFreq, fPers;
	var _g = 0;
	while(_g < octaves) {
		var i = _g++;
		fFreq = Math.pow(2,i);
		fPers = Math.pow(falloff,i);
		fPersMax += fPers;
		aOctFreq.push(fFreq);
		aOctPers.push(fPers);
	}
	fPersMax = 1 / fPersMax;
	var bitmap = new Array();
	var baseX = _x * baseFactor + iXoffset;
	_y = _y * baseFactor + iYoffset;
	_z = _z * baseFactor + iZoffset;
	var _g = 0;
	while(_g < height) {
		var py = _g++;
		_x = baseX;
		var _g1 = 0;
		while(_g1 < width) {
			var px = _g1++;
			var s = 0.;
			var _g2 = 0;
			while(_g2 < octaves) {
				var i = _g2++;
				var fFreq1 = aOctFreq[i];
				var fPers1 = aOctPers[i];
				var x = _x * fFreq1;
				var y = _y * fFreq1;
				var z = _z * fFreq1;
				var xf = x - x % 1;
				var yf = y - y % 1;
				var zf = z - z % 1;
				var X = (xf | 0) & 255;
				var Y = (yf | 0) & 255;
				var Z = (zf | 0) & 255;
				x -= xf;
				y -= yf;
				z -= zf;
				var u = x * x * x * (x * (x * 6 - 15) + 10);
				var v = y * y * y * (y * (y * 6 - 15) + 10);
				var w = z * z * z * (z * (z * 6 - 15) + 10);
				var A = co.janicek.core.math.PerlinNoise.p[X] + Y;
				var AA = co.janicek.core.math.PerlinNoise.p[A] + Z;
				var AB = co.janicek.core.math.PerlinNoise.p[A + 1] + Z;
				var B = co.janicek.core.math.PerlinNoise.p[X + 1] + Y;
				var BA = co.janicek.core.math.PerlinNoise.p[B] + Z;
				var BB = co.janicek.core.math.PerlinNoise.p[B + 1] + Z;
				var x1 = x - 1;
				var y1 = y - 1;
				var z1 = z - 1;
				var hash = co.janicek.core.math.PerlinNoise.p[BB + 1] & 15;
				var g1 = ((hash & 1) == 0?hash < 8?x1:y1:hash < 8?-x1:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x1:z1:hash < 4?-y1:hash == 14?-x1:-z1);
				hash = co.janicek.core.math.PerlinNoise.p[AB + 1] & 15;
				var g2 = ((hash & 1) == 0?hash < 8?x:y1:hash < 8?-x:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x:z1:hash < 4?-y1:hash == 14?-x:-z1);
				hash = co.janicek.core.math.PerlinNoise.p[BA + 1] & 15;
				var g3 = ((hash & 1) == 0?hash < 8?x1:y:hash < 8?-x1:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x1:z1:hash < 4?-y:hash == 14?-x1:-z1);
				hash = co.janicek.core.math.PerlinNoise.p[AA + 1] & 15;
				var g4 = ((hash & 1) == 0?hash < 8?x:y:hash < 8?-x:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x:z1:hash < 4?-y:hash == 14?-x:-z1);
				hash = co.janicek.core.math.PerlinNoise.p[BB] & 15;
				var g5 = ((hash & 1) == 0?hash < 8?x1:y1:hash < 8?-x1:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x1:z:hash < 4?-y1:hash == 14?-x1:-z);
				hash = co.janicek.core.math.PerlinNoise.p[AB] & 15;
				var g6 = ((hash & 1) == 0?hash < 8?x:y1:hash < 8?-x:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x:z:hash < 4?-y1:hash == 14?-x:-z);
				hash = co.janicek.core.math.PerlinNoise.p[BA] & 15;
				var g7 = ((hash & 1) == 0?hash < 8?x1:y:hash < 8?-x1:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x1:z:hash < 4?-y:hash == 14?-x1:-z);
				hash = co.janicek.core.math.PerlinNoise.p[AA] & 15;
				var g8 = ((hash & 1) == 0?hash < 8?x:y:hash < 8?-x:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x:z:hash < 4?-y:hash == 14?-x:-z);
				g2 += u * (g1 - g2);
				g4 += u * (g3 - g4);
				g6 += u * (g5 - g6);
				g8 += u * (g7 - g8);
				g4 += v * (g2 - g4);
				g8 += v * (g6 - g8);
				s += (g8 + w * (g4 - g8)) * fPers1;
			}
			var color = (s * fPersMax + 1) * 128 | 0;
			co.janicek.core.array.Array2dCore.set(bitmap,px,py,-16777216 | color << 16 | color << 8 | color);
			_x += baseFactor;
		}
		_y += baseFactor;
	}
	return bitmap;
}
co.janicek.core.math.PerlinNoise.prototype = {
	__class__: co.janicek.core.math.PerlinNoise
}
co.janicek.core.math.RandomCore = $hxClasses["co.janicek.core.math.RandomCore"] = function() { }
co.janicek.core.math.RandomCore.__name__ = ["co","janicek","core","math","RandomCore"];
co.janicek.core.math.RandomCore.makeRandomSeed = function() {
	return Math.floor(Math.random() * 2147483647.0);
}
co.janicek.core.math.RandomCore.nextParkMiller = function(seed) {
	return seed * 16807.0 % 2147483647.0;
}
co.janicek.core.math.RandomCore.nextLCG = function(seed) {
	return (1103515245.0 * seed + 12345) % 2147483647.0;
}
co.janicek.core.math.RandomCore.toFloat = function(seed) {
	return seed / 2147483647.0;
}
co.janicek.core.math.RandomCore.toBool = function(seed) {
	return seed / 2147483647.0 > 0.5;
}
co.janicek.core.math.RandomCore.toFloatRange = function(seed,min,max) {
	return min + (max - min) * (seed / 2147483647.0);
}
co.janicek.core.math.RandomCore.toIntRange = function(seed,min,max) {
	return Math.round(min - 0.4999 + (max + 0.4999 - (min - 0.4999)) * (seed / 2147483647.0));
}
co.janicek.core.math.RandomCore.stringToSeed = function(s) {
	return co.janicek.core.math.HashCore.djb2(s) % 2147483647.0 | 0;
}
co.janicek.core.math.RandomCore.prototype = {
	__class__: co.janicek.core.math.RandomCore
}
var haxe = haxe || {}
haxe.BaseCode = $hxClasses["haxe.BaseCode"] = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
};
haxe.BaseCode.__name__ = ["haxe","BaseCode"];
haxe.BaseCode.encode = function(s,base) {
	var b = new haxe.BaseCode(haxe.io.Bytes.ofString(base));
	return b.encodeString(s);
}
haxe.BaseCode.decode = function(s,base) {
	var b = new haxe.BaseCode(haxe.io.Bytes.ofString(base));
	return b.decodeString(s);
}
haxe.BaseCode.prototype = {
	base: null
	,nbits: null
	,tbl: null
	,encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = haxe.io.Bytes.alloc(size + (b.length * 8 % nbits == 0?0:1));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.b[pin++];
			}
			curbits -= nbits;
			out.b[pout++] = base.b[buf >> curbits & mask] & 255;
		}
		if(curbits > 0) out.b[pout++] = base.b[buf << nbits - curbits & mask] & 255;
		return out;
	}
	,initTable: function() {
		var tbl = new Array();
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0, _g = this.base.length;
		while(_g1 < _g) {
			var i = _g1++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe.io.Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.b[pin++]];
				if(i == -1) throw "BaseCode : invalid encoded char";
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255 & 255;
		}
		return out;
	}
	,encodeString: function(s) {
		return this.encodeBytes(haxe.io.Bytes.ofString(s)).toString();
	}
	,decodeString: function(s) {
		return this.decodeBytes(haxe.io.Bytes.ofString(s)).toString();
	}
	,__class__: haxe.BaseCode
}
haxe.Firebug = $hxClasses["haxe.Firebug"] = function() { }
haxe.Firebug.__name__ = ["haxe","Firebug"];
haxe.Firebug.detect = function() {
	try {
		return console != null && console.error != null;
	} catch( e ) {
		return false;
	}
}
haxe.Firebug.redirectTraces = function() {
	haxe.Log.trace = haxe.Firebug.trace;
	js.Lib.onerror = haxe.Firebug.onError;
}
haxe.Firebug.onError = function(err,stack) {
	var buf = err + "\n";
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		buf += "Called from " + s + "\n";
	}
	haxe.Firebug.trace(buf,null);
	return true;
}
haxe.Firebug.trace = function(v,inf) {
	var type = inf != null && inf.customParams != null?inf.customParams[0]:null;
	if(type != "warn" && type != "info" && type != "debug" && type != "error") type = inf == null?"error":"log";
	console[type]((inf == null?"":inf.fileName + ":" + inf.lineNumber + " : ") + Std.string(v));
}
haxe.Firebug.prototype = {
	__class__: haxe.Firebug
}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype = {
	__class__: haxe.Log
}
haxe.Timer = $hxClasses["haxe.Timer"] = function(time_ms) {
	var me = this;
	this.id = window.setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
}
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = $hxClasses["haxe.io.Bytes"] = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.cca(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype = {
	length: null
	,b: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len = this.length < other.length?this.length:other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,toString: function() {
		return this.readString(0,this.length);
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(str.charCodeAt(i));
		}
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.b[i];
			s.b[s.b.length] = String.fromCharCode(chars[c >> 4]);
			s.b[s.b.length] = String.fromCharCode(chars[c & 15]);
		}
		return s.b.join("");
	}
	,getData: function() {
		return this.b;
	}
	,__class__: haxe.io.Bytes
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
var jasmine = jasmine || {}
jasmine.J = $hxClasses["jasmine.J"] = function() { }
jasmine.J.__name__ = ["jasmine","J"];
jasmine.J.beforeEach = function(beforeEachFunction) {
	beforeEach(beforeEachFunction);
}
jasmine.J.afterEach = function(afterEachFunction) {
	afterEach(afterEachFunction);
}
jasmine.J.describe = function(description,specDefinitions) {
	describe(description, specDefinitions);
}
jasmine.J.xdescribe = function(description,specDefinitions) {
	xdescribe(description, specDefinitions);
}
jasmine.J.it = function(description,func) {
	it(description, func);
}
jasmine.J.xit = function(description,func) {
	xit(description, func);
}
jasmine.J.expect = function(actual) {
	return expect(actual);
}
jasmine.J.runs = function(func) {
	runs(func);
}
jasmine.J.waits = function(timeoutMilliseconds) {
	waits(timeoutMilliseconds);
}
jasmine.J.waitsFor = function(func,message,timeoutMilliseconds) {
	waitsFor(func, message, timeoutMilliseconds);
}
jasmine.J.spyOn = function(x,method) {
	return spyOn(x, method);
}
jasmine.J.prototype = {
	__class__: jasmine.J
}
jasmine.Jasmine = $hxClasses["jasmine.Jasmine"] = function() { }
jasmine.Jasmine.__name__ = ["jasmine","Jasmine"];
jasmine.Jasmine.getEnv = function() {
	return jasmine.getEnv();
}
jasmine.Jasmine.newTrivialReporter = function() {
	return new jasmine.TrivialReporter();
}
jasmine.Jasmine.newHtmlReporter = function() {
	return new jasmine.HtmlReporter();
}
jasmine.Jasmine.createSpy = function(name) {
	return jasmine.createSpy(name);
}
jasmine.Jasmine.prototype = {
	__class__: jasmine.Jasmine
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return undefined;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	Function.prototype["$bind"] = function(o) {
		var f = function() {
			return f.method.apply(f.scope,arguments);
		};
		f.scope = o;
		f.method = this;
		return f;
	};
}
js.Boot.prototype = {
	__class__: js.Boot
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype = {
	__class__: js.Lib
}
var specs = specs || {}
if(!specs.co) specs.co = {}
if(!specs.co.janicek) specs.co.janicek = {}
if(!specs.co.janicek.core) specs.co.janicek.core = {}
specs.co.janicek.core.Array2dSpec = $hxClasses["specs.co.janicek.core.Array2dSpec"] = function() {
	jasmine.J.describe("Array2DCore",function() {
		jasmine.J.describe("get()",function() {
			jasmine.J.it("should get value at index",function() {
				var a = [[1]];
				jasmine.J.expect(co.janicek.core.array.Array2dCore.get(a,0,0)).toEqual(1);
			});
		});
		jasmine.J.describe("set()",function() {
			jasmine.J.it("should set value at index",function() {
				var a = new Array();
				jasmine.J.expect(co.janicek.core.array.Array2dCore.get(a,0,0)).toBeNull();
				co.janicek.core.array.Array2dCore.set(a,0,0,1);
				jasmine.J.expect(co.janicek.core.array.Array2dCore.get(a,0,0)).toBe(1);
			});
		});
		jasmine.J.describe("getIndices()",function() {
			jasmine.J.it("should compute 2d indices from array dimensions",function() {
				jasmine.J.expect(co.janicek.core.array.Array2dCore.getIndices(0,10,1)).toEqual({ x : 0, y : 0});
				jasmine.J.expect(co.janicek.core.array.Array2dCore.getIndices(9,10,1)).toEqual({ x : 9, y : 0});
				jasmine.J.expect(co.janicek.core.array.Array2dCore.getIndices(99,10,1)).toEqual({ x : 9, y : 9});
				jasmine.J.expect(co.janicek.core.array.Array2dCore.getIndices(90,10,1)).toEqual({ x : 0, y : 9});
				jasmine.J.expect(co.janicek.core.array.Array2dCore.getIndices(0,10,2)).toEqual({ x : 0, y : 0});
				jasmine.J.expect(co.janicek.core.array.Array2dCore.getIndices(18,10,2)).toEqual({ x : 9, y : 0});
				jasmine.J.expect(co.janicek.core.array.Array2dCore.getIndices(198,10,2)).toEqual({ x : 9, y : 9});
				jasmine.J.expect(co.janicek.core.array.Array2dCore.getIndices(180,10,2)).toEqual({ x : 0, y : 9});
				jasmine.J.expect(co.janicek.core.array.Array2dCore.getIndices(0,46,4)).toEqual({ x : 0, y : 0});
				jasmine.J.expect(co.janicek.core.array.Array2dCore.getIndices(5,6,1)).toEqual({ x : 5, y : 0});
			});
		});
		jasmine.J.describe("foreachY()",function() {
			jasmine.J.it("should iterate y indexes (rows)",function() {
				var a = [[1],[2]];
				var row = 0;
				co.janicek.core.array.Array2dCore.foreachY(a,function(y) {
					jasmine.J.expect(co.janicek.core.array.Array2dCore.get(a,0,row)).toEqual(y[0]);
					row++;
				});
				jasmine.J.expect(row).toEqual(a.length);
			});
		});
		jasmine.J.describe("foreachXY()",function() {
			jasmine.J.it("should iterate x,y indexes (cells)",function() {
				var a = [[1,2],[3,4]];
				co.janicek.core.array.Array2dCore.foreachXY(a,function(x,y,value) {
					jasmine.J.expect(co.janicek.core.array.Array2dCore.get(a,x,y)).toEqual(value);
				});
			});
		});
		jasmine.J.describe("any()",function() {
			jasmine.J.it("should find index of anything in array",function() {
				var a = [[1,2],[3,4]];
				var index = co.janicek.core.array.Array2dCore.any(a,function(value) {
					return value == 4;
				});
				jasmine.J.expect(index).toEqual({ x : 1, y : 1});
			});
		});
		jasmine.J.describe("dimensions()",function() {
			jasmine.J.it("should get valid dimensions of array",function() {
				var a = new Array();
				jasmine.J.expect(co.janicek.core.array.Array2dCore.dimensions(a)).toEqual({ x : 0, y : 0});
				co.janicek.core.array.Array2dCore.set(a,5,5,1);
				jasmine.J.expect(co.janicek.core.array.Array2dCore.dimensions(a)).toEqual({ x : 6, y : 6});
			});
		});
		jasmine.J.describe("values()",function() {
			jasmine.J.it("should produce array value iterator",function() {
				var a = new Array();
				jasmine.J.expect(Lambda.empty(co.janicek.core.array.Array2dCore.values(a))).toBeTruthy();
				jasmine.J.expect(Lambda.count(co.janicek.core.array.Array2dCore.values(a))).toEqual(0);
				co.janicek.core.array.Array2dCore.set(a,0,0,1);
				jasmine.J.expect(Lambda.count(co.janicek.core.array.Array2dCore.values(a))).toEqual(1);
				Lambda.iter(co.janicek.core.array.Array2dCore.values(a),function(value) {
					jasmine.J.expect(value).toEqual(1);
				});
				co.janicek.core.array.Array2dCore.set(a,10,10,1);
				jasmine.J.expect(Lambda.count(co.janicek.core.array.Array2dCore.values(a))).toEqual(2);
			});
		});
		jasmine.J.describe("indexes()",function() {
			jasmine.J.it("should produce array index iterator",function() {
				var a = new Array();
				jasmine.J.expect(Lambda.empty(co.janicek.core.array.Array2dCore.indexes(a))).toBeTruthy();
				jasmine.J.expect(Lambda.count(co.janicek.core.array.Array2dCore.indexes(a))).toBe(0);
				co.janicek.core.array.Array2dCore.set(a,0,0,1);
				jasmine.J.expect(Lambda.count(co.janicek.core.array.Array2dCore.indexes(a))).toBe(1);
				Lambda.iter(co.janicek.core.array.Array2dCore.indexes(a),function(index) {
					jasmine.J.expect(index).toEqual({ x : 0, y : 0});
				});
				co.janicek.core.array.Array2dCore.set(a,1,1,1);
				jasmine.J.expect(Lambda.count(co.janicek.core.array.Array2dCore.indexes(a))).toBe(2);
				co.janicek.core.array.Array2dCore.set(a,10,10,1);
				jasmine.J.expect(Lambda.count(co.janicek.core.array.Array2dCore.indexes(a))).toBe(3);
			});
		});
	});
};
specs.co.janicek.core.Array2dSpec.__name__ = ["specs","co","janicek","core","Array2dSpec"];
specs.co.janicek.core.Array2dSpec.prototype = {
	__class__: specs.co.janicek.core.Array2dSpec
}
specs.co.janicek.core.BaseCode64Spec = $hxClasses["specs.co.janicek.core.BaseCode64Spec"] = function() {
	jasmine.J.describe("BaseCode64",function() {
		jasmine.J.it("should encode and decode every byte value",function() {
			var byteValueStart = 0;
			var byteCount = 256;
			var bytes = haxe.io.Bytes.alloc(byteCount);
			var _g = 0;
			while(_g < byteCount) {
				var i = _g++;
				bytes.b[i] = byteValueStart + i & 255;
			}
			var bytesData = bytes.b;
			var encodedData = co.janicek.core.BaseCode64.base64EncodeBytesData(bytesData);
			jasmine.J.expect(Std.string(co.janicek.core.BaseCode64.base64DecodeBytesData(encodedData))).toEqual(Std.string(bytesData));
		});
		jasmine.J.describe("base64EncodeBytesData()",function() {
			jasmine.J.it("should encode byte data",function() {
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeBytesData(haxe.io.Bytes.ofString("bytes").b));
			});
		});
		jasmine.J.describe("base64DecodeBytesData()",function() {
			jasmine.J.it("should decode byte data",function() {
				jasmine.J.expect(co.janicek.core.BaseCode64.base64DecodeBytesData(co.janicek.core.BaseCode64.base64EncodeBytesData(haxe.io.Bytes.ofString("bytes").b)));
			});
		});
		jasmine.J.describe("base64EncodeString()",function() {
			jasmine.J.it("should encode strings",function() {
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeString("pleasure.")).toEqual("cGxlYXN1cmUu");
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeString("leasure.")).toEqual("bGVhc3VyZS4=");
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeString("easure.")).toEqual("ZWFzdXJlLg==");
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeString("asure.")).toEqual("YXN1cmUu");
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeString("sure.")).toEqual("c3VyZS4=");
			});
		});
		jasmine.J.describe("base64DecodeString()",function() {
			jasmine.J.it("should decode strings",function() {
				jasmine.J.expect(co.janicek.core.BaseCode64.base64DecodeString(co.janicek.core.BaseCode64.base64EncodeString("pleasure."))).toEqual("pleasure.");
			});
		});
	});
};
specs.co.janicek.core.BaseCode64Spec.__name__ = ["specs","co","janicek","core","BaseCode64Spec"];
specs.co.janicek.core.BaseCode64Spec.prototype = {
	__class__: specs.co.janicek.core.BaseCode64Spec
}
specs.co.janicek.core.PathCoreSpec = $hxClasses["specs.co.janicek.core.PathCoreSpec"] = function() {
	jasmine.J.describe("PathCore",function() {
		jasmine.J.describe("getDirectoryName()",function() {
			jasmine.J.it("should get directory name from path that includes filename",function() {
				jasmine.J.expect(co.janicek.core.PathCore.getDirectoryName("a/b.txt")).toEqual("a");
			});
		});
		jasmine.J.describe("getFileName()",function() {
			jasmine.J.it("should get file name from path",function() {
				jasmine.J.expect(co.janicek.core.PathCore.getFileName("a/b.txt")).toEqual("b.txt");
			});
		});
		jasmine.J.describe("removeFileNameExtension()",function() {
			jasmine.J.it("should remove exentsion from path",function() {
				jasmine.J.expect(co.janicek.core.PathCore.removeFileNameExtension("a/b.txt")).toEqual("a/b");
			});
			jasmine.J.it("should remove exentsion from file name",function() {
				jasmine.J.expect(co.janicek.core.PathCore.removeFileNameExtension("b.txt")).toEqual("b");
			});
			jasmine.J.it("should not remove exentsion from file name without an extension",function() {
				jasmine.J.expect(co.janicek.core.PathCore.removeFileNameExtension("filename")).toEqual("filename");
			});
		});
	});
};
specs.co.janicek.core.PathCoreSpec.__name__ = ["specs","co","janicek","core","PathCoreSpec"];
specs.co.janicek.core.PathCoreSpec.prototype = {
	__class__: specs.co.janicek.core.PathCoreSpec
}
specs.co.janicek.core.StringCoreSpec = $hxClasses["specs.co.janicek.core.StringCoreSpec"] = function() {
	jasmine.J.describe("StringCore",function() {
		jasmine.J.describe("removeFromEnd()",function() {
			jasmine.J.it("should remove one string from the end of another string",function() {
				jasmine.J.expect(co.janicek.core.StringCore.removeFromEnd("ab","b")).toEqual("a");
			});
		});
		jasmine.J.describe("isNullOrEmpty()",function() {
			jasmine.J.it("should check if string is null or empty",function() {
				jasmine.J.expect(co.janicek.core.StringCore.isNullOrEmpty("")).toBeTruthy();
				jasmine.J.expect(co.janicek.core.StringCore.isNullOrEmpty(null)).toBeTruthy();
				jasmine.J.expect(co.janicek.core.StringCore.isNullOrEmpty("not null or empty")).toBeFalsy();
			});
		});
		jasmine.J.describe("isInteger()",function() {
			jasmine.J.it("should return true is string is an Integer",function() {
				jasmine.J.expect(co.janicek.core.StringCore.isInteger("0")).toBeTruthy();
				jasmine.J.expect(co.janicek.core.StringCore.isInteger("1")).toBeTruthy();
				jasmine.J.expect(co.janicek.core.StringCore.isInteger("-1")).toBeTruthy();
			});
			jasmine.J.it("should return false if string is not an Integer",function() {
				jasmine.J.expect(co.janicek.core.StringCore.isInteger("")).toBeFalsy();
				jasmine.J.expect(co.janicek.core.StringCore.isInteger(" ")).toBeFalsy();
				jasmine.J.expect(co.janicek.core.StringCore.isInteger("0.0")).toBeFalsy();
			});
		});
	});
};
specs.co.janicek.core.StringCoreSpec.__name__ = ["specs","co","janicek","core","StringCoreSpec"];
specs.co.janicek.core.StringCoreSpec.prototype = {
	__class__: specs.co.janicek.core.StringCoreSpec
}
if(!specs.co.janicek.core.html) specs.co.janicek.core.html = {}
specs.co.janicek.core.html.CanvasCoreSpec = $hxClasses["specs.co.janicek.core.html.CanvasCoreSpec"] = function() {
	jasmine.J.describe("CanvasCore",function() {
		jasmine.J.describe("loadImage()",function() {
			jasmine.J.it("should load an image from a URL",function() {
				co.janicek.core.html.CanvasCore.loadImage("images/3x3-checker-pattern.png",function(image) {
					jasmine.J.expect(image.complete).toBeTruthy();
					jasmine.J.expect(image.width).toEqual(3);
					jasmine.J.expect(image.height).toEqual(3);
				});
			});
		});
		jasmine.J.describe("getImageData()",function() {
			jasmine.J.it("should get ImageData from an Image",function() {
				co.janicek.core.html.CanvasCore.loadImage("images/3x3-checker-pattern.png",function(image) {
					var imageData = co.janicek.core.html.CanvasCore.getImageData(image);
					jasmine.J.expect(imageData.width).toEqual(3);
					jasmine.J.expect(imageData.height).toEqual(3);
					jasmine.J.expect(imageData.data.length).toEqual(36);
				});
			});
		});
		jasmine.J.describe("makeBitmap()",function() {
			jasmine.J.it("should convert html5 ImageData to an Array of Bool",function() {
				co.janicek.core.html.CanvasCore.loadImage("images/3x3-checker-pattern.png",function(image) {
					var imageData = co.janicek.core.html.CanvasCore.getImageData(image);
					var bitmap = co.janicek.core.html.CanvasCore.invertBitmap(co.janicek.core.html.CanvasCore.makeAverageThresholdBitmap(imageData,127));
					var o = false;
					var x = true;
					var checkerboard = [[x,o,x],[o,x,o],[x,o,x]];
					jasmine.J.expect(bitmap).toEqual(checkerboard);
				});
			});
		});
	});
};
specs.co.janicek.core.html.CanvasCoreSpec.__name__ = ["specs","co","janicek","core","html","CanvasCoreSpec"];
specs.co.janicek.core.html.CanvasCoreSpec.prototype = {
	__class__: specs.co.janicek.core.html.CanvasCoreSpec
}
specs.co.janicek.core.html.ColorCoreSpec = $hxClasses["specs.co.janicek.core.html.ColorCoreSpec"] = function() {
	jasmine.J.describe("ColorCore",function() {
		jasmine.J.describe("rgba()",function() {
			jasmine.J.it("should make html rgb string",function() {
				jasmine.J.expect(co.janicek.core.html.ColorCore.rgba(0,0,0)).toEqual("rgb(0,0,0)");
			});
			jasmine.J.it("should make html rgba string",function() {
				jasmine.J.expect(co.janicek.core.html.ColorCore.rgba(0,0,0,0)).toEqual("rgba(0,0,0,0)");
			});
			jasmine.J.it("should make html rgba string for decimal alpha",function() {
				jasmine.J.expect(co.janicek.core.html.ColorCore.rgba(0,0,0,0.5)).toEqual("rgba(0,0,0,0.5)");
			});
		});
		jasmine.J.describe("rgbaFraction()",function() {
			jasmine.J.it("should make html rgb string",function() {
				jasmine.J.expect(co.janicek.core.html.ColorCore.rgbaFraction(0.0,0.5,1)).toEqual("rgb(0%,50%,100%)");
			});
			jasmine.J.it("should make html rgba string",function() {
				jasmine.J.expect(co.janicek.core.html.ColorCore.rgbaFraction(0.0,0.5,1.0,0)).toEqual("rgba(0%,50%,100%,0)");
			});
			jasmine.J.it("should make html rgba string for decimal alpha",function() {
				jasmine.J.expect(co.janicek.core.html.ColorCore.rgbaFraction(0.0,0.5,1.0,0.5)).toEqual("rgba(0%,50%,100%,0.5)");
			});
		});
		jasmine.J.describe("colorFraction()",function() {
			jasmine.J.it("should calculate a color fraction",function() {
				jasmine.J.expect(0. | 0).toEqual(0);
				jasmine.J.expect(127.5 | 0).toEqual(127);
				jasmine.J.expect(255. | 0).toEqual(255);
			});
		});
		jasmine.J.describe("intToHexColor()",function() {
			jasmine.J.it("should make a HTML hex color codes",function() {
				jasmine.J.expect(co.janicek.core.html.ColorCore.intToHexColor(0)).toEqual("#000000");
				jasmine.J.expect(co.janicek.core.html.ColorCore.intToHexColor(16777215)).toEqual("#FFFFFF");
			});
		});
	});
};
specs.co.janicek.core.html.ColorCoreSpec.__name__ = ["specs","co","janicek","core","html","ColorCoreSpec"];
specs.co.janicek.core.html.ColorCoreSpec.prototype = {
	__class__: specs.co.janicek.core.html.ColorCoreSpec
}
if(!specs.co.janicek.core.math) specs.co.janicek.core.math = {}
specs.co.janicek.core.math.HashCoreSpec = $hxClasses["specs.co.janicek.core.math.HashCoreSpec"] = function() {
	jasmine.J.describe("HashCore",function() {
		jasmine.J.describe("djb2()",function() {
			jasmine.J.it("should make djb2 hash",function() {
				jasmine.J.expect(co.janicek.core.math.HashCore.djb2("text")).toBeDefined();
			});
		});
	});
};
specs.co.janicek.core.math.HashCoreSpec.__name__ = ["specs","co","janicek","core","math","HashCoreSpec"];
specs.co.janicek.core.math.HashCoreSpec.prototype = {
	__class__: specs.co.janicek.core.math.HashCoreSpec
}
specs.co.janicek.core.math.MathCoreSpec = $hxClasses["specs.co.janicek.core.math.MathCoreSpec"] = function() {
	jasmine.J.describe("MathCore",function() {
		jasmine.J.describe("average()",function() {
			jasmine.J.it("should calculate average from array of Floats",function() {
				jasmine.J.expect(co.janicek.core.math.MathCore.average([0.0,0.5,1])).toEqual(0.5);
			});
		});
		jasmine.J.describe("averageInt()",function() {
			jasmine.J.it("should calculate average from array of Ints",function() {
				jasmine.J.expect(co.janicek.core.math.MathCore.averageInt([1,2,3])).toEqual(2);
			});
		});
		jasmine.J.describe("degreesToRadians()",function() {
			jasmine.J.it("should convert degrees to radians",function() {
				jasmine.J.expect(co.janicek.core.math.MathCore.degreesToRadians(180)).toBe(3.141592653589793);
			});
		});
		jasmine.J.describe("isEven()",function() {
			jasmine.J.it("should test if Int is even",function() {
				jasmine.J.expect(co.janicek.core.math.MathCore.isEven(1)).toBeFalsy();
				jasmine.J.expect(co.janicek.core.math.MathCore.isEven(2)).toBeTruthy();
			});
		});
		jasmine.J.describe("isOdd()",function() {
			jasmine.J.it("should test if Int is odd",function() {
				jasmine.J.expect(co.janicek.core.math.MathCore.isOdd(1)).toBeTruthy();
				jasmine.J.expect(co.janicek.core.math.MathCore.isOdd(2)).toBeFalsy();
			});
		});
		jasmine.J.describe("radiansToDegrees()",function() {
			jasmine.J.it("should convert radians to degrees",function() {
				jasmine.J.expect(co.janicek.core.math.MathCore.radiansToDegrees(3.141592653589793)).toBe(180);
			});
		});
	});
};
specs.co.janicek.core.math.MathCoreSpec.__name__ = ["specs","co","janicek","core","math","MathCoreSpec"];
specs.co.janicek.core.math.MathCoreSpec.prototype = {
	__class__: specs.co.janicek.core.math.MathCoreSpec
}
specs.co.janicek.core.math.PerlinNoiseSpec = $hxClasses["specs.co.janicek.core.math.PerlinNoiseSpec"] = function() {
	jasmine.J.describe("PerlinNoise",function() {
		jasmine.J.describe("makePerlinNoise()",function() {
			jasmine.J.it("should make perlin noise data",function() {
				var data = co.janicek.core.math.PerlinNoise.makePerlinNoise(100,100,1.0,1.0,1.0);
				jasmine.J.expect(data).not.toBeNull();
			});
		});
	});
};
specs.co.janicek.core.math.PerlinNoiseSpec.__name__ = ["specs","co","janicek","core","math","PerlinNoiseSpec"];
specs.co.janicek.core.math.PerlinNoiseSpec.prototype = {
	__class__: specs.co.janicek.core.math.PerlinNoiseSpec
}
specs.co.janicek.core.math.RandomCoreSpec = $hxClasses["specs.co.janicek.core.math.RandomCoreSpec"] = function() {
	jasmine.J.describe("RandomCore",function() {
		jasmine.J.describe("makeRandomSeed()",function() {
			jasmine.J.it("should make a non deterministic random seed",function() {
				jasmine.J.expect(co.janicek.core.math.RandomCore.makeRandomSeed()).toBeDefined();
			});
		});
		jasmine.J.describe("nextParkMiller()",function() {
			jasmine.J.it("should generate a random int using Park Miller algorithm",function() {
				var seed = 1;
				var original = seed;
				seed = seed * 16807.0 % 2147483647.0;
				jasmine.J.expect(seed).not.toBe(original);
			});
			jasmine.J.it("should generate the same Park Miller sequence on every machine",function() {
				var seed = 1;
				var length = 1000;
				var _g = 0;
				while(_g < length) {
					var step = _g++;
					seed = seed * 16807.0 % 2147483647.0;
				}
				jasmine.J.expect(seed).toBe(522329230);
			});
			jasmine.J.it("should generate a statistically even Park Miller distribution",function() {
				var seed = 1;
				var total = 0.0;
				var length = 1000;
				var _g = 0;
				while(_g < length) {
					var step = _g++;
					seed = seed * 16807.0 % 2147483647.0;
					total += seed / 2147483647.0;
				}
				jasmine.J.expect(total / length).toBeGreaterThan(0.45);
				jasmine.J.expect(total / length).toBeLessThan(0.55);
			});
		});
		jasmine.J.describe("nextLCG()",function() {
			jasmine.J.it("should generate the same LCG sequence",function() {
				var seed = 1;
				var length = 1000;
				var _g = 0;
				while(_g < length) {
					var step = _g++;
					seed = (1103515245.0 * seed + 12345) % 2147483647.0;
				}
				jasmine.J.expect(seed).toBe(1157381547);
			});
			jasmine.J.it("should generate an even LCG distribution",function() {
				var seed = 1;
				var total = 0.0;
				var length = 1000;
				var _g = 0;
				while(_g < length) {
					var step = _g++;
					seed = (1103515245.0 * seed + 12345) % 2147483647.0;
					total += seed / 2147483647.0;
				}
				jasmine.J.expect(total / length).toBeGreaterThan(0.45);
				jasmine.J.expect(total / length).toBeLessThan(0.55);
			});
		});
		jasmine.J.describe("toFloat()",function() {
			jasmine.J.it("should convert random seed to a Float value between 0.0 and 1.0",function() {
				jasmine.J.expect(16807.0 % 2147483647.0 / 2147483647.0).toBeDefined();
			});
		});
		jasmine.J.describe("toBool()",function() {
			jasmine.J.it("should convert random seed to a Bool value (coin flip)",function() {
				jasmine.J.expect(16807.0 % 2147483647.0 / 2147483647.0 > 0.5).toBeDefined();
			});
		});
		jasmine.J.describe("toIntRange()",function() {
			jasmine.J.it("should generate an Int in range",function() {
				var iterations = 100;
				var seed = 1;
				var _g = 0;
				while(_g < iterations) {
					var step = _g++;
					seed = seed * 16807.0 % 2147483647.0;
					jasmine.J.expect(Math.round(-0.4999 + 10.9998 * (seed / 2147483647.0))).toBeGreaterThan(-1);
					jasmine.J.expect(Math.round(-0.4999 + 10.9998 * (seed / 2147483647.0))).toBeLessThan(11);
				}
			});
		});
		jasmine.J.describe("toFloatRange()",function() {
			jasmine.J.it("should generate a Float in range",function() {
				var iterations = 100;
				var seed = 1;
				var _g = 0;
				while(_g < iterations) {
					var step = _g++;
					seed = seed * 16807.0 % 2147483647.0;
					jasmine.J.expect(seed / 2147483647.0).toBeGreaterThan(-0.1);
					jasmine.J.expect(seed / 2147483647.0).toBeLessThan(1.1);
				}
			});
		});
		jasmine.J.describe("stringToSeed()",function() {
			jasmine.J.it("should convert a string to a seed",function() {
				jasmine.J.expect(co.janicek.core.math.RandomCore.stringToSeed("random seed")).toBeDefined();
			});
		});
	});
};
specs.co.janicek.core.math.RandomCoreSpec.__name__ = ["specs","co","janicek","core","math","RandomCoreSpec"];
specs.co.janicek.core.math.RandomCoreSpec.prototype = {
	__class__: specs.co.janicek.core.math.RandomCoreSpec
}
js.Boot.__res = {}
js.Boot.__init();
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = $hxClasses["Date"] = d;
	d.__name__ = ["Date"];
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	$hxClasses["Math"] = Math;
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	String.prototype.__class__ = $hxClasses["String"] = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = $hxClasses["Array"] = Array;
	Array.__name__ = ["Array"];
	var Int = $hxClasses["Int"] = { __name__ : ["Int"]};
	var Dynamic = $hxClasses["Dynamic"] = { __name__ : ["Dynamic"]};
	var Float = $hxClasses["Float"] = Number;
	Float.__name__ = ["Float"];
	var Bool = $hxClasses["Bool"] = Boolean;
	Bool.__ename__ = ["Bool"];
	var Class = $hxClasses["Class"] = { __name__ : ["Class"]};
	var Enum = { };
	var Void = $hxClasses["Void"] = { __ename__ : ["Void"]};
}
{
	if(typeof document != "undefined") js.Lib.document = document;
	if(typeof window != "undefined") {
		js.Lib.window = window;
		js.Lib.window.onerror = function(msg,url,line) {
			var f = js.Lib.onerror;
			if(f == null) return false;
			return f(msg,[url + ":" + line]);
		};
	}
}
co.janicek.core.BaseCode64.BASE_64_ENCODINGS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
co.janicek.core.BaseCode64.BASE_64_PADDING = "=";
co.janicek.core.html.CanvasCore.CANVAS_ELEMENTS_PER_PIXEL = 4;
co.janicek.core.html.CanvasCore.CANVAS_RED_OFFSET = 0;
co.janicek.core.html.CanvasCore.CANVAS_GREEN_OFFSET = 1;
co.janicek.core.html.CanvasCore.CANVAS_BLUE_OFFSET = 2;
co.janicek.core.html.CanvasCore.CANVAS_ALPHA_OFFSET = 3;
co.janicek.core.html.ColorCore.MAX_COLOR_COMPONENT = 255;
co.janicek.core.math.MathCore.INT32_MAX = 2147483647;
co.janicek.core.math.PerlinNoise.p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
co.janicek.core.math.RandomCore.MPM = 2147483647.0;
co.janicek.core.math.RandomCore.MINSTD = 16807.0;
js.Lib.onerror = null;
Main.main()
//@ sourceMappingURL=janicek-core.js.map