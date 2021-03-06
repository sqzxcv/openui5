/*
 * ! ${copyright}
 */

// Provides control sap.m.QuickViewGroupElement
sap.ui.define([
		'jquery.sap.global', 'sap/m/library', 'sap/ui/core/Element', 'sap/m/QuickViewGroupElementType'],
	function(jQuery, library, Element, GroupElementType) {
		"use strict";

		/**
		 * Constructor for a new QuickViewGroupElement
		 *
		 * @param {string} [sId] id for the new control, generated automatically if no id is given
		 * @param {object} [mSettings] initial settings for the new control
		 * @class QuickViewGroupElement is a combination of one label and another control (Link or Text) associated to this label
		 * @extends sap.ui.core.Element
		 * @author SAP SE
		 * @constructor
		 * @public
		 * @alias sap.m.QuickViewGroupElement
		 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
		 */
		var GroupElement = Element.extend("sap.m.QuickViewGroupElement",
			{
				metadata: {

					library: "sap.m",
					properties: {

						/**
						 * The text displayed below the associated label
						 */
						label: {
							type: "string",
							group: "Misc",
							defaultValue: ""
						},

						/**
						 * The text of the control that associates with the label.
						 */
						value: {
							type: "string",
							group: "Misc",
							defaultValue: ""
						},

						/**
						 * The address of the QuickViewGroupElement link. Works only with QuickViewGroupElement of type link.
						 */
						url: {
							type: "string",
							group: "Misc",
							defaultValue: ""
						},

						/**
						 * The target of the link – it works like the target property of the HTML <a> tag. Works only with QuickViewGroupElement of type link.
						 */
						target: {
							type: "string",
							group: "Misc",
							defaultValue: "_blank"
						},

						/**
						 * The type of the displayed information – phone number, mobile number, e-mail, link, text or a link to another QuickViewCard. Default value is ‘text’.
						 */
						type: {
							type: "sap.m.QuickViewGroupElementType",
							group: "Misc",
							defaultValue: GroupElementType.text
						},

						/**
						 * The id of the QuickViewCard, which is opened from the link in the QuickViewGroupElement.
						 * Works only with QuickViewGroupElement of type pageLink.
						 */
						cardLinkId: {
							type: "string",
							group: "Misc",
							defaultValue: ""
						}
					}
				}
			});

		/**
		 * Returns a control that should be associated with the label of the group element.
		 *
		 * @private
		 */
		GroupElement.prototype._getGroupElementValue = function() {
			switch (this.getType()) {
				case GroupElementType.email:
					return new sap.m.Link({
						href : "mailto:" + this.getValue(),
						text : this.getValue()
					});
				case GroupElementType.phone:
				case GroupElementType.mobile:
					return new sap.m.Link({
						href : "tel:" + this.getValue(),
						text : this.getValue()
					});
				case GroupElementType.link:
					return new sap.m.Link({
						href : this.getUrl(),
						text : this.getValue(),
						target : this.getTarget()
					});
				case GroupElementType.cardLink:
					return new sap.m.Link({
						href : "#",
						text : this.getValue(),
						customData : [ new sap.ui.core.CustomData({
							key : "cardNumber",
							value : this.getCardLinkId()
						})]
					});
				default:
					return new sap.m.Text({
						text : this.getValue()
					});
			}
		};

		return GroupElement;

	}, /* bExport= */true);
