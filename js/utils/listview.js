var ListView = function(root, templateFunc) {
  var _rootStyle = window.getComputedStyle(root);
  var _viewportWidth = parseInt(_rootStyle.width);
  var _viewportHeight = parseInt(_rootStyle.height);
  var _panel = root.querySelector('.panel');

  var _layout =
    WrapLayout(_panel, _viewportWidth, _viewportHeight, templateFunc);

  // refresh the panel when scrolling changes
  var _scrollbar = Scrollbar(root.querySelector('.scrollbar'));
  _scrollbar.addEventListener('changed', function(event) {
    var offset = event.value * (_layout.panelHeight - _layout.viewportHeight);
    _layout.scrollTo(offset);
  });

  return {
    set: function(items) {
      _layout.set(items);
    }
  };
};
