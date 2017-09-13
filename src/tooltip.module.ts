import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { TooltipContentComponent } from './tooltip.component';

export * from './tooltip.directive';
export * from './tooltip.component';

@NgModule({
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
})
export class TooltipModule {

}
