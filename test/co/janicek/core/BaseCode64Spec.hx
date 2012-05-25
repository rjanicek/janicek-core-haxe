package co.janicek.core;

import co.janicek.core.BaseCode64;
import haxe.io.Bytes;
import haxe.io.BytesData;
import jasmine.J;

class BaseCode64Spec {

		public function new() {
		J.describe("BaseCode64", function() {
			
			J.it("should encode data", function() {
					var bytesData : BytesData;
		
				bytesData = Bytes.ofString("pleasure.").getData();
				J.expect(BaseCode64.enocdeBytesData(bytesData)).toEqual("cGxlYXN1cmUu");
				
				bytesData = Bytes.ofString("leasure.").getData();
				J.expect(BaseCode64.enocdeBytesData(bytesData)).toEqual("bGVhc3VyZS4=");

				bytesData = Bytes.ofString("easure.").getData();
				J.expect(BaseCode64.enocdeBytesData(bytesData)).toEqual("ZWFzdXJlLg==");
				
				bytesData = Bytes.ofString("asure.").getData();
				J.expect(BaseCode64.enocdeBytesData(bytesData)).toEqual("YXN1cmUu");
				
				bytesData = Bytes.ofString("sure.").getData();
				J.expect(BaseCode64.enocdeBytesData(bytesData)).toEqual("c3VyZS4=");
			});
			
			J.it("should decode a simple string", function() {
				var bytesData = Bytes.ofString("original message").getData();
				var encodedData = BaseCode64.enocdeBytesData(bytesData);
				J.expect(Std.string(BaseCode64.decodeBytesData(encodedData))).toEqual(Std.string(bytesData));
			});
			
			J.it("should decode every byte value", function() {
				var byteValueStart = 0;
				var byteCount = 256;
				var bytes = Bytes.alloc(byteCount);
				for (i in 0...byteCount) {
					bytes.set(i, byteValueStart + i);
				}
				var bytesData = bytes.getData();
				var encodedData = BaseCode64.enocdeBytesData(bytesData);
				J.expect( Std.string(BaseCode64.decodeBytesData(encodedData))).toEqual(Std.string(bytesData));
			});
			
		});
	}
	
}