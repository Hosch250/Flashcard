import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'fcd-help-module',
  templateUrl: './help-module.component.html',
  styleUrls: ['./help-module.component.scss']
})
export class HelpModuleComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        this.sub = this.router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            map(e => {
                let url = e.url.split('/').filter(f => !!f).map(f => f.toLowerCase());
                if (url[0] === "create" || url[0] === "edit" && url[1] === "deck") {
                    return "create";
                } else if (url[0] === "deck") {
                    return "viewDeck";
                } else if (url[0] === "login") {
                    return "login";
                } else if (url[0] === "signup") {
                    return "signup";
                } else {
                    return "home";
                }
            }),
            map(e => {
                console.log(e);
                return e;
            })
        ).subscribe(s => this.key = s);
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private sub: Subscription;
    public key: string;
    constructor(private readonly router: Router) { }

    public getDocKey() {
        return this.router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            map(e => {
                let url = e.url.split('/').filter(f => !!f).map(f => f.toLowerCase());
                if (url[0] === "create" || url[0] === "edit" && url[1] === "deck") {
                    return "create";
                } else if (url[0] === "deck") {
                    return "viewDeck";
                } else if (url[0] === "login") {
                    return "login";
                } else if (url[0] === "signup") {
                    return "signup";
                } else {
                    return "home";
                }
            }),
            map(e => {
                console.log(e);
                return e;
            })
        );
    }
}
