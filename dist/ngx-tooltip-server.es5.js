import { ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, NgModule, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
var TooltipContentComponent = /** @class */ (function () {
    /**
     * @param {?} element
     * @param {?} cdr
     */
    function TooltipContentComponent(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.placement = 'bottom';
        this.animation = true;
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.top = -100000;
        this.left = -100000;
        this.isIn = false;
        this.isFade = false;
    }
    /**
     * @return {?}
     */
    TooltipContentComponent.prototype.ngAfterViewInit = function () {
        this.show();
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    TooltipContentComponent.prototype.show = function () {
        if (!this.hostElement) {
            return;
        }
        var /** @type {?} */ p = this.positionElements(this.hostElement, this.element.nativeElement.children[0], this.placement);
        this.top = p.top;
        this.left = p.left;
        this.isIn = true;
        if (this.animation) {
            this.isFade = true;
        }
    };
    /**
     * @return {?}
     */
    TooltipContentComponent.prototype.hide = function () {
        this.top = -100000;
        this.left = -100000;
        this.isIn = true;
        if (this.animation) {
            this.isFade = false;
        }
    };
    /**
     * @param {?} hostEl
     * @param {?} targetEl
     * @param {?} positionStr
     * @param {?=} appendToBody
     * @return {?}
     */
    TooltipContentComponent.prototype.positionElements = function (hostEl, targetEl, positionStr, appendToBody) {
        if (appendToBody === void 0) { appendToBody = false; }
        var /** @type {?} */ positionStrParts = positionStr.split('-');
        var /** @type {?} */ pos0 = positionStrParts[0];
        var /** @type {?} */ pos1 = positionStrParts[1] || 'center';
        var /** @type {?} */ hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        var /** @type {?} */ targetElWidth = targetEl.offsetWidth;
        var /** @type {?} */ targetElHeight = targetEl.offsetHeight;
        var /** @type {?} */ shiftWidth = {
            center: function () {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function () {
                return hostElPos.left;
            },
            right: function () {
                return hostElPos.left + hostElPos.width;
            }
        };
        var /** @type {?} */ shiftHeight = {
            center: function () {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function () {
                return hostElPos.top;
            },
            bottom: function () {
                return hostElPos.top + hostElPos.height;
            }
        };
        var /** @type {?} */ targetElPos;
        switch (pos0) {
            case 'right':
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0]()
                };
                break;
            case 'left':
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth
                };
                break;
            case 'bottom':
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1]()
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]()
                };
                break;
        }
        return targetElPos;
    };
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    TooltipContentComponent.prototype.position = function (nativeEl) {
        var /** @type {?} */ offsetParentBCR = { top: 0, left: 0 };
        var /** @type {?} */ elBCR = this.offset(nativeEl);
        var /** @type {?} */ offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        var /** @type {?} */ boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    };
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    TooltipContentComponent.prototype.offset = function (nativeEl) {
        var /** @type {?} */ boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    };
    /**
     * @param {?} nativeEl
     * @param {?} cssProp
     * @return {?}
     */
    TooltipContentComponent.prototype.getStyle = function (nativeEl, cssProp) {
        if (((nativeEl)).currentStyle) {
            return ((nativeEl)).currentStyle[cssProp];
        }
        if (window.getComputedStyle) {
            return ((window.getComputedStyle(nativeEl)))[cssProp];
        }
        // finally try and get inline style
        return ((nativeEl.style))[cssProp];
    };
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    TooltipContentComponent.prototype.isStaticPositioned = function (nativeEl) {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    };
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    TooltipContentComponent.prototype.parentOffsetEl = function (nativeEl) {
        var /** @type {?} */ offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    };
    return TooltipContentComponent;
}());
TooltipContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'tooltip-content',
                template: "\n      <div class=\"tooltip {{ placement }}\"\n          [style.top]=\"top + 'px'\"\n          [style.left]=\"left + 'px'\"\n          [class.in]=\"isIn\"\n          [class.fade]=\"isFade\"\n          role=\"tooltip\">\n          <div class=\"tooltip-arrow\"></div>\n          <div class=\"tooltip-inner\">\n              <ng-content></ng-content>\n              {{ content }}\n          </div>\n      </div>\n"
            },] },
];
/**
 * @nocollapse
 */
TooltipContentComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
]; };
TooltipContentComponent.propDecorators = {
    'hostElement': [{ type: Input },],
    'content': [{ type: Input },],
    'placement': [{ type: Input },],
    'animation': [{ type: Input },],
};
var TooltipDirective = /** @class */ (function () {
    /**
     * @param {?} viewContainerRef
     * @param {?} resolver
     */
    function TooltipDirective(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.tooltipAnimation = true;
        this.tooltipPlacement = 'bottom';
    }
    /**
     * @return {?}
     */
    TooltipDirective.prototype.show = function () {
        if (this.tooltipDisabled || this.visible) {
            return;
        }
        this.visible = true;
        if (typeof this.content === 'string') {
            var /** @type {?} */ factory = this.resolver.resolveComponentFactory(TooltipContentComponent);
            if (!this.visible) {
                return;
            }
            this.tooltip = this.viewContainerRef.createComponent(factory);
            this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.tooltip.instance.content = /** @type {?} */ (this.content);
            this.tooltip.instance.placement = this.tooltipPlacement;
            this.tooltip.instance.animation = this.tooltipAnimation;
        }
        else {
            var /** @type {?} */ tooltip = (this.content);
            tooltip.hostElement = this.viewContainerRef.element.nativeElement;
            tooltip.placement = this.tooltipPlacement;
            tooltip.animation = this.tooltipAnimation;
            tooltip.show();
        }
    };
    /**
     * @return {?}
     */
    TooltipDirective.prototype.hide = function () {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this.tooltip) {
            this.tooltip.destroy();
        }
        if (this.content instanceof TooltipContentComponent) {
            ((this.content)).hide();
        }
    };
    return TooltipDirective;
}());
TooltipDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tooltip]'
            },] },
];
/**
 * @nocollapse
 */
TooltipDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
]; };
TooltipDirective.propDecorators = {
    'content': [{ type: Input },],
    'tooltipDisabled': [{ type: Input },],
    'tooltipAnimation': [{ type: Input },],
    'tooltipPlacement': [{ type: Input },],
    'show': [{ type: HostListener, args: ['focusin',] }, { type: HostListener, args: ['mouseenter',] },],
    'hide': [{ type: HostListener, args: ['focusout',] }, { type: HostListener, args: ['mouseleave',] },],
};
var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    return TooltipModule;
}());
TooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    TooltipDirective,
                    TooltipContentComponent,
                ],
                exports: [
                    TooltipDirective,
                    TooltipContentComponent,
                ],
                entryComponents: [
                    TooltipContentComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
TooltipModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { TooltipModule, TooltipDirective, TooltipContentComponent };
//# sourceMappingURL=ngx-tooltip-server.es5.js.map
