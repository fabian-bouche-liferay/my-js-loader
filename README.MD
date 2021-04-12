# My Javascript Loader

This project contains a theme contributor that registers a few Javascript functions allowing to
import third party libraries from CDNs in order to use them inside of fragments.

Example with a PGN chess game library

```
function loadBoard() {

    var boardElt = fragmentElement.querySelector('.board'); 
    boardElt.id =  fragmentElement.id + "-board";

    var pgn = configuration.pgn;
    var board = PGNV.pgnView(boardElt.id, {pgn: pgn});

}

var scriptId = '@mliebelt/pgn-viewer@1.5.1';
var scriptSrc = 'https://cdn.jsdelivr.net/npm/@mliebelt/pgn-viewer@1.5.1/lib/pgnv.min.js';
loadScript(scriptSrc, scriptId);

action(loadBoard, scriptId);

```

`loadScript` loads a library by adding the script tag to the html head.
It also makes sure that the script is loaded only once.

`action` allows for the delayed execution of code once the script has been properly loaded.