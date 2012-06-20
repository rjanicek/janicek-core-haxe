package specs.co.janicek.core;
import jasmine.J;

using co.janicek.core.PathCore;

/**
 * PathCore specs.
 * @author Richard Janicek
 */

class PathCoreSpec {

	public function new() {
		J.describe("PathCore", function() {
			
			J.describe("getDirectoryName()", function(){
				J.it("should get directory name from path that includes filename", function() {
					J.expect("a/b.txt".getDirectoryName()).toEqual("a");
				});
			});
			
			J.describe("getFileName()", function(){
				J.it("should get file name from path", function() {
					J.expect("a/b.txt".getFileName()).toEqual("b.txt");
				});
			});
			
			J.describe("removeFileNameExtension()", function(){
				J.it("should remove exentsion from path", function() {
					J.expect("a/b.txt".removeFileNameExtension()).toEqual("a/b");
				});
				J.it("should remove exentsion from file name", function() {
					J.expect("b.txt".removeFileNameExtension()).toEqual("b");
				});
				J.it("should not remove exentsion from file name without an extension", function() {
					J.expect("filename".removeFileNameExtension()).toEqual("filename");
				});
			});
			
		});
	}
	
}