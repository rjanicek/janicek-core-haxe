package specs.co.janicek.core;

using co.janicek.core.BaseCode64;

import co.janicek.core.BaseCode64;
import haxe.io.Bytes;
import haxe.io.BytesData;
import jasmine.J;

class BaseCode64Spec {

		public function new() {
		J.describe("BaseCode64", function() {
			
			J.it("should encode and decode every byte value", function() {
				var byteValueStart = 0;
				var byteCount = 256;
				var bytes = Bytes.alloc(byteCount);
				for (i in 0...byteCount) {
					bytes.set(i, byteValueStart + i);
				}
				var bytesData = bytes.getData();
				var encodedData = BaseCode64.base64EncodeBytesData(bytesData);
				J.expect( Std.string(BaseCode64.base64DecodeBytesData(encodedData))).toEqual(Std.string(bytesData));
			});
			
			J.describe("base64EncodeBytesData( bytesData : BytesData ) : String", function() {
				J.it("should encode byte data", function() {
					J.expect(Bytes.ofString("bytes").getData().base64EncodeBytesData());
				});
			});
			
			J.describe("base64DecodeBytesData( base64 : String ) : BytesData", function() {
				J.it("should decode byte data", function() {
					J.expect(Bytes.ofString("bytes").getData().base64EncodeBytesData().base64DecodeBytesData());
				});
			});
			
			J.describe("base64EncodeString( string : String ) : String", function() {
				J.it("should encode strings", function() {
					J.expect("pleasure.".base64EncodeString()).toEqual("cGxlYXN1cmUu");
					J.expect("leasure.".base64EncodeString()).toEqual("bGVhc3VyZS4=");
					J.expect("easure.".base64EncodeString()).toEqual("ZWFzdXJlLg==");
					J.expect("asure.".base64EncodeString()).toEqual("YXN1cmUu");
					J.expect("sure.".base64EncodeString()).toEqual("c3VyZS4=");
				});
			});
			
			J.describe("base64DecodeString( base64 : String ) : String", function() {
				J.it("should decode strings", function() {
					J.expect("pleasure.".base64EncodeString().base64DecodeString()).toEqual("pleasure.");
				});
			});
			

			
		});
	}
	
}