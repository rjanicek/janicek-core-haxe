package specs.co.janicek.core.html;

import co.janicek.core.html.ColorCore;
import jasmine.J;

using co.janicek.core.html.ColorCore;

/**
 * ...
 * @author Richard Janicek
 */

class ColorCoreSpec {

	public function new() {
		J.describe("ColorCore", function() {
			
			J.describe("rgba()", function () {
				J.it("should make html rgb string", function() {
					J.expect(ColorCore.rgba(0, 0, 0)).toEqual("rgb(0,0,0)");
				});
				J.it("should make html rgba string", function() {
					J.expect(ColorCore.rgba(0, 0, 0, 0)).toEqual("rgba(0,0,0,0)");
				});
				J.it("should make html rgba string for decimal alpha", function() {
					J.expect(ColorCore.rgba(0, 0, 0, 0.5)).toEqual("rgba(0,0,0,0.5)");
				});
			});
			
			J.describe("rgbaFraction()", function () {
				J.it("should make html rgb string", function() {
					J.expect(ColorCore.rgbaFraction(0.0, 0.5, 1)).toEqual("rgb(0%,50%,100%)");
				});
				J.it("should make html rgba string", function() {
					J.expect(ColorCore.rgbaFraction(0.0, 0.5, 1.0, 0)).toEqual("rgba(0%,50%,100%,0)");
				});
				J.it("should make html rgba string for decimal alpha", function() {
					J.expect(ColorCore.rgbaFraction(0.0, 0.5, 1.0, 0.5)).toEqual("rgba(0%,50%,100%,0.5)");
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
			
		});
	}
	
}