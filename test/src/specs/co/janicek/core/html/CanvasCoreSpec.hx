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

package specs.co.janicek.core.html;

import co.janicek.core.html.CanvasCore;
import html5.Image;
import html5.ImageData;
import js.expect.Expect;
import js.mocha.Mocha;

using co.janicek.core.array.Array2dCore;
using co.janicek.core.html.CanvasCore;
using js.expect.Expect;

/**
 * ...
 * @author Richard Janicek
 */

class CanvasCoreSpec {

	public function new() {
		M.describe("CanvasCore", function() {
			
			M.describe("loadImage()", function () {
				M.it("should load an image from a URL", function() {
					CanvasCore.loadImage("images/3x3-checker-pattern.png", function (image:Image):Void {
						image.complete.should().be.ok();
						image.width.should().equal(3);
						image.height.should().equal(3);
					});
				});
			});
			
			M.describe("getImageData()", function () {
				M.it("should get ImageData from an Image", function() {
					CanvasCore.loadImage("images/3x3-checker-pattern.png", function (image:Image):Void {
						var imageData = image.getImageData();
						imageData.width.should().equal(3);
						imageData.height.should().equal(3);
						imageData.data.length.should().equal(3 * 3 * CanvasCore.CANVAS_ELEMENTS_PER_PIXEL);
					});
				});
			});	
			
			M.describe("makeBitmap()", function () {
				M.it("should convert html5 ImageData to an Array of Bool", function() {
					CanvasCore.loadImage("images/3x3-checker-pattern.png", function (image:Image):Void {
						var imageData = image.getImageData();
						var bitmap = imageData.makeAverageThresholdBitmap(127).invertBitmap();
						var o = false;
						var x = true;
						var checkerboard = [
							[x, o, x],
							[o, x, o],
							[x, o, x]
						];
						bitmap.should().equal(checkerboard);
					});
				});
			});
			
		});
	}
	
}