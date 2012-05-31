var $_, $hxClasses = $hxClasses || {}, $estr = function() { return js.Boot.__string_rec(this,''); }
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
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
Lambda.prototype = {
	__class__: Lambda
}
var Main = $hxClasses["Main"] = function() { }
Main.__name__ = ["Main"];
Main.main = function() {
	if(!js.Lib.isIE) haxe.Firebug.redirectTraces();
	haxe.Log.trace("Testing...",{ fileName : "Main.hx", lineNumber : 24, className : "Main", methodName : "main"});
	new co.janicek.core.Array2dSpec();
	new co.janicek.core.BaseCode64Spec();
	new co.janicek.core.MathCoreSpec();
	new co.janicek.core.PathCoreSpec();
	new co.janicek.core.PerlinNoiseSpec();
	new co.janicek.core.RandomCoreSpec();
	new co.janicek.core.StringCoreSpec();
	jasmine.Jasmine.getEnv().addReporter(jasmine.Jasmine.newHtmlReporter());
	jasmine.Jasmine.getEnv().execute();
	haxe.Log.trace("Done testing.",{ fileName : "Main.hx", lineNumber : 36, className : "Main", methodName : "main"});
}
Main.prototype = {
	__class__: Main
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.prototype = {
	__class__: Std
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.prototype = {
	__class__: StringTools
}
var co = co || {}
if(!co.janicek) co.janicek = {}
if(!co.janicek.core) co.janicek.core = {}
co.janicek.core.Array2dSpec = $hxClasses["co.janicek.core.Array2dSpec"] = function() {
	jasmine.J.describe("Array2DCore",function() {
		jasmine.J.describe("get<T>( a : Array<Array<T>>, x : Int, y : Int) : T",function() {
			jasmine.J.it("should get value at index",function() {
				var a = [[1]];
				jasmine.J.expect(co.janicek.core.array.Array2dCore.get(a,0,0)).toEqual(1);
			});
		});
		jasmine.J.describe("set<T>( a : Array<Array<T>>, x : Int, y : Int, value : T ) : Array<Array<T>>",function() {
			jasmine.J.it("should set value at index",function() {
				var a = new Array();
				jasmine.J.expect(co.janicek.core.array.Array2dCore.get(a,0,0)).toBeNull();
				co.janicek.core.array.Array2dCore.set(a,0,0,1);
				jasmine.J.expect(co.janicek.core.array.Array2dCore.get(a,0,0)).toBe(1);
			});
		});
		jasmine.J.describe("foreachY<T>( a : Array<Array<T>>, f : Array<T> -> Void ) : Void",function() {
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
		jasmine.J.describe("foreachXY<T>( a : Array<Array<T>>, f : Int -> Int -> T -> Void) : Void",function() {
			jasmine.J.it("should iterate x,y indexes (cells)",function() {
				var a = [[1,2],[3,4]];
				co.janicek.core.array.Array2dCore.foreachXY(a,function(x,y,value) {
					jasmine.J.expect(co.janicek.core.array.Array2dCore.get(a,x,y)).toEqual(value);
				});
			});
		});
		jasmine.J.describe("any<T>( a : Array<Array<T>>, f : T -> Bool ) : Array2dIndex",function() {
			jasmine.J.it("should find index of anything in array",function() {
				var a = [[1,2],[3,4]];
				var index = co.janicek.core.array.Array2dCore.any(a,function(value) {
					return value == 4;
				});
				jasmine.J.expect(index).toEqual({ x : 1, y : 1});
			});
		});
		jasmine.J.describe("dimensions<T>( array : Array<Array<T>> ) : Array2dIndex",function() {
			jasmine.J.it("should get valid dimensions of array",function() {
				var a = new Array();
				jasmine.J.expect(co.janicek.core.array.Array2dCore.dimensions(a)).toEqual({ x : 0, y : 0});
				co.janicek.core.array.Array2dCore.set(a,5,5,1);
				jasmine.J.expect(co.janicek.core.array.Array2dCore.dimensions(a)).toEqual({ x : 6, y : 6});
			});
		});
		jasmine.J.describe("values<T>( array : Array<Array<T>> ) : Iterable<T>",function() {
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
		jasmine.J.describe("indexes<T>( array : Array<Array<T>> ) : Iterable<Array2dIndex>",function() {
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
co.janicek.core.Array2dSpec.__name__ = ["co","janicek","core","Array2dSpec"];
co.janicek.core.Array2dSpec.prototype = {
	__class__: co.janicek.core.Array2dSpec
}
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
co.janicek.core.BaseCode64Spec = $hxClasses["co.janicek.core.BaseCode64Spec"] = function() {
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
		jasmine.J.describe("base64EncodeBytesData( bytesData : BytesData ) : String",function() {
			jasmine.J.it("should encode byte data",function() {
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeBytesData(haxe.io.Bytes.ofString("bytes").b));
			});
		});
		jasmine.J.describe("base64DecodeBytesData( base64 : String ) : BytesData",function() {
			jasmine.J.it("should decode byte data",function() {
				jasmine.J.expect(co.janicek.core.BaseCode64.base64DecodeBytesData(co.janicek.core.BaseCode64.base64EncodeBytesData(haxe.io.Bytes.ofString("bytes").b)));
			});
		});
		jasmine.J.describe("base64EncodeString( string : String ) : String",function() {
			jasmine.J.it("should encode strings",function() {
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeString("pleasure.")).toEqual("cGxlYXN1cmUu");
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeString("leasure.")).toEqual("bGVhc3VyZS4=");
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeString("easure.")).toEqual("ZWFzdXJlLg==");
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeString("asure.")).toEqual("YXN1cmUu");
				jasmine.J.expect(co.janicek.core.BaseCode64.base64EncodeString("sure.")).toEqual("c3VyZS4=");
			});
		});
		jasmine.J.describe("base64DecodeString( base64 : String ) : String",function() {
			jasmine.J.it("should decode strings",function() {
				jasmine.J.expect(co.janicek.core.BaseCode64.base64DecodeString(co.janicek.core.BaseCode64.base64EncodeString("pleasure."))).toEqual("pleasure.");
			});
		});
	});
};
co.janicek.core.BaseCode64Spec.__name__ = ["co","janicek","core","BaseCode64Spec"];
co.janicek.core.BaseCode64Spec.prototype = {
	__class__: co.janicek.core.BaseCode64Spec
}
co.janicek.core.MathCoreSpec = $hxClasses["co.janicek.core.MathCoreSpec"] = function() {
	jasmine.J.describe("MathCore",function() {
		jasmine.J.describe("isEven( n : Int ) : Bool",function() {
			jasmine.J.it("should test if Int is even",function() {
				jasmine.J.expect(co.janicek.core.math.MathCore.isEven(1)).toBeFalsy();
				jasmine.J.expect(co.janicek.core.math.MathCore.isEven(2)).toBeTruthy();
			});
		});
		jasmine.J.describe("isOdd( n : Int ) : Bool",function() {
			jasmine.J.it("should test if Int is odd",function() {
				jasmine.J.expect(co.janicek.core.math.MathCore.isOdd(1)).toBeTruthy();
				jasmine.J.expect(co.janicek.core.math.MathCore.isOdd(2)).toBeFalsy();
			});
		});
		jasmine.J.describe("degreesToRadians( degrees : Float ) : Float",function() {
			jasmine.J.it("should convert degrees to radians",function() {
				jasmine.J.expect(co.janicek.core.math.MathCore.degreesToRadians(180)).toBe(3.141592653589793);
			});
		});
		jasmine.J.describe("radiansToDegrees( radians : Float ) : Float",function() {
			jasmine.J.it("should convert radians to degrees",function() {
				jasmine.J.expect(co.janicek.core.math.MathCore.radiansToDegrees(3.141592653589793)).toBe(180);
			});
		});
	});
};
co.janicek.core.MathCoreSpec.__name__ = ["co","janicek","core","MathCoreSpec"];
co.janicek.core.MathCoreSpec.prototype = {
	__class__: co.janicek.core.MathCoreSpec
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
co.janicek.core.PathCoreSpec = $hxClasses["co.janicek.core.PathCoreSpec"] = function() {
	jasmine.J.describe("PathCore",function() {
		jasmine.J.describe("getDirectoryName( path : String, pathDelimeter = \"/\" ) : String",function() {
			jasmine.J.it("should get directory name from path that includes filename",function() {
				jasmine.J.expect(co.janicek.core.PathCore.getDirectoryName("a/b.txt")).toEqual("a");
			});
		});
		jasmine.J.describe("getFileName( path : String, pathDelimeter = \"/\" ) : String",function() {
			jasmine.J.it("should get file name from path",function() {
				jasmine.J.expect(co.janicek.core.PathCore.getFileName("a/b.txt")).toEqual("b.txt");
			});
		});
		jasmine.J.describe("removeFileNameExtension( path : String, fileExtensionDelimeter = \".\" ) : String",function() {
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
co.janicek.core.PathCoreSpec.__name__ = ["co","janicek","core","PathCoreSpec"];
co.janicek.core.PathCoreSpec.prototype = {
	__class__: co.janicek.core.PathCoreSpec
}
co.janicek.core.PerlinNoiseSpec = $hxClasses["co.janicek.core.PerlinNoiseSpec"] = function() {
	jasmine.J.describe("PerlinNoise",function() {
		jasmine.J.describe("new( seed = 666, octaves = 4, falloff = 0.5 )",function() {
			jasmine.J.it("should make perlin noise maker",function() {
				var pn = new co.janicek.core.math.PerlinNoise();
				jasmine.J.expect(pn).not.toBeNull();
			});
		});
		jasmine.J.describe("make(width:Int, height:Int, _x:Float, _y:Float, _z:Float, ?_ ):Array<Array<Int>>",function() {
			jasmine.J.it("should make perlin noise data",function() {
				var data = new co.janicek.core.math.PerlinNoise().make(100,100,1.0,1.0,1.0);
				jasmine.J.expect(data).not.toBeNull();
			});
		});
	});
};
co.janicek.core.PerlinNoiseSpec.__name__ = ["co","janicek","core","PerlinNoiseSpec"];
co.janicek.core.PerlinNoiseSpec.prototype = {
	__class__: co.janicek.core.PerlinNoiseSpec
}
co.janicek.core.RandomCoreSpec = $hxClasses["co.janicek.core.RandomCoreSpec"] = function() {
	jasmine.J.describe("RandomCore",function() {
		jasmine.J.describe("makeRandomSeed() : Int",function() {
			jasmine.J.it("should make a non deterministic random seed",function() {
				jasmine.J.expect(co.janicek.core.math.RandomCore.makeRandomSeed()).toBeDefined();
			});
		});
		jasmine.J.describe("nextParkMiller( seed : Int ) : Int",function() {
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
		jasmine.J.describe("nextLCG( seed : Int ) : Int",function() {
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
		jasmine.J.describe("toFloat( seed : Int ) : Float",function() {
			jasmine.J.it("should convert random seed to a Float value between 0.0 and 1.0",function() {
				jasmine.J.expect(16807.0 % 2147483647.0 / 2147483647.0).toBeDefined();
			});
		});
		jasmine.J.describe("toBool( seed : Int ) : Bool",function() {
			jasmine.J.it("should convert random seed to a Bool value (coin flip)",function() {
				jasmine.J.expect(16807.0 % 2147483647.0 / 2147483647.0 > 0.5).toBeDefined();
			});
		});
		jasmine.J.describe("toIntRange( seed : Int, min : Int, max : Int ) : Int",function() {
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
		jasmine.J.describe("toFloatRange( seed : Int, min : Float, max : Float ) : Float",function() {
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
	});
};
co.janicek.core.RandomCoreSpec.__name__ = ["co","janicek","core","RandomCoreSpec"];
co.janicek.core.RandomCoreSpec.prototype = {
	__class__: co.janicek.core.RandomCoreSpec
}
co.janicek.core.StringCore = $hxClasses["co.janicek.core.StringCore"] = function() { }
co.janicek.core.StringCore.__name__ = ["co","janicek","core","StringCore"];
co.janicek.core.StringCore.removeFromEnd = function(string,pattern) {
	if(StringTools.endsWith(string,pattern)) return string.substr(0,string.lastIndexOf(pattern));
	return string;
}
co.janicek.core.StringCore.isNullOrEmpty = function(string) {
	if(string == null) return true;
	if(string.length == 0) return true;
	return false;
}
co.janicek.core.StringCore.prototype = {
	__class__: co.janicek.core.StringCore
}
co.janicek.core.StringCoreSpec = $hxClasses["co.janicek.core.StringCoreSpec"] = function() {
	jasmine.J.describe("StringCore",function() {
		jasmine.J.describe("removeFromEnd( string : String, pattern : String ) : String",function() {
			jasmine.J.it("should remove one string from the end of another string",function() {
				jasmine.J.expect(co.janicek.core.StringCore.removeFromEnd("ab","b")).toEqual("a");
			});
		});
		jasmine.J.describe("isNullOrEmpty( string : String ) : Bool",function() {
			jasmine.J.it("should check if string is null or empty",function() {
				jasmine.J.expect(co.janicek.core.StringCore.isNullOrEmpty("")).toBeTruthy();
				jasmine.J.expect(co.janicek.core.StringCore.isNullOrEmpty(null)).toBeTruthy();
				jasmine.J.expect(co.janicek.core.StringCore.isNullOrEmpty("not null or empty")).toBeFalsy();
			});
		});
	});
};
co.janicek.core.StringCoreSpec.__name__ = ["co","janicek","core","StringCoreSpec"];
co.janicek.core.StringCoreSpec.prototype = {
	__class__: co.janicek.core.StringCoreSpec
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
if(!co.janicek.core.math) co.janicek.core.math = {}
co.janicek.core.math.MathCore = $hxClasses["co.janicek.core.math.MathCore"] = function() { }
co.janicek.core.math.MathCore.__name__ = ["co","janicek","core","math","MathCore"];
co.janicek.core.math.MathCore.isEven = function(n) {
	return n % 2 == 0;
}
co.janicek.core.math.MathCore.isOdd = function(n) {
	return !co.janicek.core.math.MathCore.isEven(n);
}
co.janicek.core.math.MathCore.degreesToRadians = function(degrees) {
	return degrees * Math.PI / 180;
}
co.janicek.core.math.MathCore.radiansToDegrees = function(radians) {
	return radians * 180 / Math.PI;
}
co.janicek.core.math.MathCore.prototype = {
	__class__: co.janicek.core.math.MathCore
}
co.janicek.core.math.PerlinNoise = $hxClasses["co.janicek.core.math.PerlinNoise"] = function(seed,octaves,falloff) {
	if(falloff == null) falloff = 0.5;
	if(octaves == null) octaves = 4;
	if(seed == null) seed = 666;
	this.octaves = octaves;
	this.baseFactor = 0.015625;
	this.seedOffset(seed);
	this.octFreqPers(falloff);
};
co.janicek.core.math.PerlinNoise.__name__ = ["co","janicek","core","math","PerlinNoise"];
co.janicek.core.math.PerlinNoise.prototype = {
	octaves: null
	,aOctFreq: null
	,aOctPers: null
	,fPersMax: null
	,iXoffset: null
	,iYoffset: null
	,iZoffset: null
	,baseFactor: null
	,make: function(width,height,_x,_y,_z,_) {
		var bitmap = new Array();
		var baseX;
		baseX = _x * this.baseFactor + this.iXoffset;
		_y = _y * this.baseFactor + this.iYoffset;
		_z = _z * this.baseFactor + this.iZoffset;
		var p = co.janicek.core.math.PerlinNoise.P;
		var octaves = this.octaves;
		var aOctFreq = this.aOctFreq;
		var aOctPers = this.aOctPers;
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
					var fFreq = aOctFreq[i];
					var fPers = aOctPers[i];
					var x = _x * fFreq;
					var y = _y * fFreq;
					var z = _z * fFreq;
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
					var A = p[X] + Y;
					var AA = p[A] + Z;
					var AB = p[A + 1] + Z;
					var B = p[X + 1] + Y;
					var BA = p[B] + Z;
					var BB = p[B + 1] + Z;
					var x1 = x - 1;
					var y1 = y - 1;
					var z1 = z - 1;
					var hash = p[BB + 1] & 15;
					var g1 = ((hash & 1) == 0?hash < 8?x1:y1:hash < 8?-x1:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x1:z1:hash < 4?-y1:hash == 14?-x1:-z1);
					hash = p[AB + 1] & 15;
					var g2 = ((hash & 1) == 0?hash < 8?x:y1:hash < 8?-x:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x:z1:hash < 4?-y1:hash == 14?-x:-z1);
					hash = p[BA + 1] & 15;
					var g3 = ((hash & 1) == 0?hash < 8?x1:y:hash < 8?-x1:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x1:z1:hash < 4?-y:hash == 14?-x1:-z1);
					hash = p[AA + 1] & 15;
					var g4 = ((hash & 1) == 0?hash < 8?x:y:hash < 8?-x:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x:z1:hash < 4?-y:hash == 14?-x:-z1);
					hash = p[BB] & 15;
					var g5 = ((hash & 1) == 0?hash < 8?x1:y1:hash < 8?-x1:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x1:z:hash < 4?-y1:hash == 14?-x1:-z);
					hash = p[AB] & 15;
					var g6 = ((hash & 1) == 0?hash < 8?x:y1:hash < 8?-x:-y1) + ((hash & 2) == 0?hash < 4?y1:hash == 12?x:z:hash < 4?-y1:hash == 14?-x:-z);
					hash = p[BA] & 15;
					var g7 = ((hash & 1) == 0?hash < 8?x1:y:hash < 8?-x1:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x1:z:hash < 4?-y:hash == 14?-x1:-z);
					hash = p[AA] & 15;
					var g8 = ((hash & 1) == 0?hash < 8?x:y:hash < 8?-x:-y) + ((hash & 2) == 0?hash < 4?y:hash == 12?x:z:hash < 4?-y:hash == 14?-x:-z);
					g2 += u * (g1 - g2);
					g4 += u * (g3 - g4);
					g6 += u * (g5 - g6);
					g8 += u * (g7 - g8);
					g4 += v * (g2 - g4);
					g8 += v * (g6 - g8);
					s += (g8 + w * (g4 - g8)) * fPers;
				}
				var color = (s * this.fPersMax + 1) * 128 | 0;
				co.janicek.core.array.Array2dCore.set(bitmap,px,py,-16777216 | color << 16 | color << 8 | color);
				_x += this.baseFactor;
			}
			_y += this.baseFactor;
		}
		return bitmap;
	}
	,octFreqPers: function(fPersistence) {
		var fFreq, fPers;
		this.aOctFreq = [];
		this.aOctPers = [];
		this.fPersMax = 0;
		var _g1 = 0, _g = this.octaves;
		while(_g1 < _g) {
			var i = _g1++;
			fFreq = Math.pow(2,i);
			fPers = Math.pow(fPersistence,i);
			this.fPersMax += fPers;
			this.aOctFreq.push(fFreq);
			this.aOctPers.push(fPers);
		}
		this.fPersMax = 1 / this.fPersMax;
	}
	,seedOffset: function(iSeed) {
		this.iXoffset = iSeed = iSeed * 16807. % 2147483647 | 0;
		this.iYoffset = iSeed = iSeed * 16807. % 2147483647 | 0;
		this.iZoffset = iSeed = iSeed * 16807. % 2147483647 | 0;
	}
	,__class__: co.janicek.core.math.PerlinNoise
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
	,__class__: haxe.BaseCode
}
haxe.Firebug = $hxClasses["haxe.Firebug"] = function() { }
haxe.Firebug.__name__ = ["haxe","Firebug"];
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
haxe.Log.prototype = {
	__class__: haxe.Log
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
jasmine.J.describe = function(description,specDefinitions) {
	describe(description, specDefinitions);
}
jasmine.J.it = function(description,func) {
	it(description, func);
}
jasmine.J.expect = function(actual) {
	return expect(actual);
}
jasmine.J.prototype = {
	__class__: jasmine.J
}
jasmine.Jasmine = $hxClasses["jasmine.Jasmine"] = function() { }
jasmine.Jasmine.__name__ = ["jasmine","Jasmine"];
jasmine.Jasmine.getEnv = function() {
	return jasmine.getEnv();
}
jasmine.Jasmine.newHtmlReporter = function() {
	return new jasmine.HtmlReporter();
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
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype = {
	__class__: js.Lib
}
js.Boot.__res = {}
js.Boot.__init();
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
co.janicek.core.math.PerlinNoise.P = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
co.janicek.core.math.RandomCore.MPM = 2147483647.0;
co.janicek.core.math.RandomCore.MINSTD = 16807.0;
js.Lib.onerror = null;
Main.main()
//@ sourceMappingURL=janicek-core.js.map