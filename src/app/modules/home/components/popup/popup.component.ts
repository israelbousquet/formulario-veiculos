import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit, OnDestroy {
  @Input() msgErrorPopup: string = '';
  @Input() typePopup: string = '';

  @Output() close = new EventEmitter();
  private elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  ngOnInit(): void {
    this.addOutsideClickListener();
  }

  ngOnDestroy() {
    this.removeOutsideClickListener();
  }

  addOutsideClickListener() {
    document.addEventListener('click', this.closePopupClickOutside.bind(this));
  }

  removeOutsideClickListener() {
    document.removeEventListener(
      'click',
      this.closePopupClickOutside.bind(this)
    );
  }

  closePopupClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closePopup();
    }
  }

  closePopup() {
    this.close.emit();
  }
}
