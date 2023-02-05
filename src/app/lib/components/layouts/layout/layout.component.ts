import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent, NavbarComponent } from '@lib/components';

@Component({
  selector: 'app-layout-horizontal',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHorizontalComponent {}
