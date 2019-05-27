import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private router: Router,
              private loader: LoaderService,
              private auth: AuthService) { }

  get loading() {
    return this.loader.loading;
  }

  onLinkClick(link) {
    this.router.navigate([link]);
  }

  showHeader() {
    if (!this.auth.getCurrentUser()) {
      return false;
    } else if (this.router.url === '/login' ||
        this.router.url === '/register-user') {
      return false;
    } else {
      return true;
    }
  }
}
