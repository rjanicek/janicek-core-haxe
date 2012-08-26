/**
 * janicek-core-haxe
 * ------------------
 * My personal collection of Haxe core libraries.
 * Copyright (c) 2012 Richard Janicek, http://www.janicek.co
 * 
 * The MIT License (MIT) http://www.opensource.org/licenses/mit-license.php
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
package specs.co.janicek.core;

import co.janicek.core.BaseCode64;
import haxe.io.Bytes;
import haxe.io.BytesData;
import js.mocha.Mocha;

using co.janicek.core.BaseCode64;
using js.expect.Expect;

class BaseCode64Spec {

		public function new() {
		M.describe("BaseCode64", function() {
			
			M.it("should encode and decode every byte value", function() {
				var byteValueStart = 0;
				var byteCount = 256;
				var bytes = Bytes.alloc(byteCount);
				for (i in 0...byteCount) {
					bytes.set(i, byteValueStart + i);
				}
				var bytesData = bytes.getData();
				var encodedData = BaseCode64.base64EncodeBytesData(bytesData);
				Std.string(BaseCode64.base64DecodeBytesData(encodedData)).should().equal(Std.string(bytesData));
			});
			
			M.describe("base64EncodeBytesData()", function() {
				M.it("should encode byte data", function() {
					Bytes.ofString("bytes").getData().base64EncodeBytesData().should().be.a("string");
				});
			});
			
			M.describe("base64DecodeBytesData()", function() {
				M.it("should decode byte data", function() {
					Bytes.ofString("bytes").getData().base64EncodeBytesData().base64DecodeBytesData().should().be.an("array");
				});
			});
			
			M.describe("base64EncodeString()", function() {
				M.it("should encode strings", function() {
					"pleasure.".base64EncodeString().should().equal("cGxlYXN1cmUu");
					"leasure.".base64EncodeString().should().equal("bGVhc3VyZS4=");
					"easure.".base64EncodeString().should().equal("ZWFzdXJlLg==");
					"asure.".base64EncodeString().should().equal("YXN1cmUu");
					"sure.".base64EncodeString().should().equal("c3VyZS4=");
				});
			});
			
			M.describe("base64DecodeString()", function() {
				M.it("should decode strings", function() {
					"pleasure.".base64EncodeString().base64DecodeString().should().equal("pleasure.");
				});
			});
			
		});
	}
	
}