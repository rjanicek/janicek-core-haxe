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
package specs.co.janicek.core;
import jasmine.J;

using co.janicek.core.PathCore;

/**
 * PathCore specs.
 * @author Richard Janicek
 */

class PathCoreSpec {

	public function new() {
		J.describe("PathCore", function() {
			
			J.describe("getDirectoryName()", function(){
				J.it("should get directory name from path that includes filename", function() {
					J.expect("a/b.txt".getDirectoryName()).toEqual("a");
				});
			});
			
			J.describe("getFileName()", function(){
				J.it("should get file name from path", function() {
					J.expect("a/b.txt".getFileName()).toEqual("b.txt");
				});
			});
			
			J.describe("removeFileNameExtension()", function(){
				J.it("should remove exentsion from path", function() {
					J.expect("a/b.txt".removeFileNameExtension()).toEqual("a/b");
				});
				J.it("should remove exentsion from file name", function() {
					J.expect("b.txt".removeFileNameExtension()).toEqual("b");
				});
				J.it("should not remove exentsion from file name without an extension", function() {
					J.expect("filename".removeFileNameExtension()).toEqual("filename");
				});
			});
			
		});
	}
	
}