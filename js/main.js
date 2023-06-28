/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */

(function ($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
	$(window).load(function () {
		$("#loader").fadeOut("slow", function () {
			$("#preloader").delay(300).fadeOut("slow");
		});
	})


	/*---------------------------------------------------- */
	/* FitText Settings
	------------------------------------------------------ */
	setTimeout(function () {

		$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */
	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */
	$("#owl-slider").owlCarousel({
		navigation: false,
		pagination: true,
		itemsCustom: [
			[0, 1],
			[700, 2],
			[960, 3]
		],
		navigationText: false
	});


	/*----------------------------------------------------- */
	/* Alert Boxes
		------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function () {
		$(this).parent().fadeOut(500);
	});


	/*----------------------------------------------------- */
	/* Intro effect
		------------------------------------------------------- */
	const typed = document.querySelector('.typed');
	if (typed) {
		let typed_strings = typed.getAttribute('data-typed-items');
		typed_strings = typed_strings.split(',');
		new Typed('.typed', {
			strings: typed_strings,
			loop: true,
			typeSpeed: 100,
			backSpeed: 50,
			backDelay: 2000
		});
	}


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded(function () {

		containerProjects.masonry({
			itemSelector: '.folio-item',
			resize: true
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
	$('.item-wrap a').magnificPopup({

		type: 'inline',
		fixedContentPos: false,
		removalDelay: 300,
		showCloseBtn: false,
		mainClass: 'mfp-fade'

	});

	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});


	/*-----------------------------------------------------*/
	/* Navigation Menu
------------------------------------------------------ */
	var toggleButton = $('.menu-toggle'),
		nav = $('.main-navigation');

	toggleButton.on('click', function (e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

	nav.find('li a').on("click", function () {

		toggleButton.toggleClass('is-clicked');

		nav.fadeOut();

	});


	/*---------------------------------------------------- */
	/* Highlight the current section in the navigation bar
	------------------------------------------------------ */
	var sections = $("section"),
		navigation_links = $("#main-nav-wrap li a");

	sections.waypoint({

		handler: function (direction) {

			var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

			navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},

		offset: '25%'
	});


	/*---------------------------------------------------- */
	/* Smooth Scrolling
	------------------------------------------------------ */
	$('.smoothscroll').on('click', function (e) {

		e.preventDefault();

		var target = this.hash,
			$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 800, 'swing', function () {
			window.location.hash = target;
		});

	});


	/*----------------------------------------------------- */
	/* owl-slider
	------------------------------------------------------- */
	$(document).ready(function () {
		$('.services-slider').owlCarousel({
			items: 1,
			loop: true,
			autoplay: true,
			autoplayTimeout: 2000,
			autoplayHoverPause: true,
			dots: true
		});
	});



	/*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */
	$('input, textarea, select').placeholder()


	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */
	$('#contactForm').validate({

		submitHandler: function (form) {
			var sLoader = $('#submit-loader');
			sLoader.fadeIn();

			var formData = $(form).serializeArray();
			var data = {};
			formData.forEach(function (field) {
				data[field.name] = field.value;
			});

			$.ajax({
				type: "POST",
				url: "https://script.google.com/macros/s/AKfycbzAlQS2Vvj1nI2VraNae4eC4CaBBqhxJHLtoNpFk-46aYBU7eoUzoYh5bEtSkISHwG_/exec",
				data: data,
				success: function (response) {
					sLoader.fadeOut();
					$('#message-warning').hide();
					$('#contactForm').fadeOut();
					$('#message-success').fadeIn();
				},
				error: function () {
					sLoader.fadeOut();
					$('#message-warning').html("Something went wrong. Please try again.");
					$('#message-warning').fadeIn();
				}
			});
		}
	});

	function doPost(e) {
		var sheet = SpreadsheetApp.openById('1-r4o1Heg_rfDWZYM3IhXKc7gdhbl15k9v6BTs6p8TJc').getActiveSheet();
		var rowData = [];
		for (var param in e.parameters) {
			rowData.push(e.parameters[param][0]);
		}
		sheet.appendRow(rowData);
		return ContentService.createTextOutput('Success');
	}



	/*----------------------------------------------------- */
	/* Back to top
------------------------------------------------------- */
	var pxShow = 300;
	var fadeInTime = 400;
	var fadeOutTime = 400;
	var scrollSpeed = 300;

	jQuery(window).scroll(function () {

		if (!($("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}

	});

})(jQuery);