import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-popup-error-cep',
  templateUrl: './popup-error-cep.component.html',
  styleUrls: ['./popup-error-cep.component.css'],
})
export class PopupErrorCepComponent implements OnDestroy {
  @Input() msgErrorPopup: string = '';

  @Output() close = new EventEmitter();
  private elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
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

  ngOnInit(): void {}
}
