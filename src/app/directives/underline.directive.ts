import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appUnderline]',
})
export class UnderlineDirective {
  @Input() linkName!: string;
  @HostBinding('class.active') isActive = false;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.checkActiveLink();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'hovered');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'hovered');
  }

  private checkActiveLink(): void {
    if (this.router.url === this.linkName) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
  }
}
