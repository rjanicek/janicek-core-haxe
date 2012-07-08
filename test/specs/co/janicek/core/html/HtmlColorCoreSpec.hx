package specs.co.janicek.core.html;

import co.janicek.core.html.HtmlColorCore;
import co.janicek.core.html.HtmlColor;
import jasmine.J;

using co.janicek.core.html.HtmlColorCore;
using co.janicek.core.html.HtmlColor;

/**
 * ...
 * @author Richard Janicek
 */

class HtmlColorCoreSpec {

	public function new() {
		J.describe("HtmlColorCore", function() {
			
			J.describe("getRedComponent()", function () {
				J.it("should get red color coponent", function() {
					J.expect(HtmlColorCore.getRedComponent(0x112233)).toEqual(0x11);
					J.expect(HtmlColorCore.getRedComponent(0x9112233)).toEqual(0x11);
				});
			});
			
			J.describe("getGreenComponent()", function () {
				J.it("should get green color coponent", function() {
					J.expect(HtmlColorCore.getGreenComponent(0x112233)).toEqual(0x22);
					J.expect(HtmlColorCore.getGreenComponent(0x9112233)).toEqual(0x22);
				});
			});

			J.describe("getBlueComponent()", function () {
				J.it("should get blue color coponent", function() {
					J.expect(HtmlColorCore.getBlueComponent(0x112233)).toEqual(0x33);
					J.expect(HtmlColorCore.getBlueComponent(0x9112233)).toEqual(0x33);
				});
			});
			
			J.describe("hsla()", function () {
				J.it("should make html hsl string", function() {
					J.expect(HtmlColorCore.hsl(0, 0.0, 0.0)).toEqual("hsl(0,0%,0%)");
				});
				J.it("should make html hsla string", function() {
					J.expect(HtmlColorCore.hsla(0, 0.0, 0.0, 0.5)).toEqual("hsla(0,0%,0%,0.5)");
				});
				J.it("should make html hsla string for decimal values", function() {
					J.expect(HtmlColorCore.hsla(0, 0.5, 1.0, 1.0)).toEqual("hsla(0,50%,100%,1)");
				});
			});
			
			J.describe("rgba()", function () {
				J.it("should make html rgb string", function() {
					J.expect(HtmlColorCore.rgb(0, 0, 0)).toEqual("rgb(0,0,0)");
				});
				J.it("should make html rgba string", function() {
					J.expect(HtmlColorCore.rgba(0, 0, 0, 0)).toEqual("rgba(0,0,0,0)");
				});
				J.it("should make html rgba string for decimal alpha", function() {
					J.expect(HtmlColorCore.rgba(0, 0, 0, 0.5)).toEqual("rgba(0,0,0,0.5)");
				});
			});
			
			J.describe("rgbaFraction()", function () {
				J.it("should make html rgb string", function() {
					J.expect(HtmlColorCore.rgbF(0.0, 0.5, 1)).toEqual("rgb(0%,50%,100%)");
				});
				J.it("should make html rgba string", function() {
					J.expect(HtmlColorCore.rgbaF(0.0, 0.5, 1.0, 0)).toEqual("rgba(0%,50%,100%,0)");
				});
				J.it("should make html rgba string for decimal alpha", function() {
					J.expect(HtmlColorCore.rgbaF(0.0, 0.5, 1.0, 0.5)).toEqual("rgba(0%,50%,100%,0.5)");
				});
			});
			
			J.describe("colorFraction()", function () {
				J.it("should calculate a color fraction", function() {
					J.expect(0.0.colorFraction()).toEqual(0);
					J.expect(0.5.colorFraction()).toEqual(127);
					J.expect(1.0.colorFraction()).toEqual(255);
				});				
			});
			
			J.describe("intToHexColor()", function () {
				J.it("should make a HTML hex color codes", function() {
					J.expect(0.intToHexColor()).toEqual("#000000");
					J.expect(0xffffff.intToHexColor()).toEqual("#FFFFFF");
				});				
			});
			
			J.describe("HtmlColor", function () {
				J.it("should make a HTML rgba color codes", function() {
					var c = Rgb(0, 0, 0);
					J.expect(c.toString()).toEqual("rgb(0,0,0)");
					c = Rgba(0, 0, 0, 0);
					J.expect(c.toString()).toEqual("rgba(0,0,0,0)");
					c = Color(0);
					J.expect(c.toString()).toEqual("#000000");
				});				
			});
			
		});
	}
	
}