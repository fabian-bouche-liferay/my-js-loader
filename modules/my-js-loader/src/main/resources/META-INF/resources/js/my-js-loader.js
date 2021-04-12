console.group('My JS Loader');
console.group('Loading My JS Loader');

function loadScript(src, id) {

    var script = document.getElementById(id);
    
    if (script === null) {
        console.log("Script not found");
        script = document.createElement('script');
        script.src = src;
        script.id = id;
        document.head.appendChild(script);

        var promise = new Promise((resolve, reject) => {

            script.onload = () => {
                if(window.registeredScripts === undefined) {
                    window.registeredScripts = new Array();
                }
                if(!window.registeredScripts.includes(id)) {
                    window.registeredScripts.push(id);
                }
                resolve();
            }

        });

        if(window.onloadFuture === undefined) {
        	window.onloadFuture = new Map();
        }
        if(!window.onloadFuture.has(id)) {
        	window.onloadFuture.set(id, promise)
        }

    }

}

async function delayedAction(callback, scriptId) {
    await window.onloadFuture.get(scriptId);
    callback();
}

function action(callback, scriptId) {
	if(window.registeredScripts !== undefined && window.registeredScripts.includes(scriptId)) {
	    callback();
	} else {
	    delayedAction(callback, scriptId);
	}
}


console.groupEnd();
