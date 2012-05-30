package co.janicek.core;
import jasmine.J;

/**
 * PathCore specs.
 * @author Richard Janicek
 */

class PathCoreSpec {

	public function new() {
		J.describe("PathCore", function() {
			J.it("should get directory name from path that includes filename", function() {
				J.expect(PathCore.getDirectoryName("a/b.txt")).toEqual("a");
			});
			
			J.it("should get file name from path", function() {
				J.expect(PathCore.getFileName("a/b.txt")).toEqual("b.txt");
			});
			
			J.it("should get file name without exentsion from path", function() {
				J.expect(PathCore.getFileNameWithoutExtension("a/b.txt")).toEqual("b");
			});
		});

	}
	
}