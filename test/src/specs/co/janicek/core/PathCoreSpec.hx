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

import js.mocha.Mocha;

using co.janicek.core.PathCore;
using js.expect.Expect;

/**
 * PathCore specs.
 * @author Richard Janicek
 */

class PathCoreSpec {

	public function new() {
		M.describe("PathCore", function() {
			
			M.describe("getDirectoryName()", function(){
				M.it("should get directory name from path that includes filename", function() {
					"a/b.txt".getDirectoryName().should().equal("a");
				});
			});
			
			M.describe("getFileName()", function(){
				M.it("should get file name from path", function() {
					"a/b.txt".getFileName().should().equal("b.txt");
				});
			});
			
			M.describe("removeFileNameExtension()", function(){
				M.it("should remove exentsion from path", function() {
					"a/b.txt".removeFileNameExtension().should().equal("a/b");
				});
				M.it("should remove exentsion from file name", function() {
					"b.txt".removeFileNameExtension().should().equal("b");
				});
				M.it("should not remove exentsion from file name without an extension", function() {
					"filename".removeFileNameExtension().should().equal("filename");
				});
			});
			
			M.describe("makeSafeFilename()", function(){
				M.it("should remove new lines from filename", function() {
					"\r\nfilename\r\n".makeSafeFilename().should().equal("filename");
				});
			});
			
		});
	}
	
}