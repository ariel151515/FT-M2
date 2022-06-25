var traverseDomAndCollectElements = function(matchFunc, startEl = startEl = document.body) { // parametropor default
  var resultSet = [];

  /*

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  */


  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) resultSet.push(startEl)

  for(let i = 0; i < startEl.children.length; i++) { // esta funcio recorre el arbol
    let resultado = traverseDomAndCollectElements(matchFunc)(startEl.children[i])
    resultSet = [...resultSet, ... resultado] // concatena 
  }

};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0] === '#') return 'id';
  if(selector[0] === '.') return 'class';
  // if(selector.includes('.')) return 'tag.class';
  if(selector.split('.').length === 2) return 'tag.class'; // el split() divide en dos Ejmeplo: 'tag.class'.split('.') = ['tag','class'];
  return 'tag'
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
    matchFunction = function(element){
      return '#' + element.id === selector;
    }

  } else if (selectorType === "class") {
    matchFunction = function(element){
      for(let i = 0; i < element.classlist.length; i++) {
         if(`.${el.classlist[i]}` === selector) {
              return true;
         }
         return false;
      }
    }
  } else if (selectorType === "tag.class") {
      matchFunction = function(element){
       
      let [tag, className] = selector.split('.') // obtengo los valores por separado 

      return matchFunctionMaker(tag)(element) && matchFunctionMaker('.' + className)(element)
          
      }
  } else if (selectorType === "tag") {
    matchFunction = function(element){
      return element.tagName === selector.toUpperCase()
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};


