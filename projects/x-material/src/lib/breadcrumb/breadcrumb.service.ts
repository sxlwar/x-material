import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, Event, NavigationEnd, Route, Router, UrlSegment
} from '@angular/router';

export interface Breadcrumb {
  displayName: string;
  terminal: boolean;
  url: string;
  route: Route | null;
}

@Injectable()
export class BreadcrumbService {
  breadcrumbChanged: BehaviorSubject<Breadcrumb[] | null> = new BehaviorSubject<Breadcrumb[]>(null);

  private breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((routeEvent) => {
      this.onRouteEvent(routeEvent);
    });
  }

  changeBreadcrumb(route: ActivatedRouteSnapshot, name: string) {
    const rootUrl = this.createRootUrl(route);
    const breadcrumb = this.breadcrumbs.find(function (bc) {
      return bc.url === rootUrl;
    });

    if (!breadcrumb) {
      return;
    }

    breadcrumb.displayName = name;

    this.breadcrumbChanged.next(this.breadcrumbs);
  }

  private onRouteEvent(routeEvent: Event): void {
    if (!(routeEvent instanceof NavigationEnd)) {
      return;
    }

    let route = this.router.routerState.root.snapshot;
    let url = '';
    let breadCrumbIndex = 0;
    let newCrumbs = [];

    while (route.firstChild != null) {
      // except null and undefined;
      route = route.firstChild;

      if (route.routeConfig === null) {
        continue;
      }

      if (!route.routeConfig.path) {
        continue;
      }

      url += `/${this.createUrl(route)}`;

      if (!route.data['breadcrumb']) {
        continue;
      }

      let newCrumb = this.createBreadcrumb(route, url);

      if (breadCrumbIndex < this.breadcrumbs.length) {
        let existing = this.breadcrumbs[breadCrumbIndex++];

        if (existing && existing.route === route.routeConfig) {
          newCrumb.displayName = existing.displayName;
        }
      }

      newCrumbs.push(newCrumb);
    }

    this.breadcrumbs = newCrumbs;
    this.breadcrumbChanged.next(this.breadcrumbs);
  }

  private createBreadcrumb(route: ActivatedRouteSnapshot, url: string): Breadcrumb {
    return {
      displayName: route.data['breadcrumb'],
      terminal: this.isTerminal(route),
      url: url,
      route: route.routeConfig,
    };
  }

  private isTerminal(route: ActivatedRouteSnapshot) {
    return route.firstChild === null || route.firstChild.routeConfig === null || !route.firstChild.routeConfig.path;
  }

  private createUrl(route: ActivatedRouteSnapshot): string {
    return route.url.map((segment: UrlSegment) => segment.toString()).join('/');
  }

  private createRootUrl(route: ActivatedRouteSnapshot) {
    let url = '';
    let next = route.root;

    while (next.firstChild !== null) {
      next = next.firstChild;

      if (next.routeConfig === null) {
        continue;
      }
      if (!next.routeConfig.path) {
        continue;
      }

      url += `/${this.createUrl(next)}`;

      if (next === route) {
        break;
      }
    }

    return url;
  }
}
