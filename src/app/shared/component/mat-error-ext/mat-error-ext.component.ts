import { AfterViewInit, ChangeDetectorRef, Component, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import {StringJoinPipe} from "../../pipes/string-join.pipe";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mat-error[mat-error-ext]',
  templateUrl: './mat-error-ext.component.html',
  styleUrls: ['./mat-error-ext.component.scss'],
  standalone: true,
  imports: [StringJoinPipe, NgIf, AsyncPipe, MatTooltip, MatIcon],
})
export class MatErrorExtComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() errors: Record<string, string> | null = null;
  errors$: BehaviorSubject<string[] | null> = new BehaviorSubject<string[] | null>(null);
  private control: AbstractControl | null = null;
  private defaultErrors: Record<string, string> = {
    required: 'Это поле обязательно.',
    min: 'Значение поля меньше допустимого.',
    max: 'Значение поля больше допустимого.',
    minlength: 'Не менее [minlength] символов.',
    maxlength: 'Не более [maxlength] символов.',
    email: 'Введите валидный email.',
    noWhiteSpace: 'Поле не может содержать пробелы.',
    nature: 'Поле не может содержать только натуральные числа.',
    equalValues: 'Поля не могут содержать одинаковые значения.',
    default: 'Введите корректное значение.',
    cyrillic: 'Только латинские буквы.',
    upperCase: 'Минимум один символ верхнего регистра.',
    letterCase: 'Минимум один символ нижнего регистра.',
    server: 'Ошибка Api',
  };
  private minMaxSet: Record<string, string> = {
    min: 'min',
    max: 'max',
    minlength: 'requiredLength',
    maxlength: 'requiredLength',
  };
  private destroy$: ReplaySubject<void> = new ReplaySubject<void>();

  private checkErrors(): string[] | null {
    const controlErrors = Object.keys(this.control?.errors ?? {});
    const errors = Object.entries(this.defaultErrors)
      .filter((item) => controlErrors.indexOf(item[0]) >= 0)
      .map((item) => this.replaceText(item[0], item[1]));
    if (errors.length) {
      return errors;
    }
    if (controlErrors.length > 0) {
      return [this.defaultErrors['default']];
    }
    return null;
  }
  private replaceText(error: string, errorText: string): string {
    if (error === 'server') {
      return this.control?.errors?.[error];
    }
    const pattern = this.minMaxSet[error] ?? null;
    if (!pattern) {
      return errorText;
    }
    const value = this.control?.errors?.[error]?.[pattern] ?? null;
    if (value !== null && errorText.includes(`[${error}]`)) {
      return errorText.replace(`[${error}]`, value);
    }
    return errorText;
  }
  private setObserver() {
    if (!this.control) {
      return;
    }
    this.control.statusChanges
      .pipe(
        filter(() => !!this.control?.errors),
        map(() => {
          this.errors$.next(this.checkErrors());
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
  constructor(
    @Host() private parent: MatFormField,
    private cd: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.defaultErrors = {
      ...this.defaultErrors,
      ...this.errors,
    };
  }
  ngAfterViewInit(): void {
    this.control = this.parent._control.ngControl?.control ?? null;
    this.errors$.next(this.checkErrors());
    this.cd.detectChanges();
    this.setObserver();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
