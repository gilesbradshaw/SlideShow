class Slide
	constructor: (content)->
		@content=ko.observable content

class SlideShow
	constructor:(firstContent)->
		@slides.push new Slide "first content"
		@currentSlide = ko.computed ()=>
			@slides()[@currentPosition()]
		@add = () =>
			@slides.splice @currentPosition()+1,0,new Slide @newContent()
			@newContent "some new content"
			@next()
		@next = ()=>
			if @currentPosition() is @slides().length-1
				@currentPosition 0
			else
				@currentPosition @currentPosition()+1
		@previous = ()=>
			if @currentPosition() is 0
				@currentPosition @slides().length-1
			else
				@currentPosition @currentPosition()-1
		@go = (index)=>
			@currentPosition index()
		@remove = ()=>
			if @slides().length>1
				if @currentPosition() > @slides().length-2
					@currentPosition @slides().length-2
				@slides.splice @currentPosition(),1

	slides: ko.observableArray()
	currentPosition: ko.observable 0
	newContent: ko.observable "some new content"
$(document).ready ()->
	ko.applyBindings new SlideShow "first slide"