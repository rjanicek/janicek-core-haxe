(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.b += Std.string(this.matchedLeft());
			buf.b += Std.string(f(this));
			s = this.matchedRight();
		}
		buf.b += Std.string(s);
		return buf.b;
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
}
var Hash = function() {
	this.h = { };
};
Hash.__name__ = true;
Hash.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
}
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.__name__ = true;
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
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
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
}
var MainBrowser = function() { }
MainBrowser.__name__ = true;
MainBrowser.main = function() {
	if(haxe.Firebug.detect()) haxe.Firebug.redirectTraces();
	js.mocha.Mocha.setup({ ui : js.mocha.Ui.BDD});
	new specs.co.janicek.core.html.CanvasCoreSpec();
	new specs.co.janicek.core.Array2dSpec();
	new specs.co.janicek.core.BaseCode64Spec();
	new specs.co.janicek.core.math.HashCoreSpec();
	new specs.co.janicek.core.HashTableCoreSpec();
	new specs.co.janicek.core.html.HtmlColorCoreSpec();
	new specs.co.janicek.core.http.HttpCookieCoreSpec();
	new specs.co.janicek.core.math.MathCoreSpec();
	new specs.co.janicek.core.NullCoreSpec();
	new specs.co.janicek.core.PathCoreSpec();
	new specs.co.janicek.core.math.PerlinNoiseSpec();
	new specs.co.janicek.core.math.RandomCoreSpec();
	new specs.co.janicek.core.StringCoreSpec();
	new specs.co.janicek.core.http.UrlCoreSpec();
	new specs.co.janicek.core.math.UUIDSpec();
	js.mocha.Mocha.run();
}
var Reflect = function() { }
Reflect.__name__ = true;
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
var StringTools = function() { }
StringTools.__name__ = true;
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
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
var co = {}
co.janicek = {}
co.janicek.core = {}
co.janicek.core.BaseCode64 = function() { }
co.janicek.core.BaseCode64.__name__ = true;
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
	if(paddingSize != -1) base64 = HxOverrides.substr(base64,0,base64.length - paddingSize);
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
co.janicek.core.HashTableCore = function() { }
co.janicek.core.HashTableCore.__name__ = true;
co.janicek.core.HashTableCore.parseHashTable = function(rawHashTable,keyValueDelimeterRegexPattern,pairDelimeterRegexPattern) {
	if(pairDelimeterRegexPattern == null) pairDelimeterRegexPattern = "&";
	if(keyValueDelimeterRegexPattern == null) keyValueDelimeterRegexPattern = "=";
	var hashTable = new Hash();
	if(!(rawHashTable == null || rawHashTable.length == 0)) {
		var keyValueSplitter = new EReg(keyValueDelimeterRegexPattern,"");
		Lambda.iter(new EReg(pairDelimeterRegexPattern,"").split(rawHashTable),function(rawKeyValuePair) {
			var item = keyValueSplitter.split(rawKeyValuePair);
			if(item.length == 1) hashTable.set(item[0],""); else if(item.length > 1) hashTable.set(item[0],item[1]);
		});
	}
	return hashTable;
}
co.janicek.core.HashTableCore.stringifyHashTable = function(ht,keyValueDelimeter,pairDelimeter) {
	if(pairDelimeter == null) pairDelimeter = "&";
	if(keyValueDelimeter == null) keyValueDelimeter = "=";
	return Lambda.fold({ iterator : $bind(ht,ht.keys)},function(key,buf) {
		var value = ht.get(key);
		return (buf.length == 0?"":buf + pairDelimeter) + key + (value == null || value.length == 0?"":keyValueDelimeter + value);
	},"");
}
co.janicek.core.LambdaCore = function() { }
co.janicek.core.LambdaCore.__name__ = true;
co.janicek.core.LambdaCore.first = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return x;
	}
	return null;
}
co.janicek.core.NullCore = function() { }
co.janicek.core.NullCore.__name__ = true;
co.janicek.core.NullCore.coalesce = function(nullable,defaultValue) {
	return nullable == null?defaultValue:nullable;
}
co.janicek.core.NullCore.coalesceIter = function(nullables) {
	return co.janicek.core.LambdaCore.first(nullables,function(n) {
		return n != null;
	});
}
co.janicek.core.PathCore = function() { }
co.janicek.core.PathCore.__name__ = true;
co.janicek.core.PathCore.getDirectoryName = function(path,pathDelimeter) {
	if(pathDelimeter == null) pathDelimeter = "/";
	return HxOverrides.substr(path,0,path.lastIndexOf(pathDelimeter));
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
co.janicek.core.StringCore = function() { }
co.janicek.core.StringCore.__name__ = true;
co.janicek.core.StringCore.removeFromEnd = function(string,pattern) {
	if(StringTools.endsWith(string,pattern)) return HxOverrides.substr(string,0,string.lastIndexOf(pattern));
	return string;
}
co.janicek.core.StringCore.contains = function(string,pattern) {
	return string.indexOf(pattern) != -1;
}
co.janicek.core.StringCore.isInteger = function(s) {
	if(co.janicek.core.StringCore.contains(s,".")) return false;
	return Std.parseInt(s) != null;
}
co.janicek.core.array = {}
co.janicek.core.array.Array2dCore = function() { }
co.janicek.core.array.Array2dCore.__name__ = true;
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
co.janicek.core.array.Array2dIterator = function(a) {
	this.a = a;
	this.y = 0;
	this.x = 0;
	this.nextValue = null;
};
co.janicek.core.array.Array2dIterator.__name__ = true;
co.janicek.core.array.Array2dIterator.prototype = {
	next: function() {
		var n = this.nextValue;
		this.nextValue = null;
		return n;
	}
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
}
co.janicek.core.array.Array2dValueIterator = function(a) {
	this.yIterator = HxOverrides.iter(a);
	this.xIterator = null;
	this.nextValue = null;
};
co.janicek.core.array.Array2dValueIterator.__name__ = true;
co.janicek.core.array.Array2dValueIterator.prototype = {
	next: function() {
		var n = this.nextValue;
		this.nextValue = null;
		return n;
	}
	,hasNext: function() {
		if(this.nextValue != null) return true;
		if(this.xIterator != null) while(this.xIterator.hasNext()) {
			this.nextValue = this.xIterator.next();
			if(this.nextValue != null) return true;
		}
		while(this.yIterator.hasNext()) {
			var z = this.yIterator.next();
			if(z != null) {
				this.xIterator = HxOverrides.iter(z);
				return this.hasNext();
			}
		}
		return false;
	}
}
co.janicek.core.html = {}
co.janicek.core.html.CanvasCore = function() { }
co.janicek.core.html.CanvasCore.__name__ = true;
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
co.janicek.core.html.CanvasCore.loadImage = function(url,f) {
	var image = new Image();
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
		return co.janicek.core.math.MathCore.averageInt([red,green,blue]) >= threshold;
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
co.janicek.core.html.HtmlColor = { __ename__ : true, __constructs__ : ["Color","Rgb","Rgba","RgbF","RgbaF","Hsl","Hsla"] }
co.janicek.core.html.HtmlColor.Color = function(color) { var $x = ["Color",0,color]; $x.__enum__ = co.janicek.core.html.HtmlColor; $x.toString = $estr; return $x; }
co.janicek.core.html.HtmlColor.Rgb = function(r,g,b) { var $x = ["Rgb",1,r,g,b]; $x.__enum__ = co.janicek.core.html.HtmlColor; $x.toString = $estr; return $x; }
co.janicek.core.html.HtmlColor.Rgba = function(red,green,blue,alpha) { var $x = ["Rgba",2,red,green,blue,alpha]; $x.__enum__ = co.janicek.core.html.HtmlColor; $x.toString = $estr; return $x; }
co.janicek.core.html.HtmlColor.RgbF = function(red,green,blue) { var $x = ["RgbF",3,red,green,blue]; $x.__enum__ = co.janicek.core.html.HtmlColor; $x.toString = $estr; return $x; }
co.janicek.core.html.HtmlColor.RgbaF = function(red,green,blue,alpha) { var $x = ["RgbaF",4,red,green,blue,alpha]; $x.__enum__ = co.janicek.core.html.HtmlColor; $x.toString = $estr; return $x; }
co.janicek.core.html.HtmlColor.Hsl = function(hue,saturation,lightness) { var $x = ["Hsl",5,hue,saturation,lightness]; $x.__enum__ = co.janicek.core.html.HtmlColor; $x.toString = $estr; return $x; }
co.janicek.core.html.HtmlColor.Hsla = function(hue,saturation,lightness,alpha) { var $x = ["Hsla",6,hue,saturation,lightness,alpha]; $x.__enum__ = co.janicek.core.html.HtmlColor; $x.toString = $estr; return $x; }
co.janicek.core.html.HtmlColors = function() { }
co.janicek.core.html.HtmlColors.__name__ = true;
co.janicek.core.html.HtmlColors.toString = function(c) {
	return (function($this) {
		var $r;
		var $e = (c);
		switch( $e[1] ) {
		case 0:
			var c1 = $e[2];
			$r = co.janicek.core.html.HtmlColorCore.intToHexColor(c1);
			break;
		case 1:
			var b = $e[4], g = $e[3], r = $e[2];
			$r = co.janicek.core.html.HtmlColorCore.rgb(r,g,b);
			break;
		case 2:
			var a = $e[5], b = $e[4], g = $e[3], r = $e[2];
			$r = co.janicek.core.html.HtmlColorCore.rgba(r,g,b,a);
			break;
		case 3:
			var b = $e[4], g = $e[3], r = $e[2];
			$r = co.janicek.core.html.HtmlColorCore.rgbF(r,g,b);
			break;
		case 4:
			var a = $e[5], b = $e[4], g = $e[3], r = $e[2];
			$r = co.janicek.core.html.HtmlColorCore.rgbaF(r,g,b,a);
			break;
		case 5:
			var l = $e[4], s = $e[3], h = $e[2];
			$r = co.janicek.core.html.HtmlColorCore.hsl(h,s,l);
			break;
		case 6:
			var a = $e[5], l = $e[4], s = $e[3], h = $e[2];
			$r = co.janicek.core.html.HtmlColorCore.hsla(h,s,l,a);
			break;
		}
		return $r;
	}(this));
}
co.janicek.core.html.HtmlColorCore = function() { }
co.janicek.core.html.HtmlColorCore.__name__ = true;
co.janicek.core.html.HtmlColorCore.intToHexColor = function(color) {
	return "#" + StringTools.hex(color,6);
}
co.janicek.core.html.HtmlColorCore.rgb = function(red,green,blue) {
	return "rgb(" + red + "," + green + "," + blue + ")";
}
co.janicek.core.html.HtmlColorCore.rgba = function(red,green,blue,alpha) {
	return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}
co.janicek.core.html.HtmlColorCore.rgbF = function(red,green,blue) {
	return "rgb(" + red * 100 + "%," + green * 100 + "%," + blue * 100 + "%)";
}
co.janicek.core.html.HtmlColorCore.rgbaF = function(red,green,blue,alpha) {
	return "rgba(" + red * 100 + "%," + green * 100 + "%," + blue * 100 + "%," + alpha + ")";
}
co.janicek.core.html.HtmlColorCore.hsl = function(hue,saturation,lightness) {
	return "hsl(" + hue + "," + saturation * 100 + "%," + lightness * 100 + "%)";
}
co.janicek.core.html.HtmlColorCore.hsla = function(hue,saturation,lightness,alpha) {
	return "hsla(" + hue + "," + saturation * 100 + "%," + lightness * 100 + "%," + alpha + ")";
}
co.janicek.core.http = {}
co.janicek.core.http.HttpCookieCore = function() { }
co.janicek.core.http.HttpCookieCore.__name__ = true;
co.janicek.core.http.HttpCookieCore.parseCookies = function(rawCookies) {
	return co.janicek.core.HashTableCore.parseHashTable(rawCookies,"=","[;,] ");
}
co.janicek.core.http.UrlCore = function() { }
co.janicek.core.http.UrlCore.__name__ = true;
co.janicek.core.http.UrlCore.makeEmptyUrl = function() {
	return { source : "", protocol : "", authority : "", userInfo : "", user : "", password : "", host : "", port : "", relative : "", path : "", directory : "", file : "", query : "", fragment : ""};
}
co.janicek.core.http.UrlCore.parseUrl = function(url) {
	var urlParts = co.janicek.core.http.UrlCore.makeEmptyUrl();
	var r = new EReg("^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?://)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\\d*))?)(((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[?#]|$)))*/?)?([^?#/]*))(?:\\?([^#]*))?(?:#(.*))?)","");
	r.match(url);
	var i = 0;
	var _g = 0, _g1 = Reflect.fields(urlParts);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		var part = co.janicek.core.NullCore.coalesce(r.matched(i),"");
		urlParts[field] = part;
		i++;
	}
	return urlParts;
}
co.janicek.core.http.UrlCore.parseUrlQuery = function(query) {
	return co.janicek.core.HashTableCore.parseHashTable(query,"=","&");
}
co.janicek.core.math = {}
co.janicek.core.math.HashCore = function() { }
co.janicek.core.math.HashCore.__name__ = true;
co.janicek.core.math.HashCore.djb2 = function(s) {
	var hash = 5381;
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		hash = (hash << 5) + hash + HxOverrides.cca(s,i);
	}
	return hash;
}
co.janicek.core.math.MathCore = function() { }
co.janicek.core.math.MathCore.__name__ = true;
co.janicek.core.math.MathCore.isEven = function(n) {
	return n % 2 == 0;
}
co.janicek.core.math.MathCore.isOdd = function(n) {
	return !co.janicek.core.math.MathCore.isEven(n);
}
co.janicek.core.math.MathCore.clampInt = function(value,minOrMax1,minOrMax2) {
	return co.janicek.core.math.MathCore.clamp(value,minOrMax1,minOrMax2) | 0;
}
co.janicek.core.math.MathCore.clamp = function(value,minOrMax1,minOrMax2) {
	var min = Math.min(minOrMax1,minOrMax2);
	var max = Math.max(minOrMax1,minOrMax2);
	return value < min?min:value > max?max:value;
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
co.janicek.core.math.PerlinNoise = function() { }
co.janicek.core.math.PerlinNoise.__name__ = true;
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
co.janicek.core.math.RandomCore = function() { }
co.janicek.core.math.RandomCore.__name__ = true;
co.janicek.core.math.RandomCore.makeRandomSeed = function() {
	return Math.floor(Math.random() * 2147483647.0);
}
co.janicek.core.math.RandomCore.stringToSeed = function(s) {
	return co.janicek.core.math.HashCore.djb2(s) % 2147483647.0 | 0;
}
co.janicek.core.math.UUID = function() { }
co.janicek.core.math.UUID.__name__ = true;
co.janicek.core.math.UUID.uuid = function(length,radix,seed) {
	if(seed == null) seed = co.janicek.core.math.RandomCore.makeRandomSeed();
	var chars = co.janicek.core.math.UUID.CHARS, uuid = [], i;
	radix = co.janicek.core.math.MathCore.clampInt(radix == null?chars.length:radix,2,chars.length);
	var _g = 0;
	while(_g < length) {
		var i1 = _g++;
		uuid[i1] = chars[0 | ((seed = seed * 16807.0 % 2147483647.0 | 0) / 2147483647.0 * radix | 0)];
	}
	return uuid.join("");
}
co.janicek.core.math.UUID.uuidRfc4122V4 = function(seed) {
	if(seed == null) seed = co.janicek.core.math.RandomCore.makeRandomSeed();
	var chars = co.janicek.core.math.UUID.CHARS, uuid = [], i;
	var r;
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
	uuid[14] = "4";
	var _g = 0;
	while(_g < 36) {
		var i1 = _g++;
		if(uuid[i1] == null) {
			r = 0 | ((seed = seed * 16807.0 % 2147483647.0 | 0) / 2147483647.0 * 16 | 0);
			uuid[i1] = chars[i1 == 19?r & 3 | 8:r];
		}
	}
	return uuid.join("");
}
co.janicek.core.math.UUID.uuidFast = function(seed) {
	if(seed == null) seed = co.janicek.core.math.RandomCore.makeRandomSeed();
	var chars = co.janicek.core.math.UUID.CHARS, uuid = new Array(), rnd = 0, r;
	var _g = 0;
	while(_g < 36) {
		var i = _g++;
		if(i == 8 || i == 13 || i == 18 || i == 23) uuid[i] = "-"; else if(i == 14) uuid[i] = "4"; else {
			if(rnd <= 2) rnd = 33554432 + ((seed = seed * 16807.0 % 2147483647.0 | 0) / 2147483647.0 * 16777216 | 0) | 0;
			r = rnd & 15;
			rnd = rnd >> 4;
			uuid[i] = chars[i == 19?r & 3 | 8:r];
		}
	}
	return uuid.join("");
}
co.janicek.core.math.UUID.uuidCompact = function(seed) {
	if(seed == null) seed = co.janicek.core.math.RandomCore.makeRandomSeed();
	return new EReg("[xy]","g").customReplace("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",function(c) {
		var r = (seed = seed * 16807.0 % 2147483647.0 | 0) / 2147483647.0 * 16 | 0 | 0, v = c.matched(0) == "x"?r:r & 3 | 8;
		return StringTools.hex(v);
	});
}
var haxe = {}
haxe.BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
};
haxe.BaseCode.__name__ = true;
haxe.BaseCode.prototype = {
	decodeBytes: function(b) {
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
}
haxe.Firebug = function() { }
haxe.Firebug.__name__ = true;
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
haxe.Log = function() { }
haxe.Log.__name__ = true;
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.__name__ = true;
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
		var c = s.charCodeAt(i);
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
	toString: function() {
		return this.readString(0,this.length);
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
}
haxe.io.Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
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
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
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
js.Lib = function() { }
js.Lib.__name__ = true;
js.expect = {}
js.expect.E = function() { }
js.expect.E.__name__ = true;
js.expect.E.expect = function(actual) {
	return js.expect.E._expect(actual);
}
js.expect.E.should = function(actual) {
	return js.expect.E._expect(actual);
}
js.expect.E.getVersion = function() {
	return js.expect.E._expect.version;
}
js.mocha = {}
js.mocha.Ui = { __ename__ : true, __constructs__ : ["BDD","EXPORTS","QUNIT","TDD"] }
js.mocha.Ui.BDD = ["BDD",0];
js.mocha.Ui.BDD.toString = $estr;
js.mocha.Ui.BDD.__enum__ = js.mocha.Ui;
js.mocha.Ui.EXPORTS = ["EXPORTS",1];
js.mocha.Ui.EXPORTS.toString = $estr;
js.mocha.Ui.EXPORTS.__enum__ = js.mocha.Ui;
js.mocha.Ui.QUNIT = ["QUNIT",2];
js.mocha.Ui.QUNIT.toString = $estr;
js.mocha.Ui.QUNIT.__enum__ = js.mocha.Ui;
js.mocha.Ui.TDD = ["TDD",3];
js.mocha.Ui.TDD.toString = $estr;
js.mocha.Ui.TDD.__enum__ = js.mocha.Ui;
js.mocha.Mocha = function() { }
js.mocha.Mocha.__name__ = true;
js.mocha.Mocha.setup = function(opts) {
	opts.ui = Std.string(opts.ui).toLowerCase();
	if(Reflect.hasField(opts,"reporter")) opts.reporter = Std.string(opts.reporter).toLowerCase();
	js.mocha.Mocha._mocha.setup(opts);
}
js.mocha.Mocha.run = function() {
	js.mocha.Mocha.patchString();
	js.mocha.Mocha._mocha.run();
}
js.mocha.Mocha.patchString = function() {
	if(!String.prototype.trim) String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g,'');
	};
}
js.mocha.M = function() { }
js.mocha.M.__name__ = true;
js.mocha.M.describe = function(description,spec) {
	describe(description, spec);
}
js.mocha.M.it = function(description,func) {
	it(description, func);
}
js.mocha.M.setup = function(func) {
	setup(func);
}
var specs = {}
specs.co = {}
specs.co.janicek = {}
specs.co.janicek.core = {}
specs.co.janicek.core.Array2dSpec = function() {
	js.mocha.M.describe("Array2DCore",function() {
		js.mocha.M.describe("get()",function() {
			js.mocha.M.it("should get value at index",function() {
				var a = [[1]];
				js.expect.E.should(co.janicek.core.array.Array2dCore.get(a,0,0)).equal(1);
			});
		});
		js.mocha.M.describe("set()",function() {
			js.mocha.M.it("should set value at index",function() {
				var a = new Array();
				js.expect.E.should(co.janicek.core.array.Array2dCore.get(a,0,0)).equal(null);
				co.janicek.core.array.Array2dCore.set(a,0,0,1);
				js.expect.E.should(co.janicek.core.array.Array2dCore.get(a,0,0)).equal(1);
			});
		});
		js.mocha.M.describe("getIndices()",function() {
			js.mocha.M.it("should compute 2d indices from array dimensions",function() {
				js.expect.E.should(co.janicek.core.array.Array2dCore.getIndices(0,10,1)).eql({ x : 0, y : 0});
				js.expect.E.should(co.janicek.core.array.Array2dCore.getIndices(9,10,1)).eql({ x : 9, y : 0});
				js.expect.E.should(co.janicek.core.array.Array2dCore.getIndices(99,10,1)).eql({ x : 9, y : 9});
				js.expect.E.should(co.janicek.core.array.Array2dCore.getIndices(90,10,1)).eql({ x : 0, y : 9});
				js.expect.E.should(co.janicek.core.array.Array2dCore.getIndices(0,10,2)).eql({ x : 0, y : 0});
				js.expect.E.should(co.janicek.core.array.Array2dCore.getIndices(18,10,2)).eql({ x : 9, y : 0});
				js.expect.E.should(co.janicek.core.array.Array2dCore.getIndices(198,10,2)).eql({ x : 9, y : 9});
				js.expect.E.should(co.janicek.core.array.Array2dCore.getIndices(180,10,2)).eql({ x : 0, y : 9});
				js.expect.E.should(co.janicek.core.array.Array2dCore.getIndices(0,46,4)).eql({ x : 0, y : 0});
				js.expect.E.should(co.janicek.core.array.Array2dCore.getIndices(5,6,1)).eql({ x : 5, y : 0});
			});
		});
		js.mocha.M.describe("foreachY()",function() {
			js.mocha.M.it("should iterate y indexes (rows)",function() {
				var a = [[1],[2]];
				var row = 0;
				co.janicek.core.array.Array2dCore.foreachY(a,function(y) {
					js.expect.E.should(co.janicek.core.array.Array2dCore.get(a,0,row)).equal(y[0]);
					row++;
				});
				js.expect.E.should(row).equal(a.length);
			});
		});
		js.mocha.M.describe("foreachXY()",function() {
			js.mocha.M.it("should iterate x,y indexes (cells)",function() {
				var a = [[1,2],[3,4]];
				co.janicek.core.array.Array2dCore.foreachXY(a,function(x,y,value) {
					js.expect.E.should(co.janicek.core.array.Array2dCore.get(a,x,y)).equal(value);
				});
			});
		});
		js.mocha.M.describe("any()",function() {
			js.mocha.M.it("should find index of anything in array",function() {
				var a = [[1,2],[3,4]];
				var index = co.janicek.core.array.Array2dCore.any(a,function(value) {
					return value == 4;
				});
				js.expect.E.should(index).eql({ x : 1, y : 1});
			});
		});
		js.mocha.M.describe("dimensions()",function() {
			js.mocha.M.it("should get valid dimensions of array",function() {
				var a = new Array();
				js.expect.E.should(co.janicek.core.array.Array2dCore.dimensions(a)).eql({ x : 0, y : 0});
				co.janicek.core.array.Array2dCore.set(a,5,5,1);
				js.expect.E.should(co.janicek.core.array.Array2dCore.dimensions(a)).eql({ x : 6, y : 6});
			});
		});
		js.mocha.M.describe("values()",function() {
			js.mocha.M.it("should produce array value iterator",function() {
				var a = new Array();
				js.expect.E.should(Lambda.empty(co.janicek.core.array.Array2dCore.values(a))).be.ok();
				js.expect.E.should(Lambda.count(co.janicek.core.array.Array2dCore.values(a))).equal(0);
				co.janicek.core.array.Array2dCore.set(a,0,0,1);
				js.expect.E.should(Lambda.count(co.janicek.core.array.Array2dCore.values(a))).equal(1);
				Lambda.iter(co.janicek.core.array.Array2dCore.values(a),function(value) {
					js.expect.E.should(value).equal(1);
				});
				co.janicek.core.array.Array2dCore.set(a,10,10,1);
				js.expect.E.should(Lambda.count(co.janicek.core.array.Array2dCore.values(a))).equal(2);
			});
		});
		js.mocha.M.describe("indexes()",function() {
			js.mocha.M.it("should produce array index iterator",function() {
				var a = new Array();
				js.expect.E.should(Lambda.empty(co.janicek.core.array.Array2dCore.indexes(a))).be.ok();
				js.expect.E.should(Lambda.count(co.janicek.core.array.Array2dCore.indexes(a))).equal(0);
				co.janicek.core.array.Array2dCore.set(a,0,0,1);
				js.expect.E.should(Lambda.count(co.janicek.core.array.Array2dCore.indexes(a))).equal(1);
				Lambda.iter(co.janicek.core.array.Array2dCore.indexes(a),function(index) {
					js.expect.E.should(index).eql({ x : 0, y : 0});
				});
				co.janicek.core.array.Array2dCore.set(a,1,1,1);
				js.expect.E.should(Lambda.count(co.janicek.core.array.Array2dCore.indexes(a))).equal(2);
				co.janicek.core.array.Array2dCore.set(a,10,10,1);
				js.expect.E.should(Lambda.count(co.janicek.core.array.Array2dCore.indexes(a))).equal(3);
			});
		});
	});
};
specs.co.janicek.core.Array2dSpec.__name__ = true;
specs.co.janicek.core.BaseCode64Spec = function() {
	js.mocha.M.describe("BaseCode64",function() {
		js.mocha.M.it("should encode and decode every byte value",function() {
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
			js.expect.E.should(Std.string(co.janicek.core.BaseCode64.base64DecodeBytesData(encodedData))).equal(Std.string(bytesData));
		});
		js.mocha.M.describe("base64EncodeBytesData()",function() {
			js.mocha.M.it("should encode byte data",function() {
				js.expect.E.should(co.janicek.core.BaseCode64.base64EncodeBytesData(haxe.io.Bytes.ofString("bytes").b)).be.a("string");
			});
		});
		js.mocha.M.describe("base64DecodeBytesData()",function() {
			js.mocha.M.it("should decode byte data",function() {
				js.expect.E.should(co.janicek.core.BaseCode64.base64DecodeBytesData(co.janicek.core.BaseCode64.base64EncodeBytesData(haxe.io.Bytes.ofString("bytes").b))).be.an("array");
			});
		});
		js.mocha.M.describe("base64EncodeString()",function() {
			js.mocha.M.it("should encode strings",function() {
				js.expect.E.should(co.janicek.core.BaseCode64.base64EncodeString("pleasure.")).equal("cGxlYXN1cmUu");
				js.expect.E.should(co.janicek.core.BaseCode64.base64EncodeString("leasure.")).equal("bGVhc3VyZS4=");
				js.expect.E.should(co.janicek.core.BaseCode64.base64EncodeString("easure.")).equal("ZWFzdXJlLg==");
				js.expect.E.should(co.janicek.core.BaseCode64.base64EncodeString("asure.")).equal("YXN1cmUu");
				js.expect.E.should(co.janicek.core.BaseCode64.base64EncodeString("sure.")).equal("c3VyZS4=");
			});
		});
		js.mocha.M.describe("base64DecodeString()",function() {
			js.mocha.M.it("should decode strings",function() {
				js.expect.E.should(co.janicek.core.BaseCode64.base64DecodeString(co.janicek.core.BaseCode64.base64EncodeString("pleasure."))).equal("pleasure.");
			});
		});
	});
};
specs.co.janicek.core.BaseCode64Spec.__name__ = true;
specs.co.janicek.core.HashTableCoreSpec = function() {
	js.mocha.M.describe("HashTableCore",function() {
		js.mocha.M.describe("parseHashTable()",function() {
			js.mocha.M.it("should return empty hashtable from empty string",function() {
				var ht = co.janicek.core.HashTableCore.parseHashTable("");
				js.expect.E.should(Lambda.count(ht)).equal(0);
			});
			js.mocha.M.it("should parse one key / value pair",function() {
				var ht = co.janicek.core.HashTableCore.parseHashTable("key=value");
				js.expect.E.should(ht.get("key")).equal("value");
			});
			js.mocha.M.it("should parse multiple key / value pairs",function() {
				var ht = co.janicek.core.HashTableCore.parseHashTable("key1=value1&key2=value2");
				js.expect.E.should(ht.get("key1")).equal("value1");
				js.expect.E.should(ht.get("key2")).equal("value2");
			});
			js.mocha.M.it("should parse keys without values as empty",function() {
				var ht = co.janicek.core.HashTableCore.parseHashTable("key");
				js.expect.E.should(Lambda.count(ht)).equal(1);
				js.expect.E.should(ht.exists("key")).be.ok();
				js.expect.E.should(ht.get("key")).equal("");
				ht = co.janicek.core.HashTableCore.parseHashTable("key&key2");
				js.expect.E.should(Lambda.count(ht)).equal(2);
				js.expect.E.should(ht.get("key")).equal("");
				js.expect.E.should(ht.get("key2")).equal("");
			});
			js.mocha.M.it("should parse hash table with empty pair seperator pattern",function() {
				var ht = co.janicek.core.HashTableCore.parseHashTable("key=value","=","");
				js.expect.E.should(ht.get("key")).equal("value");
			});
		});
		js.mocha.M.describe("stringifyHashTable()",function() {
			js.mocha.M.it("should return empty string from empty hash table",function() {
				var ht = new Hash();
				js.expect.E.should(co.janicek.core.HashTableCore.stringifyHashTable(ht)).equal("");
			});
			js.mocha.M.it("should return a key / value pair string",function() {
				var ht = new Hash();
				ht.set("key","value");
				js.expect.E.should(co.janicek.core.HashTableCore.stringifyHashTable(ht)).equal("key=value");
			});
			js.mocha.M.it("should return multiple key / value pairs string",function() {
				var ht = new Hash();
				ht.set("key","value");
				ht.set("key2","value2");
				js.expect.E.should(co.janicek.core.HashTableCore.stringifyHashTable(ht)).equal("key=value&key2=value2");
			});
			js.mocha.M.it("should return key with empty value without key value delimeter",function() {
				var ht = new Hash();
				ht.set("key","");
				js.expect.E.should(co.janicek.core.HashTableCore.stringifyHashTable(ht)).equal("key");
				ht.set("key2","");
				js.expect.E.should(co.janicek.core.HashTableCore.stringifyHashTable(ht)).equal("key&key2");
			});
		});
	});
};
specs.co.janicek.core.HashTableCoreSpec.__name__ = true;
specs.co.janicek.core.NullCoreSpec = function() {
	js.mocha.M.describe("NullCore",function() {
		js.mocha.M.describe("isNull()",function() {
			js.mocha.M.it("should test nullable type for null",function() {
				var nullable = null;
				js.expect.E.should(nullable == null).be.ok();
				nullable = true;
				js.expect.E.should(nullable == null).not.be.ok();
				js.expect.E.should(false).not.be.ok();
				js.expect.E.should(false).not.be.ok();
				js.expect.E.should(false).not.be.ok();
				var object = { };
				js.expect.E.should(object == null).not.be.ok();
			});
			js.mocha.M.it("should test reflected nullable type for null",function() {
				var o = { property : null};
				js.expect.E.should(Reflect.field(o,"property") == null).be.ok();
			});
		});
		js.mocha.M.describe("isNotNull()",function() {
			js.mocha.M.it("should test nullable type for not null",function() {
				var nullable = null;
				js.expect.E.should(nullable != null).not.be.ok();
				nullable = true;
				js.expect.E.should(nullable != null).be.ok();
				js.expect.E.should(true).be.ok();
				js.expect.E.should(true).be.ok();
				js.expect.E.should(true).be.ok();
				var object = { };
				js.expect.E.should(object != null).be.ok();
			});
			js.mocha.M.it("should test reflected nullable type for not null",function() {
				var o = { property : null};
				js.expect.E.should(Reflect.field(o,"property") != null).not.be.ok();
			});
		});
		js.mocha.M.describe("coalesce()",function() {
			js.mocha.M.it("should coalesce a nullable by returning default value if nullable is null",function() {
				var nullable = null;
				js.expect.E.should(nullable == null?1:nullable).equal(1);
				nullable = 0;
				js.expect.E.should(nullable == null?1:nullable).equal(0);
			});
		});
		js.mocha.M.describe("coalesceIter()",function() {
			js.mocha.M.it("should return null for empty iterable",function() {
				js.expect.E.expect(co.janicek.core.NullCore.coalesceIter([])).to.equal(null);
			});
			js.mocha.M.it("should return null if no value in iterable",function() {
				js.expect.E.expect(co.janicek.core.NullCore.coalesceIter([null])).to.equal(null);
			});
			js.mocha.M.it("should return first non null value in iterable",function() {
				js.expect.E.should(co.janicek.core.NullCore.coalesceIter([null,1])).equal(1);
			});
		});
	});
};
specs.co.janicek.core.NullCoreSpec.__name__ = true;
specs.co.janicek.core.PathCoreSpec = function() {
	js.mocha.M.describe("PathCore",function() {
		js.mocha.M.describe("getDirectoryName()",function() {
			js.mocha.M.it("should get directory name from path that includes filename",function() {
				js.expect.E.should(co.janicek.core.PathCore.getDirectoryName("a/b.txt")).equal("a");
			});
		});
		js.mocha.M.describe("getFileName()",function() {
			js.mocha.M.it("should get file name from path",function() {
				js.expect.E.should(co.janicek.core.PathCore.getFileName("a/b.txt")).equal("b.txt");
			});
		});
		js.mocha.M.describe("removeFileNameExtension()",function() {
			js.mocha.M.it("should remove exentsion from path",function() {
				js.expect.E.should(co.janicek.core.PathCore.removeFileNameExtension("a/b.txt")).equal("a/b");
			});
			js.mocha.M.it("should remove exentsion from file name",function() {
				js.expect.E.should(co.janicek.core.PathCore.removeFileNameExtension("b.txt")).equal("b");
			});
			js.mocha.M.it("should not remove exentsion from file name without an extension",function() {
				js.expect.E.should(co.janicek.core.PathCore.removeFileNameExtension("filename")).equal("filename");
			});
		});
	});
};
specs.co.janicek.core.PathCoreSpec.__name__ = true;
specs.co.janicek.core.StringCoreSpec = function() {
	js.mocha.M.describe("StringCore",function() {
		js.mocha.M.describe("removeFromEnd()",function() {
			js.mocha.M.it("should remove one string from the end of another string",function() {
				js.expect.E.should(co.janicek.core.StringCore.removeFromEnd("ab","b")).equal("a");
			});
		});
		js.mocha.M.describe("isNullOrEmpty()",function() {
			js.mocha.M.it("should check if string is null or empty",function() {
				js.expect.E.should(true).be.ok();
				js.expect.E.should("".length == 0).be.ok();
				js.expect.E.should("not null or empty".length == 0).not.be.ok();
			});
		});
		js.mocha.M.describe("isInteger()",function() {
			js.mocha.M.it("should return true if string is an Integer",function() {
				js.expect.E.should(co.janicek.core.StringCore.isInteger("0")).be.ok();
				js.expect.E.should(co.janicek.core.StringCore.isInteger("1")).be.ok();
				js.expect.E.should(co.janicek.core.StringCore.isInteger("-1")).be.ok();
			});
			js.mocha.M.it("should return false if string is not an Integer",function() {
				js.expect.E.should(co.janicek.core.StringCore.isInteger("")).not.be.ok();
				js.expect.E.should(co.janicek.core.StringCore.isInteger(" ")).not.be.ok();
				js.expect.E.should(co.janicek.core.StringCore.isInteger("0.0")).not.be.ok();
			});
		});
	});
};
specs.co.janicek.core.StringCoreSpec.__name__ = true;
specs.co.janicek.core.html = {}
specs.co.janicek.core.html.CanvasCoreSpec = function() {
	js.mocha.M.describe("CanvasCore",function() {
		js.mocha.M.describe("loadImage()",function() {
			js.mocha.M.it("should load an image from a URL",function() {
				co.janicek.core.html.CanvasCore.loadImage("images/3x3-checker-pattern.png",function(image) {
					js.expect.E.should(image.complete).be.ok();
					js.expect.E.should(image.width).equal(3);
					js.expect.E.should(image.height).equal(3);
				});
			});
		});
		js.mocha.M.describe("getImageData()",function() {
			js.mocha.M.it("should get ImageData from an Image",function() {
				co.janicek.core.html.CanvasCore.loadImage("images/3x3-checker-pattern.png",function(image) {
					var imageData = co.janicek.core.html.CanvasCore.getImageData(image);
					js.expect.E.should(imageData.width).equal(3);
					js.expect.E.should(imageData.height).equal(3);
					js.expect.E.should(imageData.data.length).equal(36);
				});
			});
		});
		js.mocha.M.describe("makeBitmap()",function() {
			js.mocha.M.it("should convert html5 ImageData to an Array of Bool",function() {
				co.janicek.core.html.CanvasCore.loadImage("images/3x3-checker-pattern.png",function(image) {
					var imageData = co.janicek.core.html.CanvasCore.getImageData(image);
					var bitmap = co.janicek.core.html.CanvasCore.invertBitmap(co.janicek.core.html.CanvasCore.makeAverageThresholdBitmap(imageData,127));
					var o = false;
					var x = true;
					var checkerboard = [[x,o,x],[o,x,o],[x,o,x]];
					js.expect.E.should(bitmap).equal(checkerboard);
				});
			});
		});
	});
};
specs.co.janicek.core.html.CanvasCoreSpec.__name__ = true;
specs.co.janicek.core.html.HtmlColorCoreSpec = function() {
	js.mocha.M.describe("HtmlColorCore",function() {
		js.mocha.M.describe("getRedComponent()",function() {
			js.mocha.M.it("should get red color coponent",function() {
				js.expect.E.should(17).equal(17);
				js.expect.E.should(17).equal(17);
			});
		});
		js.mocha.M.describe("getGreenComponent()",function() {
			js.mocha.M.it("should get green color coponent",function() {
				js.expect.E.should(34).equal(34);
				js.expect.E.should(34).equal(34);
			});
		});
		js.mocha.M.describe("getBlueComponent()",function() {
			js.mocha.M.it("should get blue color coponent",function() {
				js.expect.E.should(51).equal(51);
				js.expect.E.should(51).equal(51);
			});
		});
		js.mocha.M.describe("hsla()",function() {
			js.mocha.M.it("should make html hsl string",function() {
				js.expect.E.should(co.janicek.core.html.HtmlColorCore.hsl(0,0.0,0.0)).equal("hsl(0,0%,0%)");
			});
			js.mocha.M.it("should make html hsla string",function() {
				js.expect.E.should(co.janicek.core.html.HtmlColorCore.hsla(0,0.0,0.0,0.5)).equal("hsla(0,0%,0%,0.5)");
			});
			js.mocha.M.it("should make html hsla string for decimal values",function() {
				js.expect.E.should(co.janicek.core.html.HtmlColorCore.hsla(0,0.5,1.0,1.0)).equal("hsla(0,50%,100%,1)");
			});
		});
		js.mocha.M.describe("rgba()",function() {
			js.mocha.M.it("should make html rgb string",function() {
				js.expect.E.should(co.janicek.core.html.HtmlColorCore.rgb(0,0,0)).equal("rgb(0,0,0)");
			});
			js.mocha.M.it("should make html rgba string",function() {
				js.expect.E.should(co.janicek.core.html.HtmlColorCore.rgba(0,0,0,0)).equal("rgba(0,0,0,0)");
			});
			js.mocha.M.it("should make html rgba string for decimal alpha",function() {
				js.expect.E.should(co.janicek.core.html.HtmlColorCore.rgba(0,0,0,0.5)).equal("rgba(0,0,0,0.5)");
			});
		});
		js.mocha.M.describe("rgbaFraction()",function() {
			js.mocha.M.it("should make html rgb string",function() {
				js.expect.E.should(co.janicek.core.html.HtmlColorCore.rgbF(0.0,0.5,1)).equal("rgb(0%,50%,100%)");
			});
			js.mocha.M.it("should make html rgba string",function() {
				js.expect.E.should(co.janicek.core.html.HtmlColorCore.rgbaF(0.0,0.5,1.0,0)).equal("rgba(0%,50%,100%,0)");
			});
			js.mocha.M.it("should make html rgba string for decimal alpha",function() {
				js.expect.E.should(co.janicek.core.html.HtmlColorCore.rgbaF(0.0,0.5,1.0,0.5)).equal("rgba(0%,50%,100%,0.5)");
			});
		});
		js.mocha.M.describe("colorFraction()",function() {
			js.mocha.M.it("should calculate a color fraction",function() {
				js.expect.E.should(0. | 0).equal(0);
				js.expect.E.should(127.5 | 0).equal(127);
				js.expect.E.should(255. | 0).equal(255);
			});
		});
		js.mocha.M.describe("intToHexColor()",function() {
			js.mocha.M.it("should make a HTML hex color codes",function() {
				js.expect.E.should(co.janicek.core.html.HtmlColorCore.intToHexColor(0)).equal("#000000");
				js.expect.E.should(co.janicek.core.html.HtmlColorCore.intToHexColor(16777215)).equal("#FFFFFF");
			});
		});
		js.mocha.M.describe("HtmlColor",function() {
			js.mocha.M.it("should make a HTML rgba color codes",function() {
				var c = co.janicek.core.html.HtmlColor.Rgb(0,0,0);
				js.expect.E.should(co.janicek.core.html.HtmlColors.toString(c)).equal("rgb(0,0,0)");
				c = co.janicek.core.html.HtmlColor.Rgba(0,0,0,0);
				js.expect.E.should(co.janicek.core.html.HtmlColors.toString(c)).equal("rgba(0,0,0,0)");
				c = co.janicek.core.html.HtmlColor.Color(0);
				js.expect.E.should(co.janicek.core.html.HtmlColors.toString(c)).equal("#000000");
			});
		});
	});
};
specs.co.janicek.core.html.HtmlColorCoreSpec.__name__ = true;
specs.co.janicek.core.http = {}
specs.co.janicek.core.http.HttpCookieCoreSpec = function() {
	js.mocha.M.describe("HttpCookieCore",function() {
		js.mocha.M.describe("parseCookies()",function() {
			js.mocha.M.it("should return empty hashtable from empty cookies",function() {
				var cookies = co.janicek.core.http.HttpCookieCore.parseCookies("");
				js.expect.E.should(Lambda.count(cookies)).equal(0);
			});
			js.mocha.M.it("should parse one cookie",function() {
				var cookies = co.janicek.core.http.HttpCookieCore.parseCookies("cookie=monster");
				js.expect.E.should(cookies.get("cookie")).equal("monster");
			});
			js.mocha.M.it("should parse multiple cookies",function() {
				var cookies = co.janicek.core.http.HttpCookieCore.parseCookies("cookie=monster; singularity=near");
				js.expect.E.should(cookies.get("cookie")).equal("monster");
				js.expect.E.should(cookies.get("singularity")).equal("near");
			});
			js.mocha.M.it("should parse cookies with comma space delimeter",function() {
				var cookies = co.janicek.core.http.HttpCookieCore.parseCookies("cookie=monster, singularity=near");
				js.expect.E.should(cookies.get("cookie")).equal("monster");
				js.expect.E.should(cookies.get("singularity")).equal("near");
			});
		});
	});
};
specs.co.janicek.core.http.HttpCookieCoreSpec.__name__ = true;
specs.co.janicek.core.http.UrlCoreSpec = function() {
	js.mocha.M.describe("UrlCore",function() {
		js.mocha.M.describe("parseUrl()",function() {
			js.mocha.M.it("should parse every part of a URL",function() {
				var url = co.janicek.core.http.UrlCore.parseUrl("http://username:password@janicek.co:666/over/there/index.html?parameter=value&parameter2=value2#fragment");
				js.expect.E.should(url.protocol).equal("http");
				js.expect.E.should(url.user).equal("username");
				js.expect.E.should(url.password).equal("password");
				js.expect.E.should(url.host).equal("janicek.co");
				js.expect.E.should(url.port).equal("666");
				js.expect.E.should(url.directory).equal("/over/there/");
				js.expect.E.should(url.file).equal("index.html");
				js.expect.E.should(url.query).equal("parameter=value&parameter2=value2");
				js.expect.E.should(url.fragment).equal("fragment");
			});
		});
		js.mocha.M.describe("parseUrlQuery()",function() {
			js.mocha.M.it("should return hashtable from url query",function() {
				var query = co.janicek.core.http.UrlCore.parseUrlQuery("key=value&key2=value2");
				js.expect.E.should(Lambda.count(query)).equal(2);
				js.expect.E.should(query.get("key")).equal("value");
				js.expect.E.should(query.get("key2")).equal("value2");
			});
		});
	});
};
specs.co.janicek.core.http.UrlCoreSpec.__name__ = true;
specs.co.janicek.core.math = {}
specs.co.janicek.core.math.HashCoreSpec = function() {
	js.mocha.M.describe("HashCore",function() {
		js.mocha.M.describe("djb2()",function() {
			js.mocha.M.it("should make djb2 hash",function() {
				js.expect.E.should(co.janicek.core.math.HashCore.djb2("text")).be.a("number");
			});
		});
	});
};
specs.co.janicek.core.math.HashCoreSpec.__name__ = true;
specs.co.janicek.core.math.MathCoreSpec = function() {
	js.mocha.M.describe("MathCore",function() {
		js.mocha.M.describe("average()",function() {
			js.mocha.M.it("should calculate average from array of Floats",function() {
				js.expect.E.should(co.janicek.core.math.MathCore.average([0.0,0.5,1])).equal(0.5);
			});
		});
		js.mocha.M.describe("averageInt()",function() {
			js.mocha.M.it("should calculate average from array of Ints",function() {
				js.expect.E.should(co.janicek.core.math.MathCore.averageInt([1,2,3])).equal(2);
			});
		});
		js.mocha.M.describe("clamp()",function() {
			js.mocha.M.it("should clamp a Float to an interval",function() {
				js.expect.E.should(co.janicek.core.math.MathCore.clamp(1.0,1.0,1.0)).equal(1.0);
				js.expect.E.should(co.janicek.core.math.MathCore.clamp(1.0,1.0,2.0)).equal(1.0);
				js.expect.E.should(co.janicek.core.math.MathCore.clamp(1.0,0.0,1.0)).equal(1.0);
				js.expect.E.should(co.janicek.core.math.MathCore.clamp(1.0,0.0,2.0)).equal(1.0);
				js.expect.E.should(co.janicek.core.math.MathCore.clamp(1.0,2.0,2.0)).equal(2.0);
				js.expect.E.should(co.janicek.core.math.MathCore.clamp(1.0,2.0,1.0)).equal(1.0);
			});
		});
		js.mocha.M.describe("degreesToRadians()",function() {
			js.mocha.M.it("should convert degrees to radians",function() {
				js.expect.E.should(co.janicek.core.math.MathCore.degreesToRadians(180)).equal(3.141592653589793);
			});
		});
		js.mocha.M.describe("INT53_MAX",function() {
			js.mocha.M.it("should not be able to go higher",function() {
				js.expect.E.should(9007199254740992 + 1).equal(9007199254740992);
			});
		});
		js.mocha.M.describe("INT53_MIN",function() {
			js.mocha.M.it("should not be able to go lower",function() {
				js.expect.E.should(-9007199254740992 - 1).equal(-9007199254740992);
			});
		});
		js.mocha.M.describe("isEven()",function() {
			js.mocha.M.it("should test if Int is even",function() {
				js.expect.E.should(co.janicek.core.math.MathCore.isEven(1)).not.be.ok();
				js.expect.E.should(co.janicek.core.math.MathCore.isEven(2)).be.ok();
			});
		});
		js.mocha.M.describe("isOdd()",function() {
			js.mocha.M.it("should test if Int is odd",function() {
				js.expect.E.should(co.janicek.core.math.MathCore.isOdd(1)).be.ok();
				js.expect.E.should(co.janicek.core.math.MathCore.isOdd(2)).not.be.ok();
			});
		});
		js.mocha.M.describe("radiansToDegrees()",function() {
			js.mocha.M.it("should convert radians to degrees",function() {
				js.expect.E.should(co.janicek.core.math.MathCore.radiansToDegrees(3.141592653589793)).equal(180);
			});
		});
	});
};
specs.co.janicek.core.math.MathCoreSpec.__name__ = true;
specs.co.janicek.core.math.PerlinNoiseSpec = function() {
	js.mocha.M.describe("PerlinNoise",function() {
		js.mocha.M.describe("makePerlinNoise()",function() {
			js.mocha.M.it("should make perlin noise data",function() {
				var data = co.janicek.core.math.PerlinNoise.makePerlinNoise(100,100,1.0,1.0,1.0);
				js.expect.E.should(data).be.an("array");
			});
		});
	});
};
specs.co.janicek.core.math.PerlinNoiseSpec.__name__ = true;
specs.co.janicek.core.math.RandomCoreSpec = function() {
	js.mocha.M.describe("RandomCore",function() {
		js.mocha.M.describe("makeRandomSeed()",function() {
			js.mocha.M.it("should make a non deterministic random seed",function() {
				js.expect.E.should(co.janicek.core.math.RandomCore.makeRandomSeed()).be.a("number");
			});
		});
		js.mocha.M.describe("nextParkMiller()",function() {
			js.mocha.M.it("should generate a random int using Park Miller algorithm",function() {
				var seed = 1;
				var original = seed;
				seed = seed * 16807.0 % 2147483647.0 | 0;
				js.expect.E.should(seed).not.equal(original);
			});
			js.mocha.M.it("should generate the same Park Miller sequence on every machine",function() {
				var seed = 1;
				var length = 1000;
				var _g = 0;
				while(_g < length) {
					var step = _g++;
					seed = seed * 16807.0 % 2147483647.0 | 0;
				}
				js.expect.E.should(seed).equal(522329230);
			});
			js.mocha.M.it("should generate a statistically even Park Miller distribution",function() {
				var seed = 1;
				var total = 0.0;
				var length = 1000;
				var _g = 0;
				while(_g < length) {
					var step = _g++;
					seed = seed * 16807.0 % 2147483647.0 | 0;
					total += seed / 2147483647.0;
				}
				js.expect.E.should(total / length).be.greaterThan(0.45);
				js.expect.E.should(total / length).be.lessThan(0.55);
			});
		});
		js.mocha.M.describe("nextLCG()",function() {
			js.mocha.M.it("should generate the same LCG sequence",function() {
				var seed = 1;
				var length = 1000;
				var _g = 0;
				while(_g < length) {
					var step = _g++;
					seed = (1103515245.0 * seed + 12345) % 2147483647.0 | 0;
				}
				js.expect.E.should(seed).equal(1157381547);
			});
			js.mocha.M.it("should generate an even LCG distribution",function() {
				var seed = 1;
				var total = 0.0;
				var length = 1000;
				var _g = 0;
				while(_g < length) {
					var step = _g++;
					seed = (1103515245.0 * seed + 12345) % 2147483647.0 | 0;
					total += seed / 2147483647.0;
				}
				js.expect.E.should(total / length).be.greaterThan(0.45);
				js.expect.E.should(total / length).be.lessThan(0.55);
			});
		});
		js.mocha.M.describe("toFloat()",function() {
			js.mocha.M.it("should convert random seed to a Float value between 0.0 and 1.0",function() {
				js.expect.E.should((16807.0 % 2147483647.0 | 0) / 2147483647.0).be.a("number");
			});
		});
		js.mocha.M.describe("toBool()",function() {
			js.mocha.M.it("should convert random seed to a Bool value (coin flip)",function() {
				js.expect.E.should((16807.0 % 2147483647.0 | 0) / 2147483647.0 > 0.5).be.a("boolean");
			});
		});
		js.mocha.M.describe("toIntRange()",function() {
			js.mocha.M.it("should generate an Int in range",function() {
				var iterations = 100;
				var seed = 1;
				var _g = 0;
				while(_g < iterations) {
					var step = _g++;
					seed = seed * 16807.0 % 2147483647.0 | 0;
					js.expect.E.should(Math.round(-0.4999 + 10.9998 * (seed / 2147483647.0))).be.greaterThan(-1);
					js.expect.E.should(Math.round(-0.4999 + 10.9998 * (seed / 2147483647.0))).be.lessThan(11);
				}
			});
		});
		js.mocha.M.describe("toFloatRange()",function() {
			js.mocha.M.it("should generate a Float in range",function() {
				var iterations = 100;
				var seed = 1;
				var _g = 0;
				while(_g < iterations) {
					var step = _g++;
					seed = seed * 16807.0 % 2147483647.0 | 0;
					js.expect.E.should(seed / 2147483647.0).be.greaterThan(-0.1);
					js.expect.E.should(seed / 2147483647.0).be.lessThan(1.1);
				}
			});
		});
		js.mocha.M.describe("stringToSeed()",function() {
			js.mocha.M.it("should convert a string to a seed",function() {
				js.expect.E.should(co.janicek.core.math.RandomCore.stringToSeed("random seed")).be.a("number");
			});
		});
	});
};
specs.co.janicek.core.math.RandomCoreSpec.__name__ = true;
specs.co.janicek.core.math.UUIDSpec = function() {
	js.mocha.M.describe("UUID",function() {
		js.mocha.M.describe("uuid()",function() {
			js.mocha.M.it("should make a uuid of specific length",function() {
				js.expect.E.should(co.janicek.core.math.UUID.uuid(1)).have.length(1);
				js.expect.E.should(co.janicek.core.math.UUID.uuid(10)).have.length(10);
			});
			js.mocha.M.it("should make a uuid of specific radix",function() {
				var uuid = co.janicek.core.math.UUID.uuid(10,2);
				js.expect.E.should(uuid).have.length(10);
				js.expect.E.should(StringTools.replace(StringTools.replace(uuid,"0",""),"1","")).have.length(0);
			});
		});
		js.mocha.M.describe("uuidRfc4122V4()",function() {
			var uuid;
			js.mocha.M.it("should make a uuid",function() {
				uuid = co.janicek.core.math.UUID.uuidRfc4122V4();
				js.expect.E.should(uuid).be.a("string");
			});
			js.mocha.M.it("should be 36 characters long",function() {
				js.expect.E.should(uuid).have.length(36);
			});
			js.mocha.M.it("should have 5 parts seperated by hyphens",function() {
				js.expect.E.should(uuid.split("-")).have.length(5);
			});
		});
		js.mocha.M.describe("uuidFast()",function() {
			js.mocha.M.it("should make a uuid",function() {
				js.expect.E.should(co.janicek.core.math.UUID.uuidFast()).be.a("string");
			});
		});
		js.mocha.M.describe("uuidCompact()",function() {
			js.mocha.M.it("should make a uuid",function() {
				js.expect.E.should(co.janicek.core.math.UUID.uuidCompact()).be.a("string");
			});
		});
	});
};
specs.co.janicek.core.math.UUIDSpec.__name__ = true;
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.__name__ = true;
Array.__name__ = true;
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
if(typeof expect !== 'undefined') js.expect.E._expect = expect; else if(typeof require !== 'undefined') js.expect.E._expect = require('expect.js'); else throw "make sure to include expect.js";
co.janicek.core.math.PerlinNoise.p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
co.janicek.core.math.UUID.CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
js.mocha.Mocha._mocha = mocha;
MainBrowser.main();
})();

//@ sourceMappingURL=janicek-core-test-browser.js.map