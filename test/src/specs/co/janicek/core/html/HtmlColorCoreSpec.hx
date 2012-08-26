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

import co.janicek.core.html.HtmlColorCore;
import co.janicek.core.html.HtmlColor;
import js.mocha.Mocha;
import js.expect.Expect;

using co.janicek.core.html.HtmlColorCore;
using co.janicek.core.html.HtmlColor;
using js.expect.Expect;

/**
 * ...
 * @author Richard Janicek
 */

class HtmlColorCoreSpec {

	public function new() {
		M.describe("HtmlColorCore", function() {
			
			M.describe("getRedComponent()", function () {
				M.it("should get red color coponent", function() {
					HtmlColorCore.getRedComponent(0x112233).should().equal(0x11);
					HtmlColorCore.getRedComponent(0x9112233).should().equal(0x11);
				});
			});
			
			M.describe("getGreenComponent()", function () {
				M.it("should get green color coponent", function() {
					HtmlColorCore.getGreenComponent(0x112233).should().equal(0x22);
					HtmlColorCore.getGreenComponent(0x9112233).should().equal(0x22);
				});
			});

			M.describe("getBlueComponent()", function () {
				M.it("should get blue color coponent", function() {
					HtmlColorCore.getBlueComponent(0x112233).should().equal(0x33);
					HtmlColorCore.getBlueComponent(0x9112233).should().equal(0x33);
				});
			});
			
			M.describe("hsla()", function () {
				M.it("should make html hsl string", function() {
					HtmlColorCore.hsl(0, 0.0, 0.0).should().equal("hsl(0,0%,0%)");
				});
				M.it("should make html hsla string", function() {
					HtmlColorCore.hsla(0, 0.0, 0.0, 0.5).should().equal("hsla(0,0%,0%,0.5)");
				});
				M.it("should make html hsla string for decimal values", function() {
					HtmlColorCore.hsla(0, 0.5, 1.0, 1.0).should().equal("hsla(0,50%,100%,1)");
				});
			});
			
			M.describe("rgba()", function () {
				M.it("should make html rgb string", function() {
					HtmlColorCore.rgb(0, 0, 0).should().equal("rgb(0,0,0)");
				});
				M.it("should make html rgba string", function() {
					HtmlColorCore.rgba(0, 0, 0, 0).should().equal("rgba(0,0,0,0)");
				});
				M.it("should make html rgba string for decimal alpha", function() {
					HtmlColorCore.rgba(0, 0, 0, 0.5).should().equal("rgba(0,0,0,0.5)");
				});
			});
			
			M.describe("rgbaFraction()", function () {
				M.it("should make html rgb string", function() {
					HtmlColorCore.rgbF(0.0, 0.5, 1).should().equal("rgb(0%,50%,100%)");
				});
				M.it("should make html rgba string", function() {
					HtmlColorCore.rgbaF(0.0, 0.5, 1.0, 0).should().equal("rgba(0%,50%,100%,0)");
				});
				M.it("should make html rgba string for decimal alpha", function() {
					HtmlColorCore.rgbaF(0.0, 0.5, 1.0, 0.5).should().equal("rgba(0%,50%,100%,0.5)");
				});
			});
			
			M.describe("colorFraction()", function () {
				M.it("should calculate a color fraction", function() {
					0.0.colorFraction().should().equal(0);
					0.5.colorFraction().should().equal(127);
					1.0.colorFraction().should().equal(255);
				});				
			});
			
			M.describe("intToHexColor()", function () {
				M.it("should make a HTML hex color codes", function() {
					0.intToHexColor().should().equal("#000000");
					0xffffff.intToHexColor().should().equal("#FFFFFF");
				});				
			});
			
			M.describe("HtmlColor", function () {
				M.it("should make a HTML rgba color codes", function() {
					var c = Rgb(0, 0, 0);
					c.toString().should().equal("rgb(0,0,0)");
					c = Rgba(0, 0, 0, 0);
					c.toString().should().equal("rgba(0,0,0,0)");
					c = Color(0);
					c.toString().should().equal("#000000");
				});				
			});
			
		});
	}
	
}