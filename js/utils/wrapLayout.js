/*
 * WrapLayout places containers on positions based on the algorithm.
 */
var WrapLayout = function(root, viewportWidth, viewportHeight, templateFunc) {
  var _panel = root;
  var _panelStyle = window.getComputedStyle(_panel);
  var _panelWidth = parseInt(_panelStyle.width);
  var _panelHeight = 0;

  var _templateFunc = templateFunc;

  var _viewportWidth = viewportWidth;
  var _viewportHeight = viewportHeight;

  var _offset = 0;
  var _items = [];
  var _itemCount = 0;

  var _containerWidth = 90;
  var _containerHeight = 90;
  var _containersPerRow = _panelWidth / _containerWidth | 0;
  var _containersPerPage =
    (Math.ceil(_viewportHeight / _containerHeight) + 1) * _containersPerRow;

  var _rangeFinder = RangeFinder(0, 0);
  var _generator = ItemContainerGenerator(_panel);

  var _refreshPanelSize = function() {
    _panelHeight = Math.ceil(_itemCount / _containersPerRow) * _containerHeight;
    _panel.style.height = _panelHeight + 'px';
  };

  var _layout = function(offset) {
    _offset = offset;

    var targetRow = Math.floor(offset / _containerHeight);
    var startIndex = Math.max(0, targetRow - 1) * _containersPerRow;
    var endIndex = Math.min(_itemCount - 1, startIndex + _containersPerPage);

    var diffRanges = _rangeFinder.setRange(Range(startIndex, endIndex));
    var oldRanges = diffRanges.oldRanges;
    var newRanges = diffRanges.newRanges;

    // remove old ranges
    oldRanges.forEach(function(range) {
      for (var itemIndex = range.start; itemIndex <= range.end; itemIndex++) {
        var container = _generator.getContainerFromIndex(itemIndex);
        _generator.recycleContainer(container, itemIndex);
      }
    });

    // draw new ranges
    newRanges.forEach(function(range) {
      for (var itemIndex = range.start; itemIndex <= range.end; itemIndex++) {
        var column = itemIndex % _containersPerRow;
        var row = itemIndex / _containersPerRow | 0;

        var container = _generator.getContainerForIndex(itemIndex);
        container.style.top = (row * _containerHeight) + 'px';
        container.style.left = (column * _containerWidth) + 'px';

        _templateFunc(container, _items[itemIndex]);
      }
    });

    _panel.style.webkitTransform = 'translateY(' + -offset + 'px)';
  };

  return {
    set: function(items) {
      _items = items;
      _itemCount = items.length;

      _refreshPanelSize();
      _layout(0);
    },

    scrollTo: function(offset) {
      _layout(offset);
    },

    scrollBy: function(value) {
      _layout(_offset + value);
    },

    get panelWidth() {
      return _panelWidth;
    },

    get panelHeight() {
      return _panelHeight;
    },

    get viewportWidth() {
      return _viewportWidth;
    },

    get viewportHeight() {
      return _viewportHeight;
    }
  };
};
