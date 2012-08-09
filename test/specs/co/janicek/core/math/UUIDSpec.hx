/**
 * Janicek Core Haxe
 * My personal collection of Haxe core libraries.
 * Copyright (c) 2012 Richard Janicek <r@janicek.co>
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
import jasmine.J;

using StringTools;

/**
 * ...
 * @author Richard Janicek
 */

class UUIDSpec {

	public function new() {
		J.describe("UUID", function() {
			
			J.describe("uuid()", function() {
				J.it("should make a uuid of specific length", function() {
					J.expect(UUID.uuid(1).length).toEqual(1);
					J.expect(UUID.uuid(10).length).toEqual(10);
				});
				J.it("should make a uuid of specific radix", function() {
					var uuid = UUID.uuid(10, 2);
					J.expect(uuid.length).toEqual(10);
					J.expect(uuid.replace("0", "").replace("1", "").length).toEqual(0);
				});
			});
			
			J.describe("uuidRfc4122V4()", function() {
				var uuid;
				J.it("should make a uuid", function() {
					uuid = UUID.uuidRfc4122V4();
					J.expect(uuid).toBeDefined();
				});
				J.it("should be 36 characters long", function() {
					J.expect(uuid.length).toEqual(36);
				});
				J.it("should have 5 parts seperated by hyphens", function() {
					J.expect(uuid.split("-").length).toEqual(5);
				});
			});
			
			J.describe("uuidFast()", function() {
				J.it("should make a uuid", function() {
					J.expect(UUID.uuidFast()).toBeDefined();
				});
			});
			
			J.describe("uuidCompact()", function() {
				J.it("should make a uuid", function() {
					J.expect(UUID.uuidCompact()).toBeDefined();
				});
			});
			
		});
	}
	
}