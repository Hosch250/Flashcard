import { Component } from '@angular/core';
import { LoginService } from './shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fcd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flashcard-ng';

  constructor(private readonly loginService: LoginService,
    private readonly router: Router) { }

  public cookieExists(name) {
    return this.getCookie(name);
  }

  public username() {
    return this.getCookie("username");
  }

  private getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }

  public logout() {
    this.loginService.logout().subscribe(a => {
      this.router.navigate(['login']);
    }, a => {
      this.router.navigate(['/']);
    })
  }
}
