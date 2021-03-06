/*
 * bae-details
 * https://github.com/mognom/bae-details-widget
 *
 * Copyright (c) 2016 CoNWeT
 * Licensed under the MIT license.
 */

/*global MashupPlatform, angular, StyledElements */

angular
    .module('widget', ['ngMaterial', 'ngResource', "angularMoment"])
    .controller('WidgetCtrl', function ($scope, $resource) {
        "use strict";

        var init = function init () {

            MashupPlatform.wiring.registerCallback('offering', function (offering) {
                // Create tabs
                $scope.offering = [];
                $scope.$apply();

                var notebook = new StyledElements.Notebook({});
                document.getElementById("container").appendChild(notebook.wrapperElement);

                var widgetData = notebook.createTab({
                    label: "Components",
                    closable: false
                });
                widgetData.wrapperElement.appendChild(document.getElementById("widgets"));

                var tabPayment = notebook.createTab({
                    label: "Pricing",
                    closable: false
                });
                tabPayment.wrapperElement.appendChild(document.getElementById("paymentInfo"));

                var tabData = notebook.createTab({
                    label: "Products",
                    closable: false
                });
                tabData.wrapperElement.appendChild(document.getElementById("products"));

                // Set data
                if (offering.productSpecification.isBundle) {
                    offering.allProducts = offering.productSpecification.bundledProductSpecification;
                } else {
                    offering.allProducts = [offering.productSpecification];
                }

                // Update view
                $scope.offering = offering;
                $scope.getDefaultImage = getDefaultImage;
                $scope.getPriceAlterationData = getPriceAlterationData;
                $scope.getPanelType = getPanelType;
                $scope.$apply();
            });
        };

        // Return the first attached image
        var getDefaultImage = function getDefaultImage (product) {
            var attachments = product.attachment;
            if (attachments) {
                for (var i = 0; i < attachments.length; i++) {
                    if (attachments[i].type === "Picture") {
                        return attachments[i].url;
                    }
                }
            }
            return "";
        };

        var getPriceAlterationData = function getPriceAlterationData (price) {
            var aux = price.productOfferPriceAlteration.price;
            return Object.keys(aux)[0] + ": " + aux[Object.keys(aux)[0]];
        };

        var getPanelType = function getPanelType(priceplan) {
            return "panel-heading-" + priceplan.priceType;
        };

        init();
    });