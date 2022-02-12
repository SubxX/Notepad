import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit, OnChanges {
  @Input('tooltip') tooltipTitle!: string
  tooltipElement!: HTMLSpanElement

  constructor(
    private eleRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.tooltipElement = this.document.createElement('span')
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.tooltipTitle))
    this.renderer.addClass(this.tooltipElement, 'tooltip')
    this.renderer.appendChild(this.eleRef.nativeElement, this.tooltipElement)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tooltipTitle'].previousValue !== undefined)
      this.tooltipElement.innerText = this.tooltipTitle
    console.log(this.tooltipTitle);
  }

}
