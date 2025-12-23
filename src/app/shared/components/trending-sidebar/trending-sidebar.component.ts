import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WpPost } from '../../../core/models/wordpress.models';

@Component({
  selector: 'app-trending-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trending-sidebar.component.html',
  styleUrls: ['./trending-sidebar.component.scss']
})
export class TrendingSidebarComponent {
  @Input() posts: WpPost[] = [];

  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
