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

import js.mocha.Mocha.M.*;
using js.expect.Expect;
using co.janicek.core.math.GeometryCore;

/**
 * ...
 * @author Richard Janicek
 */

class GeometryCoreSpec {

	public function new() {
		describe("GeometryCore", function() {
			describe("fitRectangle()", function() {
				it("should not change a smaller rectangle", function() {
					GeometryCore.fitRectangle(10, 10, 11, 11, false).should().eql( { width:10, height:10 } );
				});
				
				it("should shrink a larger rectangle", function() {
					GeometryCore.fitRectangle(11, 11, 10, 10, false).should().eql( { width:10, height:10 } );
					GeometryCore.fitRectangle(10, 10, 5, 7, false).should().eql( { width:5, height:7 } );
				});
				
				it("should shrink a larger rectangle and preserve aspect ratio", function() {
					GeometryCore.fitRectangle(10, 10, 5, 10, true).should().eql( { width:5, height:5 } );
					GeometryCore.fitRectangle(10, 10, 10, 5, true).should().eql( { width:5, height:5 } );
					GeometryCore.fitRectangle(10, 10, 5, 7.5, true).should().eql( { width:5, height:5 } );
				});
			});
		});
	}
	
}