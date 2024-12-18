import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ResponsiveService } from '../services/responsive.service';

@Directive({
  selector: '[appResponsiveClass]',
  standalone: true
})
export class ResponsiveClassDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    const className = this.getLayoutClass();
    this.renderer.addClass(this.el.nativeElement, className);
  }

  private getLayoutClass(): string {
    if (this.responsiveService.isMobile) {
      return 'mobile-layout';
    }
    if (this.responsiveService.isTablet) {
      return 'tablet-layout';
    }
    return 'desktop-layout';
  }

}
