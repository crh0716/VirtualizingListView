var Range = function(start, end) {
  var _start = Math.min(start, end);
  var _end = Math.max(start, end);
  return {
    get start() {
      return _start;
    },
    set start(value) {
      _start = value;
    },
    get end() {
      return _end;
    },
    set end(value) {
      _end = value;
    }
  };
};

var RangeFinder = function() {
  var _curRange = Range(0, 0);

  return {
    setRange: function(newRange) {
      var newRanges = [];
      var oldRanges = [];

      if (_curRange.end < newRange.start || newRange.end < _curRange.start) {
        // no overlapping
        newRanges.push(Range(newRange.start, newRange.end));
        oldRanges.push(Range(_curRange.start, _curRange.end));
      } else {
        if (_curRange.start === newRange.start &&
            _curRange.end === newRange.end) {
          // same
          return {
            newRanges: [],
            oldRanges: []
          };
        }

        if (newRange.start >= _curRange.start &&
            newRange.end <= _curRange.end) {
          // prevRange contains curRange
          oldRanges.push(Range(_curRange.start, newRange.start - 1));
          oldRanges.push(Range(newRange.end + 1, _curRange.end));
        } else if (_curRange.start >= newRange.start &&
                   _curRange.end <= newRange.end) {
          // curRange contains prevRange
          newRanges.push(Range(newRange.start, _curRange.start - 1));
          newRanges.push(Range(_curRange.end + 1, newRange.end));
        } else {
          if (_curRange.start < newRange.start) {
            newRanges.push(Range(_curRange.end + 1, newRange.end));
            oldRanges.push(Range(_curRange.start, newRange.start - 1));
          } else {
            newRanges.push(Range(newRange.start, _curRange.start - 1));
            oldRanges.push(Range(newRange.end + 1, _curRange.end));
          }
        }
      }

      _curRange = newRange;

      return {
        newRanges: newRanges,
        oldRanges: oldRanges
      };
    }
  };
};
