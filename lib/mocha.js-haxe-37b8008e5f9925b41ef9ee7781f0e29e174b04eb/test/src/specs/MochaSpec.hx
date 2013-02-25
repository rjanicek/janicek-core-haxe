package specs;
import js.expect.Expect;
import js.Lib;
import js.mocha.Mocha;

using js.expect.Expect;
using js.mocha.Mocha;

/**
 * @author Richard Janicek
 */
class MochaSpec {
	public function new() {
		M.describe("Mocha", function() {
			
			M.it("should test synchronous code", function() { 
				true.should().be.ok();
			});
			
			M.it("should test asynchronous code", function(done) {
				var mochaIsCool = 0;
				Timer.delay(function() {
					mochaIsCool++;
					mochaIsCool.should().equal(1);
					done();
				}, 250);
				mochaIsCool.should().equal(0);
			});
			
			M.it("should allow setting timeout", function(done) {
				This.timeout(5000);
				Timer.delay(function() {
					done();
				}, 2500);
			});
		
			M.describe("hooks", function() {
				var before = false;
				M.before(function() {
					before = true;
				});
				var beforeAsync = false;
				M.before(function(done) {
					Timer.delay(function() {
						beforeAsync = true;
						done();
					}, 250);
				} );
				var after = false;
				M.after(function() {
					after = true;
				});
				
				M.describe("before / after", function() {
					M.it("should run before tests", function() {
						before.should().be.ok();
						after.should().not.be.ok();
					});
					M.it("should run before tests asynchronously", function() {
						beforeAsync.should().be.ok();
					});					
				});
				
				M.describe("beforeEach / afterEach", function() {
					var beforeEach = false;
					M.beforeEach(function() { 
						beforeEach = true;
					} );
					var beforeEachAsync = false;
					M.beforeEach(function(done) {
						Timer.delay(function() {
							beforeEachAsync = true;
							done();
						}, 250);
					} );
					var afterEach = false;
					M.afterEach(function() { 
						afterEach = true;
					} );
					M.it("should run before each test", function() {
						beforeEach.should().be.ok();
						afterEach.should().not.be.ok();
					});
					M.it("should run before each test asynchronously", function() {
						beforeEachAsync.should().be.ok();
					});
				});
			});
			
		});
		
	}
}