package specs.co.janicek.core;

import jasmine.J;

using co.janicek.core.NullCore;
using Reflect;

/**
 * NullCore specs.
 * @author Richard Janicek
 */

class NullCoreSpec {

	public function new() {
		J.describe("NullCore", function() {
			
			J.describe("isNull()", function () {
				J.it("should test nullable type for null", function() {
					var nullable : Bool = null;
					J.expect(nullable.isNull()).toBeTruthy();
					nullable = true;
					J.expect(nullable.isNull()).toBeFalsy();
					
					J.expect(true.isNull()).toBeFalsy();
					J.expect(1.isNull()).toBeFalsy();
					J.expect(1.0.isNull()).toBeFalsy();
					var object = { };
					J.expect(object.isNull()).toBeFalsy();
				});
				
				J.it("should test reflected nullable type for null", function() {
					var o = { property:null };
					J.expect(o.field("property").isNull()).toBeTruthy();
				});
			});
			
			J.describe("isNotNull()", function () {
				J.it("should test nullable type for not null", function() {
					var nullable : Bool = null;
					J.expect(nullable.isNotNull()).toBeFalsy();
					nullable = true;
					J.expect(nullable.isNotNull()).toBeTruthy();
					
					J.expect(true.isNotNull()).toBeTruthy();
					J.expect(1.isNotNull()).toBeTruthy();
					J.expect(1.0.isNotNull()).toBeTruthy();
					var object = { };
					J.expect(object.isNotNull()).toBeTruthy();
					
				});
				
				J.it("should test reflected nullable type for not null", function() {
					var o = { property:null };
					J.expect(o.field("property").isNotNull()).toBeFalsy();
				});				
			});	
			
			J.describe("coalesce()", function () {
				J.it("should coalesce a nullable by returning default value if nullable is null", function() {
					var nullable : Int = null;
					J.expect(nullable.coalesce(1)).toEqual(1);
					nullable = 0;
					J.expect(nullable.coalesce(1)).toEqual(0);
				});
			});
			
		});

	}
	
}