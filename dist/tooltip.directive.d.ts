import { ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { TooltipContentComponent } from './tooltip.component';
export declare class TooltipDirective {
    private viewContainerRef;
    private resolver;
    private tooltip;
    private visible;
    content: string | TooltipContentComponent;
    tooltipDisabled: boolean;
    tooltipAnimation: boolean;
    tooltipPlacement: 'top' | 'bottom' | 'left' | 'right';
    constructor(viewContainerRef: ViewContainerRef, resolver: ComponentFactoryResolver);
    show(): void;
    hide(): void;
}
