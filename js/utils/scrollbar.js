var Scrollbar = function(root) {
  var _scrollbar = root;
  var _thumb = _scrollbar.querySelector('.thumb');

  var _scrollbarStyle = window.getComputedStyle(_scrollbar);
  var _thumbStyle = window.getComputedStyle(_thumb);

  var _thumbHeight = parseInt(_thumbStyle.height);
  var _totalRange = parseInt(_scrollbarStyle.height) - _thumbHeight;
  var _isScrolling = false;

  var _offset = 0;
  var _startY = 0;
  var _originalOffset = 0;
  var _prevOffset = -1;

  window.addEventListener('mousedown', function(event) {
    if (event.target === _thumb) {
      _isScrolling = true;
      _startY = event.clientY;
      _originalOffset = _offset;
      _prevOffset = _offset;

      event.preventDefault();
    }
  });
  window.addEventListener('mousemove', function(event) {
    if (_isScrolling) {
      var diffY = event.clientY - _startY;
      _offset = Math.min(_totalRange, Math.max(0, _originalOffset + diffY));

      if (_offset !== _prevOffset) {
        _prevOffset = _offset;
        _thumb.style.top = _offset + 'px';

        var evtObject = document.createEvent('Event');
        evtObject.initEvent('changed', false, false);
        evtObject.value = _offset / _totalRange;
        _scrollbar.dispatchEvent(evtObject);
      }

      event.preventDefault();
    }
  });
  window.addEventListener('mouseup', function(event) {
    _isScrolling = false;
  });

  return {
    get value() {
      return _offset / _totalRange;
    },

    addEventListener: function(type, handler) {
      _scrollbar.addEventListener(type, handler);
    }
  };
};
