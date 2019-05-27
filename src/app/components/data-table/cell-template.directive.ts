import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cellTemplate]'
})
export class CellTemplateDirective {

  @Input()
  cellTemplate: string;

  constructor(private templateRef: TemplateRef<any>) { }

  getTemplateRef() {
    return this.templateRef;
  }

}
