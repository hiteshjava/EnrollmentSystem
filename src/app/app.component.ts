import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fcc';

  categories: any[] = [];
  isCollapsed = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.isCollapsed = !this.isCollapsed;
  }
  home(){
    this.router.navigate(["/"]);
  }

}
