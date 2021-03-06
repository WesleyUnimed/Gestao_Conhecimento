import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

const noop = () => { };
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Input2Component),
  multi: true,
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})

export class Input2Component implements ControlValueAccessor {

  @Input() minLength: number = 0;
  @Input() maxLength: number = 255;
  @Input() type: String = "text";
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() placeholder: String = "";
  @Input() label: string;
  @Output() onblur = new EventEmitter();
  showDrop = false;
  modelChanged: Subject<string> = new Subject<string>();
  formSelect = new FormControl();
  formCtrlSub: Subscription;
  subject: Subject<any> = new Subject();

  private innerValue: String = " ";
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  blur() {
    this.onblur.emit(null);
  }
  clear() {
    this.innerValue = " ";
    this.onChangeCallback(this.innerValue);
  }

  async evento(e) {
    
    if (e == "blur") {
    } else if (e == "focus") {
      this.showDrop = true;
    } else if (e == "keyup") {
     
      this.modelChanged.next(this.value);
    } else if (e == "keydown") {
    }
  }

  //get accessor
  get value(): any {
    return this.innerValue;
  }
  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
