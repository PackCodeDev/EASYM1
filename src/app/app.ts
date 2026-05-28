import { Component, signal, HostListener, inject } from '@angular/core';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  initials: string;
  tier: string;
  tierClass: 'gold' | 'platinum';
  points: number;
  wishlistCount: number;
  cartCount: number;
}

const MOCK_PROFILES: Record<'gold' | 'platinum', UserProfile> = {
  gold: {
    name: 'สมชาย ดีใจ',
    email: 'somchai.deejai@easymart.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    initials: 'สช',
    tier: 'Gold Member',
    tierClass: 'gold',
    points: 1250,
    wishlistCount: 5,
    cartCount: 2
  },
  platinum: {
    name: 'นารี รักดี',
    email: 'naree.rakdee@easymart.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    initials: 'นร',
    tier: 'Platinum Member',
    tierClass: 'platinum',
    points: 4800,
    wishlistCount: 12,
    cartCount: 4
  }
};

import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly router = inject(Router);
  public readonly isPromotionPage = signal<boolean>(false);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isPromotionPage.set(event.urlAfterRedirects.includes('/promotion'));
      }
    });
  }

  protected readonly title = signal('EasyMART');

  // จำลองการเข้าสู่ระบบแบบเริ่มต้นอัตโนมัติ (Mock Auth State - Logged In by default)
  public readonly isLoggedIn = signal<boolean>(true);
  public readonly currentUser = signal<UserProfile | null>(MOCK_PROFILES.gold);
  
  // สถานะการเปิดปิด UI
  public readonly showLoginModal = signal<boolean>(false);
  public readonly showUserDropdown = signal<boolean>(false);
  public readonly isLoading = signal<boolean>(false);
  public readonly loginError = signal<string>('');

  // คลิกพื้นที่ภายนอกเพื่อปิด Dropdown อัตโนมัติ (Premium UX)
  @HostListener('document:click')
  public onDocumentClick(): void {
    this.closeDropdown();
  }

  // ฟังก์ชันควบคุม UI
  public toggleDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.showUserDropdown.update(val => !val);
  }


  public closeDropdown(): void {
    this.showUserDropdown.set(false);
  }

  public openLoginModal(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.showLoginModal.set(true);
    this.showUserDropdown.set(false);
  }

  public closeLoginModal(): void {
    this.showLoginModal.set(false);
    this.loginError.set('');
  }

  // เข้าสู่ระบบจำลองด้วยปุ่มโปรไฟล์ด่วน
  public loginWithProfile(type: 'gold' | 'platinum'): void {
    this.isLoading.set(true);
    this.loginError.set('');
    
    // จำลองความหน่วงเวลาเพื่อความลื่นไหลพรีเมียม
    setTimeout(() => {
      this.currentUser.set(MOCK_PROFILES[type]);
      this.isLoggedIn.set(true);
      this.isLoading.set(false);
      this.closeLoginModal();
    }, 800);
  }

  // เข้าสู่ระบบผ่านการกดปุ่ม Submit (ฟอร์มกรอกข้อมูลทั่วไป)
  public submitLogin(email: string, password: string): void {
    if (!email || !password) {
      this.loginError.set('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    
    this.isLoading.set(true);
    this.loginError.set('');
    
    setTimeout(() => {
      // ตรวจสอบว่าตรงกับเมล์ที่มีหรือไม่
      if (email.includes('naree')) {
        this.currentUser.set(MOCK_PROFILES.platinum);
      } else {
        // ค่าเริ่มต้นเป็นสมชาย
        this.currentUser.set(MOCK_PROFILES.gold);
      }
      this.isLoggedIn.set(true);
      this.isLoading.set(false);
      this.closeLoginModal();
    }, 800);
  }

  // ออกจากระบบ
  public logout(): void {
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.showUserDropdown.set(false);
  }
}
