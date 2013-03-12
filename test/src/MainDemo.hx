using co.janicek.core.FamilyCore;
using co.janicek.core.LambdaCore;
using co.janicek.core.NullCore;
using co.janicek.core.StringCore;
using Lambda;

class MainDemo{
	public static function main() {
		
		trace("NullCore".isNull());							// false
		trace("NullCore".isNotNull());						// true
		trace(NullCore.coalesce(null, "Hobbit"));			// Hobbit
		trace([null, "Bilbo", "Hobbit"].coalesceIter());	// Bilbo
		
		var hobbit : {name : String, parent : Dynamic, children : Array<Dynamic>} = null;
		
		if (hobbit.isNull()) {
			hobbit = {
				name : "Drogo",
				parent : null,
				children: []
			};
		}
		
		var frodo = {
			name : "Frodo",
			parent : hobbit
		}
		
		hobbit.children.push(frodo);
		
		trace(hobbit.family().count());			// 2
		trace(hobbit.descendants().count());	// 1
		trace(frodo.lineage().count());			// 2
		trace(frodo.lineage().map(function(h) { return h.name; } ).array());				// [ 'Frodo', 'Drogo' ]
		trace(hobbit.family().first(function(h) { return h.name.contains("odo"); }).name);	// Frodo
		
	}
}