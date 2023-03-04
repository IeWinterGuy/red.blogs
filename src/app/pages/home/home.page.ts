import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IsActiveMatchOptions, NavigationStart, Router, RouterModule } from '@angular/router';
import { AppTheme, ThemeService } from '@lib/services/theme';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit, OnDestroy {
  currentTheme!: AppTheme | null;
  matchOptions!: IsActiveMatchOptions;

  private _destroy$ = new Subject();
  routeSubscription: any;

  constructor(private _themeService: ThemeService, public router: Router) {}

  ngOnInit(): void {
    this._themeService.currentTheme$
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme) => (this.currentTheme = theme));
      this.handleThemeChange('light')

    if(this.router.url == ('/archives')) {
      this.router.navigate(['/archives/home'])
    }

    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isItPublishPage;
      }
  });

  }

  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  handleThemeChange(theme: AppTheme): void {
    this._themeService.setTheme(theme);
  }

  get isItPublishPage() {
    this.matchOptions = {
      paths: 'exact',
      matrixParams: 'exact',
      queryParams: 'subset',
      fragment: 'ignored'
  };
    const isRouteActive = this.router.isActive("/archives/stories/publish", this.matchOptions)
    return !(isRouteActive);
  }
}
