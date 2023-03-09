import { Directive, DoCheck, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[Placeholder]',
})
export class PlaceholderDirective implements DoCheck {
  @Input('Placeholder') placeholderText: string | undefined;

  constructor(private el: ElementRef) {}

  ngDoCheck(): void {
    const div = this.el.nativeElement;
    console.log(div.innerHTML);

    if (!div.innerHTML) {
      div.innerHTML = 'titel...';
    }
  }
}
