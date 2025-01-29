import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = { id: 0, assignedTo: '', status: 'Not Started', dueDate: '', priority: 'Normal', comments: '' };
  isEditMode = false;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const existingTask = this.taskService.getTasks().subscribe(tasks => {
        const foundTask = tasks.find(t => t.id === +id);
        if (foundTask) {
          this.task = foundTask;
        }
      });
    }
  }

  onSave() {
    if (this.isEditMode) {
      this.taskService.updateTask(this.task);
    } else {
      this.task.id = new Date().getTime(); // Generate a simple unique ID
      this.taskService.addTask(this.task);
    }
    this.router.navigate(['/']);
  }
}
