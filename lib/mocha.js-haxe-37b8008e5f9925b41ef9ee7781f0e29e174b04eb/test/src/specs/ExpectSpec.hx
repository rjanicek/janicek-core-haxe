package specs;
import js.expect.Expect;
import js.Lib;
import js.mocha.Mocha;

using js.expect.Expect;

/**
 * ...
 * @author Richard Janicek
 */

class ExpectSpec {
		
	public function new() {
		M.describe("Expect", function () {
			
			M.it("ok: asserts that the value is truthy or not", function() { 
				E.expect(1).to.be.ok();
				E.expect(true).to.be.ok();
				E.expect({}).to.be.ok();
				E.expect(0).to.not.be.ok();
			});
			
			M.it("be / equal: asserts === equality", function () {
				E.expect(1).toBe(1);
				E.expect(Math.NaN).not.to.equal(Math.NaN);
				E.expect(1).not.toBe(true);
				E.expect("1").not.toBe(1);
			});
			
			M.it("eql: asserts loose equality that works with objects", function () {
				E.expect( { a: "b" } ).to.eql( { a: "b" } );
				E.expect(1).to.eql("1");
			});
			
			M.it("a/an: asserts typeof with support for array type and instanceof", function () {
				E.expect(5).to.be.a("number");
				E.expect([]).to.be.an("array");  // works
				E.expect([]).to.be.an("object"); // works too, since it uses `typeof`
				
				E.expect( { } ).to.be.an("object");
				E.expect( { } ).not.to.be.an("array");
				
				//E.expect(5).to.be.a(Number);
				//E.expect([]).to.be.an(Array);
				//E.expect(tobi).to.be.a(Ferret);
				//E.expect(person).to.be.a(Mammal);
			});
			
			M.it("match: asserts String regular expression match", function () {
				E.expect(E.version).to.match("[0-9]+\\.[0-9]+\\.[0-9]+");
			});
			
			M.it("contain: asserts indexOf for an array or string", function () {
				E.expect([1, 2]).to.contain(1);
				E.expect("hello world").to.contain("world");
			});
			
			M.it("length: asserts array .length", function () {
				E.expect([]).to.have.length(0);
				E.expect([1, 2, 3]).to.have.length(3);
			});
			
			M.it("empty: asserts that an array is empty or not", function () {
				E.expect([]).to.be.empty();
				E.expect([1, 2, 3]).to.not.be.empty();
			});
			
			M.it("property: asserts presence of an own property (and value optionally)", function () {
				//E.expect(Lib.window).to.have.property("expect");
				E.expect( { a: null } ).to.have.property("a");
				E.expect( { a: "b" } ).to.have.property("a", "b");
			});
			
			M.it("key/keys: asserts the presence of a key. Supports the only modifier", function () {
				E.expect( { a: "b" } ).to.have.key("a");
				E.expect( { a: "b", c: "d" } ).to.only.have.keys("a", "c");
				E.expect( { a: "b", c: "d" } ).to.only.have.keys(["a", "c"]);
				//E.expect( { a: "b", c: "d" } ).to.not.only.have.key("a");
			});
			
			M.it("throwException: asserts that the Function throws or not when called", function () {
				E.expect(function() { throw "knife"; } ).to.throwException();
				E.expect(function() { throw "axe"; } ).to.throwException(function(str) {
					E.expect(str).toBe("axe");
				});
				E.expect(function() { throw "grenade...BOOM!"; } ).to.throwExceptionMatch("grenade");
				E.expect(function() { } ).to.not.throwException();
			});
			
			M.it("within: asserts a number within a range", function () {
				E.expect(1).to.be.within(0, Math.POSITIVE_INFINITY);
			});
			
			M.it("greaterThan/above: asserts >", function () {
				E.expect(3).to.be.above(0);
				E.expect(5).to.be.greaterThan(3);
			});
			
			M.it("lessThan/below: asserts <", function () {
				E.expect(0).to.be.below(3);
				E.expect(1).to.be.lessThan(3);
			});
			
			M.it("should allow chaining with `and`", function () {
				E.expect(5).to.be.a("number").and.toBe(5);
			});
			
			M.it("should allow 'should' mixin grammer", function () {
				true.should().be.ok();
			});
			
			M.it("should explicitly fail", function () {
				(function() { E.expect().fail(); } ).should().throwException();
			});
			
			M.it("should explicitly fail with message", function () {
				(function() { E.expect().fail("you shall not pass!"); } ).should().throwExceptionMatch("you shall not pass!");
			});
			
		});
	}
}