import { Component, signal } from '@angular/core';
import { PersonInfo } from "./person-info/person-info";

@Component({
  selector: 'app-root',
  imports: [PersonInfo],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
