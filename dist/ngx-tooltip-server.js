import { ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, NgModule, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

class TooltipContentComponent {
    /**
     * @param {?} element
     * @param {?} cdr
     */
    constructor(element, cdr) {
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
    ngAfterViewInit() {
        this.show();
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    show() {
        if (!this.hostElement) {
            return;
        }
        const /** @type {?} */ p = this.positionElements(this.hostElement, this.element.nativeElement.children[0], this.placement);
        this.top = p.top;
        this.left = p.left;
        this.isIn = true;
        if (this.animation) {
            this.isFade = true;
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this.top = -100000;
        this.left = -100000;
        this.isIn = true;
        if (this.animation) {
            this.isFade = false;
        }
    }
    /**
     * @param {?} hostEl
     * @param {?} targetEl
     * @param {?} positionStr
     * @param {?=} appendToBody
     * @return {?}
     */
    positionElements(hostEl, targetEl, positionStr, appendToBody = false) {
        const /** @type {?} */ positionStrParts = positionStr.split('-');
        const /** @type {?} */ pos0 = positionStrParts[0];
        const /** @type {?} */ pos1 = positionStrParts[1] || 'center';
        const /** @type {?} */ hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        const /** @type {?} */ targetElWidth = targetEl.offsetWidth;
        const /** @type {?} */ targetElHeight = targetEl.offsetHeight;
        const /** @type {?} */ shiftWidth = {
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
        const /** @type {?} */ shiftHeight = {
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
        let /** @type {?} */ targetElPos;
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
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    position(nativeEl) {
        let /** @type {?} */ offsetParentBCR = { top: 0, left: 0 };
        const /** @type {?} */ elBCR = this.offset(nativeEl);
        const /** @type {?} */ offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        const /** @type {?} */ boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    offset(nativeEl) {
        const /** @type {?} */ boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    }
    /**
     * @param {?} nativeEl
     * @param {?} cssProp
     * @return {?}
     */
    getStyle(nativeEl, cssProp) {
        if (((nativeEl)).currentStyle) {
            return ((nativeEl)).currentStyle[cssProp];
        }
        if (window.getComputedStyle) {
            return ((window.getComputedStyle(nativeEl)))[cssProp];
        }
        // finally try and get inline style
        return ((nativeEl.style))[cssProp];
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    isStaticPositioned(nativeEl) {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    parentOffsetEl(nativeEl) {
        let /** @type {?} */ offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }
}
TooltipContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'tooltip-content',
                template: `
      <div class="tooltip {{ placement }}"
          [style.top]="top + 'px'"
          [style.left]="left + 'px'"
          [class.in]="isIn"
          [class.fade]="isFade"
          role="tooltip">
          <div class="tooltip-arrow"></div>
          <div class="tooltip-inner">
              <ng-content></ng-content>
              {{ content }}
          </div>
      </div>
`
            },] },
];
/**
 * @nocollapse
 */
TooltipContentComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
];
TooltipContentComponent.propDecorators = {
    'hostElement': [{ type: Input },],
    'content': [{ type: Input },],
    'placement': [{ type: Input },],
    'animation': [{ type: Input },],
};

class TooltipDirective {
    /**
     * @param {?} viewContainerRef
     * @param {?} resolver
     */
    constructor(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.tooltipAnimation = true;
        this.tooltipPlacement = 'bottom';
    }
    /**
     * @return {?}
     */
    show() {
        if (this.tooltipDisabled || this.visible) {
            return;
        }
        this.visible = true;
        if (typeof this.content === 'string') {
            const /** @type {?} */ factory = this.resolver.resolveComponentFactory(TooltipContentComponent);
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
            const /** @type {?} */ tooltip = (this.content);
            tooltip.hostElement = this.viewContainerRef.element.nativeElement;
            tooltip.placement = this.tooltipPlacement;
            tooltip.animation = this.tooltipAnimation;
            tooltip.show();
        }
    }
    /**
     * @return {?}
     */
    hide() {
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
    }
}
TooltipDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tooltip]'
            },] },
];
/**
 * @nocollapse
 */
TooltipDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
];
TooltipDirective.propDecorators = {
    'content': [{ type: Input },],
    'tooltipDisabled': [{ type: Input },],
    'tooltipAnimation': [{ type: Input },],
    'tooltipPlacement': [{ type: Input },],
    'show': [{ type: HostListener, args: ['focusin',] }, { type: HostListener, args: ['mouseenter',] },],
    'hide': [{ type: HostListener, args: ['focusout',] }, { type: HostListener, args: ['mouseleave',] },],
};

class TooltipModule {
}
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
TooltipModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { TooltipModule, TooltipDirective, TooltipContentComponent };
//# sourceMappingURL=ngx-tooltip-server.js.map
