window.provide = window.provide || {};
window.provide.Models = window.provide.Models || {};

function grabJSON() {
    window.provide.Models.ViewModel.loading(true);
    var url = "/js/en-US.json";
    var $dfd = new $.Deferred();
    var data = {};
    $.getJSON(url, data, function (result) {
        $dfd.resolve(result);
    }).fail(function (xhr) {
        $dfd.reject(xhr);
    });
    return $dfd.promise();
}

function shouldRender(section) {
    return section != null && (typeof(section.enabled) == 'undefined' || section.enabled);
}

$(function() {
    (function(ns) {
        ns.loading = ko.observable(true);
        ns.data = ko.observableArray();

        /*Nav Section Observables*/
        ns.nav = ko.observable(true);
        ns.navLinks = ko.observableArray();

        /* Hero Section Observables */
        ns.heroSection = ko.observable(true);
        ns.mainHeading = ko.observable();
        ns.subHeading = ko.observable();
        /*End Hero Section Observables*/

        /*Mission Section Observables*/
        ns.missionSection = ko.observable(true);
        ns.missionHeading = ko.observable();
        ns.missionSubHeading = ko.observable();
        ns.missionHighlights = ko.observableArray();
        /*End Mission Section Observables*/

        /*About Section Observables*/
        ns.aboutSection = ko.observable(true);
        ns.aboutHeading = ko.observable();
        ns.aboutSubHeading = ko.observable();
        ns.aboutHighlights = ko.observableArray();
        /*End About Section Observables*/

        /*Events Sction Observables*/
        ns.eventsSection = ko.observable(true);
        ns.eventsHeading = ko.observable();
        ns.eventsSubHeading = ko.observable();
        ns.events = ko.observableArray();
        /*Events Section Observables*/

        /*Divider Section Observables*/
        ns.dividerSection = ko.observable(true);
        ns.dividerTopHeading = ko.observable();
        ns.dividerBottomHeading = ko.observable();
        ns.dividers = ko.observableArray();
        /*End Divider Section Observables*/

        /*Team Section Observables*/
        ns.teamSection = ko.observable(true);
        ns.teamHeading = ko.observable();
        ns.teamSubHeading = ko.observable();
        ns.teamMembers = ko.observableArray();
        /*End Team Section Observables*/

        /*Contact Section Observables*/
        ns.contactSection = ko.observable(true);
        ns.contactAddress = ko.observable();
        ns.contactEmail = ko.observable();
        ns.contactMailto = ko.observable();
        ns.contactPhone = ko.observable(false);
        ns.contactTel = ko.observable(false);
        ns.subscriptionHeading = ko.observable();
        ns.subscriptionSubHeading = ko.observable();
        ns.allowEmailSubscriptions = ko.observable(true);
        /*End Contact Section Observables*/

        /*Social Media Section Observables*/
        ns.socialMedia = ko.observableArray();
        /*End Social Media Section Observables*/

        /*Footer Text*/
        ns.footer = ko.observable();
        ns.footerText = ko.observable()

        ns.setView = function(){
            var nav = (ns.data()["nav"]) ? ns.data()["nav"][0]: [];
            if (!shouldRender(nav)) {
                ns.nav(false);
            } else {
                ns.navLinks(nav.links);
            }

            var hero  = (ns.data()["hero"]) ? ns.data()["hero"][0] : null;
            if (!shouldRender(hero)) {
                ns.heroSection(false);
            } else{
                ns.mainHeading(hero.mainHeading);
                ns.subHeading(hero.subHeading);
            }

            var mission = (ns.data()["mission"]) ? ns.data()["mission"][0] : null;
            if (!shouldRender(mission)) {
                ns.missionSection(false);
            } else {
                ns.missionHeading(mission.heading);
                ns.missionSubHeading(mission.subHeading);
                ns.missionHighlights(mission.highlights);
            }

            var about = (ns.data()["about"]) ? ns.data()["about"][0] : null;
            if (!shouldRender(about)) {
                ns.aboutSection(false);
            } else {
                ns.aboutHeading(about.heading);
                ns.aboutSubHeading(about.subHeading);
                ns.aboutHighlights(about.highlights);
            }

            var events = (ns.data()["events"]) ? ns.data()["events"][0] : null;
            if (!shouldRender(events)) {
                ns.eventsSection(false);
            } else {
                ns.eventsHeading(events.heading);
                ns.eventsSubHeading(events.subHeading);
                ns.events(events.events);
            }

            var cardViews = (ns.data()["cardViews"]) ? ns.data()["cardViews"][0] : null;  // FIXME -- refactor as featuresSection
            if (!shouldRender(cardViews)) {
                ns.dividerSection(false);
            } else {
                ns.dividers(cardViews);
            }

            var team = (ns.data()["team"]) ? ns.data()["team"][0] : null;
            if (!shouldRender(team)) {
                ns.teamSection(false);
            } else {
                ns.teamHeading(team.heading);
                ns.teamSubHeading(team.subHeading);
                ns.teamMembers(team.members);
            }

            var contact = (ns.data()["contact"]) ? ns.data()["contact"][0] : null;
            if (!shouldRender(contact)) {
                ns.contactSection(false);
            } else {
                ns.contactAddress(contact.address);
                ns.contactEmail(contact.email);
                ns.contactMailto(contact.mailto);
                ns.contactPhone(contact.phone);
                ns.contactTel(contact.tel);

                ns.socialMedia(contact.socialMedia);

                ns.subscriptionHeading(contact.subscriptionHeading);
                ns.subscriptionSubHeading(contact.subscriptionSubHeading);
                ns.allowEmailSubscriptions = contact.allowEmailSubscriptions;
            }

            var footer = (ns.data()["footer"]) ? ns.data()["footer"][0] : null;
            if (!shouldRender(footer)) {
                ns.footer(false);
            } else {
                ns.footer(true);
                ns.footerText(footer.copyright);
            }
        }

        var init = function() {
            grabJSON().then(function(data) {
                ns.data(data);
                ns.setView();
            }, function() {
                // TODO: focus initial active nav and cardview
            });
        };

        init();
        return ns;
    })(window.provide.Models.ViewModel = window.provide.Models.ViewModel || {});
})
