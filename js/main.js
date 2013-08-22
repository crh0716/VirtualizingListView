window.addEventListener('load', function() {
  var items = [];
  for (var i = 1; i < 100000; i++) {
    items.push(i);
  }

  // a simple template
  var templateFunc = function(container, content) {
    container.textContent = content;
  };

  var listview =
    ListView(document.getElementById('listview'), templateFunc);
  listview.set(items); 
});
