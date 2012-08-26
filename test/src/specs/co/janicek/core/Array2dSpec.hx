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

import co.janicek.core.array.Array2dCore;
import js.mocha.Mocha;

using co.janicek.core.array.Array2dCore;
using js.expect.Expect;
using Lambda;

/**
 * ...
 * @author Richard Janicek
 */

class Array2dSpec {

	public function new() {
		M.describe("Array2DCore", function() {
			
			M.describe("get()", function() {
				M.it("should get value at index", function() {
					var a = [[1]];
					a.get(0, 0).should().equal(1);
				});
			});

			M.describe("set()", function() {
				M.it("should set value at index", function() {
					var a = new Array<Array<Int>>();
					a.get(0, 0).should().equal(null);
					a.set(0, 0, 1);
					a.get(0, 0).should().equal(1);
				});
			});
			
			M.describe("getIndices()", function() {
				M.it("should compute 2d indices from array dimensions", function() {
					Array2dCore.getIndices(0, 10, 1).should().eql( { x:0, y:0 } );
					Array2dCore.getIndices(9, 10, 1).should().eql( { x:9, y:0 } );
					Array2dCore.getIndices(99, 10, 1).should().eql( { x:9, y:9 } );
					Array2dCore.getIndices(90, 10, 1).should().eql( { x:0, y:9 } );
					
					Array2dCore.getIndices(0, 10, 2).should().eql( { x:0, y:0 } );
					Array2dCore.getIndices(9 * 2, 10, 2).should().eql( { x:9, y:0 } );
					Array2dCore.getIndices(99 * 2, 10, 2).should().eql( { x:9, y:9 } );
					Array2dCore.getIndices(90 * 2, 10, 2).should().eql( { x:0, y:9 } );
					
					Array2dCore.getIndices(0, 46, 4).should().eql( { x:0, y:0 } );
					Array2dCore.getIndices(5, 6, 1).should().eql( { x:5, y:0 } );
				});
			});

			M.describe("foreachY()", function() {
				M.it("should iterate y indexes (rows)", function() {
					var a = [
						[1],
						[2]
					];
					var row = 0;
					a.foreachY(function (y):Void {
						a.get(0, row).should().equal(y[0]);
						row++;
					});
					row.should().equal(a.length);
				});
			});

			M.describe("foreachXY()", function() {
				M.it("should iterate x,y indexes (cells)", function() {
					var a = [
						[1, 2],
						[3, 4]
					];
					a.foreachXY(function (x, y, value):Void {
						a.get(x, y).should().equal(value);
					});
				});
			});

			M.describe("any()", function() {
				M.it("should find index of anything in array", function() {
					var a = [
						[1, 2],
						[3, 4]
					];
					
					var index = a.any(function(value) { return value == 4; } );
					index.should().eql( { x:1, y:1 } );
				});
			});

			M.describe("dimensions()", function() {
				M.it("should get valid dimensions of array", function() {
					var a = new Array<Array<Int>>();
					a.dimensions().should().eql( { x:0, y:0 } );
					a.set(5, 5, 1);
					a.dimensions().should().eql( { x:6, y:6 } );
				});
			});
			
			M.describe("values()", function() {
				M.it("should produce array value iterator", function() {
					var a = new Array<Array<Int>>();
					a.values().empty().should().be.ok();
					a.values().count().should().equal(0);
					a.set(0, 0, 1);
					a.values().count().should().equal(1);
					a.values().iter(function(value) {
						value.should().equal(1);
					});
					a.set(10, 10, 1);
					a.values().count().should().equal(2);
				});
			});

			M.describe("indexes()", function() {
				M.it("should produce array index iterator", function() {
					var a = new Array<Array<Int>>();
					a.indexes().empty().should().be.ok();
					a.indexes().count().should().equal(0);
					a.set(0, 0, 1);
					a.indexes().count().should().equal(1);
					a.indexes().iter(function(index) {
						index.should().eql( { x:0, y:0 } );
					});
					a.set(1, 1, 1);
					a.indexes().count().should().equal(2);
					a.set(10, 10, 1);
					a.indexes().count().should().equal(3);
				});
			});
			
		});
	}
	
}