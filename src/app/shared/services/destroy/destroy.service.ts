import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/**
 * @note:
 * Абстракция observable над ngOnDestroy для использования с takeUntil
 *
 * Почему `ReplaySubject` вместо `Subject`?
 * Для того чтобы в случае, если подписка случилась после уничтожения объекта,
 * мы смогли отправить последнее сообщение для отписки
 *
 * @link https://sofit.youtrack.cloud/articles/SPA-A-53
 */
@Injectable()
export class DestroyService extends ReplaySubject<void> implements OnDestroy {
  constructor() {
    super(1);
  }

  public ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
