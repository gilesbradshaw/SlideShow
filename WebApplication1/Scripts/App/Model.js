(function() {
  var Slide, SlideShow;

  Slide = (function() {

    Slide.name = 'Slide';

    function Slide(content) {
      this.content = ko.observable(content);
    }

    return Slide;

  })();

  SlideShow = (function() {

    SlideShow.name = 'SlideShow';

    function SlideShow(firstContent) {
      var _this = this;
      this.slides.push(new Slide("first content"));
      this.currentSlide = ko.computed(function() {
        return _this.slides()[_this.currentPosition()];
      });
      this.add = function() {
        _this.slides.splice(_this.currentPosition() + 1, 0, new Slide(_this.newContent()));
        _this.newContent("some new content");
        return _this.next();
      };
      this.next = function() {
        if (_this.currentPosition() === _this.slides().length - 1) {
          return _this.currentPosition(0);
        } else {
          return _this.currentPosition(_this.currentPosition() + 1);
        }
      };
      this.previous = function() {
        if (_this.currentPosition() === 0) {
          return _this.currentPosition(_this.slides().length - 1);
        } else {
          return _this.currentPosition(_this.currentPosition() - 1);
        }
      };
      this.go = function(index) {
        return _this.currentPosition(index());
      };
      this.remove = function() {
        if (_this.slides().length > 1) {
          if (_this.currentPosition() > _this.slides().length - 2) {
            _this.currentPosition(_this.slides().length - 2);
          }
          return _this.slides.splice(_this.currentPosition(), 1);
        }
      };
    }

    SlideShow.prototype.slides = ko.observableArray();

    SlideShow.prototype.currentPosition = ko.observable(0);

    SlideShow.prototype.newContent = ko.observable("some new content");

    return SlideShow;

  })();

  $(document).ready(function() {
    return ko.applyBindings(new SlideShow("first slide"));
  });

}).call(this);
