import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSeeMoreLess]'
})
export class SeeMoreLessDirective {
  @Input() maxLength: number = 100; // Default max length for truncation
  private isCollapsed: boolean = true;


  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.toggleText();
  }

  @HostListener('click') onClick() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleText();
  }

  private toggleText() {
    const text = this.el.nativeElement.textContent;
    if (this.isCollapsed && text.length > this.maxLength) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'textContent',
        text.slice(0, this.maxLength) + '...'
      );
      this.renderer.setProperty(
        this.el.nativeElement,
        'title',
        'Click to see more'
      );
    } else {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', text);
      this.renderer.setProperty(
        this.el.nativeElement,
        'title',
        'Click to see less'
      );
    }
  }
}
