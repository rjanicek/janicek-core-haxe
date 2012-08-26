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
package specs.co.janicek.core.math;

import co.janicek.core.math.UUID;
import js.mocha.Mocha;

using js.expect.Expect;
using StringTools;

/**
 * ...
 * @author Richard Janicek
 */

class UUIDSpec {

	public function new() {
		M.describe("UUID", function() {
			
			M.describe("uuid()", function() {
				M.it("should make a uuid of specific length", function() {
					UUID.uuid(1).should().have.length(1);
					UUID.uuid(10).should().have.length(10);
				});
				M.it("should make a uuid of specific radix", function() {
					var uuid = UUID.uuid(10, 2);
					uuid.should().have.length(10);
					uuid.replace("0", "").replace("1", "").should().have.length(0);
				});
			});
			
			M.describe("uuidRfc4122V4()", function() {
				var uuid;
				M.it("should make a uuid", function() {
					uuid = UUID.uuidRfc4122V4();
					uuid.should().be.a("string");
				});
				M.it("should be 36 characters long", function() {
					uuid.should().have.length(36);
				});
				M.it("should have 5 parts seperated by hyphens", function() {
					uuid.split("-").should().have.length(5);
				});
			});
			
			M.describe("uuidFast()", function() {
				M.it("should make a uuid", function() {
					UUID.uuidFast().should().be.a("string");
				});
			});
			
			M.describe("uuidCompact()", function() {
				M.it("should make a uuid", function() {
					UUID.uuidCompact().should().be.a("string");
				});
			});
			
		});
	}
	
}