import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DestroyService} from "../../../shared/services/destroy/destroy.service";
import {HttpTaskService} from "../../http/task/http-task.service";
import {MyTasksComponent} from "../../components/my-tasks/my-tasks.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MyTasksComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class DashboardComponent implements OnInit {

  get getMyTask$() {
    return this.httpTaskService.getMyTask$;
  }

  constructor(private destroy$: DestroyService,
              private httpTaskService: HttpTaskService,) {
  }

  ngOnInit() {
  }
}
