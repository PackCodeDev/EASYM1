import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  category: string;
  rating: number;
  ratingCount: number;
  icon: string;
  iconColor?: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  // หมวดหมู่สินค้าภาษาไทย
  protected readonly categoryMap: Record<string, string> = {
    all: 'ทั้งหมด',
    electronics: 'อิเล็กทรอนิกส์',
    fashion: 'แฟชั่น',
    beauty: 'ความงาม & สกินแคร์',
    home: 'บ้าน & ไลฟ์สไตล์'
  };

  // รายการหมวดหมู่ทั้งหมด
  protected readonly categories = ['all', 'electronics', 'fashion', 'beauty', 'home'];

  // ข้อมูลสินค้าจำลองแบบพรีเมียม
  private readonly allProducts = signal<Product[]>([
    {
      id: 1,
      name: 'หูฟังไร้สาย Bluetooth Pro 2',
      price: 1590,
      oldPrice: 1990,
      discount: '-20%',
      category: 'electronics',
      rating: 5,
      ratingCount: 128,
      icon: 'fa-solid fa-headphones-simple',
      iconColor: '#5d3ebd'
    },
    {
      id: 2,
      name: 'สมาร์ทวอทช์ รุ่น X1',
      price: 2490,
      category: 'electronics',
      rating: 4,
      ratingCount: 96,
      icon: 'fa-solid fa-clock',
      iconColor: '#5d3ebd'
    },
    {
      id: 3,
      name: 'รองเท้าผ้าใบ รุ่น Classic',
      price: 990,
      category: 'fashion',
      rating: 5,
      ratingCount: 74,
      icon: 'fa-solid fa-shoe-prints',
      iconColor: '#222'
    },
    {
      id: 4,
      name: 'กระเป๋าสะพายข้าง Minimal',
      price: 1290,
      category: 'fashion',
      rating: 4.5,
      ratingCount: 53,
      icon: 'fa-solid fa-bag-shopping',
      iconColor: '#dfba9d'
    },
    {
      id: 5,
      name: 'น้ำหอม Chic Eau de Parfum',
      price: 1090,
      category: 'beauty',
      rating: 5,
      ratingCount: 88,
      icon: 'fa-solid fa-bottle-droplet',
      iconColor: '#e28da9'
    },
    {
      id: 6,
      name: 'โน้ตบุ๊ก UltraBook Pro 15',
      price: 27900,
      oldPrice: 29900,
      discount: 'ลด ฿2,000',
      category: 'electronics',
      rating: 4.8,
      ratingCount: 42,
      icon: 'fa-solid fa-laptop',
      iconColor: '#5d3ebd'
    },
    {
      id: 7,
      name: 'ลำโพงพกพา BassBoost 360',
      price: 1890,
      oldPrice: 2290,
      discount: '-17%',
      category: 'electronics',
      rating: 4.6,
      ratingCount: 65,
      icon: 'fa-solid fa-volume-high',
      iconColor: '#3bc493'
    },
    {
      id: 8,
      name: 'เสื้อเชิ้ตลายสก็อตคลาสสิก',
      price: 490,
      category: 'fashion',
      rating: 4.3,
      ratingCount: 39,
      icon: 'fa-solid fa-shirt',
      iconColor: '#e05c5c'
    },
    {
      id: 9,
      name: 'ครีมบำรุงผิวหน้า Glow Skin',
      price: 750,
      oldPrice: 890,
      discount: '-15%',
      category: 'beauty',
      rating: 4.7,
      ratingCount: 112,
      icon: 'fa-solid fa-sparkles',
      iconColor: '#e6c875'
    },
    {
      id: 10,
      name: 'โคมไฟตั้งโต๊ะ LED Minimalist',
      price: 690,
      category: 'home',
      rating: 4.5,
      ratingCount: 27,
      icon: 'fa-solid fa-lightbulb',
      iconColor: '#7b8da4'
    }
  ]);

  // สถานะการฟิลเตอร์และจัดเรียงสินค้า
  public readonly selectedCategory = signal<string>('all');
  public readonly selectedSort = signal<string>('popular');

  // รายการสินค้าที่ผ่านการฟิลเตอร์และจัดเรียงเรียบร้อยแล้ว
  public readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const sortType = this.selectedSort();
    
    // 1. กรองข้อมูลตามหมวดหมู่
    let result = [...this.allProducts()];
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    
    // 2. จัดเรียงข้อมูล
    if (sortType === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortType === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // 'popular' -> เรียงตาม ratingCount (ความนิยมการรีวิว)
      result.sort((a, b) => b.ratingCount - a.ratingCount);
    }
    
    return result;
  });

  // ฟังก์ชันสลับหมวดหมู่
  public selectCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  // ฟังก์ชันเปลี่ยนวิธีกรองจัดเรียง
  public changeSort(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedSort.set(value);
  }

  // ฟังก์ชันสร้างอาร์เรย์ดาวสำหรับเรตติ้งอย่างรวดเร็ว
  protected getRatingStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - hasHalf;
    
    // ส่งคืนจำนวนดาวประเภทต่างๆ
    // 1 = ดาวเต็ม, 0.5 = ครึ่งดวง, 0 = ดาวเปล่า
    return [
      ...Array(fullStars).fill(1),
      ...Array(hasHalf).fill(0.5),
      ...Array(emptyStars).fill(0)
    ];
  }
}
