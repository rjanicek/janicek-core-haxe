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