import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-essay',
  standalone: true,
  imports: [],
  templateUrl: './essay.html',
  styleUrl: './essay.css',
})
export class Essay implements OnInit, OnDestroy {
  private sidebarEl: HTMLElement | null = null;
  private mainLayoutEl: HTMLElement | null = null;

  ngOnInit() {
    // Only execute on browser side to avoid server-side rendering errors
    if (typeof document !== 'undefined') {
      this.sidebarEl = document.querySelector('.sidebar');
      this.mainLayoutEl = document.querySelector('.main-layout');

      if (this.sidebarEl) {
        this.sidebarEl.style.display = 'none';
      }
      if (this.mainLayoutEl) {
        this.mainLayoutEl.style.display = 'block';
        this.mainLayoutEl.style.marginTop = '0';
      }
    }
  }

  ngOnDestroy() {
    if (typeof document !== 'undefined') {
      if (this.sidebarEl) {
        this.sidebarEl.style.display = '';
      }
      if (this.mainLayoutEl) {
        this.mainLayoutEl.style.display = '';
        this.mainLayoutEl.style.marginTop = '';
      }
    }
  }
}
