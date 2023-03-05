import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTruncateText]'
})
export class TruncateTextDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const maxLength = 140;
    const value = this.el.nativeElement.innerText.trim();

    if (value.length > maxLength) {
      this.el.nativeElement.innerText = value.substring(0, maxLength) + '...';
    }
  }
}
