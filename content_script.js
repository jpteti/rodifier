walk(document.body);

if (window.MutationObserver) {
	var observer = new MutationObserver(function (mutations) {
		Array.prototype.forEach.call(mutations, function (m) {
			if (m.type === 'childList') {
				walk(m.target);
			} else if (m.target.nodeType === 3) {
				handleText(m.target);
			}
		});
	});

	observer.observe(document.body, {
		childList: true,
		attributes: false,
		characterData: true,
		subtree: true
	});
}

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	if (textNode.parentElement.tagName.toLowerCase() === "script" || textNode.parentElement.isContentEditable === true) {
		return false;
	}

	var oldValue = textNode.nodeValue;
	var v = oldValue;
	
	v = v.replace(/\bBenedict Option\b/g, "City of Rod");
  v = v.replace(/\bBenedict Option\b/g, "City of Rod");
	v = v.replace(/\bBenedict option\b/g, "city of Rod");
  v = v.replace(/\bbenedict option\b/g, "city of rod");
	v = v.replace(/\bBENEDICT OPTION\b/g, "CITY OF ROD");
  
	v = v.replace(/\bBen Op\b/g, "Rod Op");
  v = v.replace(/\bben op\b/g, "rod op");
	v = v.replace(/\bBEN OP\b/g, "ROD OP");
  
	v = v.replace(/\bBenOp\b/g, "RodOp");
  v = v.replace(/\bbenop\b/g, "rodop");
	v = v.replace(/\bBENOP\b/g, "RODOP");
	
	if (v !== oldValue) {
		textNode.nodeValue = v;
	}
}