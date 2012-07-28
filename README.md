janicek-core-haxe
-----------------

My personal collection of Haxe core libraries.

Functional style preferred:
* Modularity through simple data types and simple functions.
* Functions are organized into "core" libraries using static classes.
* Libraries are designed to be used as mix-ins.
* Favor pure functions, avoid state and side effects.
* Favor readability and modularity over performance.
* Functions that take many parameters are ok.
* Favor passing parameters by value, and immutability.
* Functions that have reference parameter types can mutate the parameters, but should always return the mutated parameter reference. Callers of these functions should not depend on the parameter mutations but should only depend on the returned values. This will make it easier to add immutability should Haxe ever support it without sacrificing performance now.

Tested with Haxe 2.10 on JavaScript.

See [spec classes](https://github.com/rjanicek/janicek-core-haxe/tree/master/test/specs/co/janicek/core) for examples of how to use the libraries.

Make sure to run ``git submodule update --init`` to clone the external libraries.

API -> http://rjanicek.github.com/janicek-core-haxe/api

Specs -> http://rjanicek.github.com/janicek-core-haxe

GitHub -> https://github.com/rjanicek/janicek-core-haxe