$(function(){
    "use strict";
    (function (ns) {
        window.provide.Models = window.provide.Models || {};
        window.provide.Models.ViewModel = window.provide.Models.ViewModel || {};
    })(window.provide = window.provide || {})

    $('.navbar-nav > li:not(.dropdown) > a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });

    var navigation = $("#navbar");
    navigation.on("show.bs.collapse", function(e){
       $(this).parents(".navigation").addClass("menu-is-open") ;
    });
    navigation.on("hide.bs.collapse", function(e){
       $(this).parents(".navigation").removeClass("menu-is-open")
    });

    function scrolled(){
        var $nav = $('.navigation');
        var $logo = $(".navbar-brand img");
        if($(window).scrollTop() > 50){
            $nav.addClass("is-scrolling");
            $logo.addClass("is-scrolling");
        }
        else{
            $nav.removeClass("is-scrolling");
            $logo.removeClass("is-scrolling");
        }
    }
    scrolled();
    $(window).on("scroll", function(){
       scrolled();
    });

    ko.bindingHandlers.fadeVisible = {
        init: function (element, valueAccessor) {
            // Initially set the element to be instantly visible/hidden depending on the value
            var value = valueAccessor();
            $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
        },
        update: function (element, valueAccessor) {
            // Whenever the value subsequently changes, slowly fade the element in or out
            var value = valueAccessor();
            ko.unwrap(value) ? $(element).fadeIn('fast') : $(element).fadeOut('fast');
        }
    };

    ko.applyBindings(window.provide.Models.ViewModel, document.getElementById('binding-wrapper'));
});