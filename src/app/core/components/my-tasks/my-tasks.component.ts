import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DestroyService} from "../../../shared/services/destroy/destroy.service";
import {HttpTaskService} from "../../http/task/http-task.service";
import {AsyncPipe} from "@angular/common";
import {share, takeUntil} from "rxjs";

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class MyTasksComponent implements OnInit {
  getMyTask$= this.httpTaskService.getMyTask$().pipe(
    takeUntil(this.destroy$),
    share());

  constructor(private destroy$: DestroyService,
              private httpTaskService: HttpTaskService,) {
  }

  ngOnInit() {
  }
}
