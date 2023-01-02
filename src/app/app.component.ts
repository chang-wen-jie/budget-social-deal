import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products = [];
  filteredProducts = [];
  productTabs = [
    {
      label: 'All',
      icon: 'star',
    },
  ];
  filterText = '';

  checkoutForm = this.formBuilder.group({
    name: '',
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  async getProducts() {
    let url = 'https://dummyjson.com/products';
    let obj = await (await fetch(url)).json();
    this.products = obj['products'];

    Object.keys(obj['products']).forEach((k) => {
      let category = obj['products'][k]['category'];
      let icon = '';

      switch (category) {
        case 'smartphones':
          icon = 'phone_iphone';
          break;
        case 'laptops':
          icon = 'laptop_mac';
          break;
        case 'fragrances':
          icon = 'air_freshener';
          break;
        case 'skincare':
          icon = 'sanitizer';
          break;
        case 'groceries':
          icon = 'shopping_cart';
          break;
        case 'home-decoration':
          icon = 'chair';
          break;
      }

      this.productTabs.push({
        label: category.charAt(0).toUpperCase() + category.slice(1),
        icon: icon,
      });
    });

    this.productTabs = this.productTabs.filter(
      (obj, index) =>
        this.productTabs.findIndex((o) => o.label === obj.label) === index
    );

    this.filteredProducts = this.products;
    console.log(this.filteredProducts);
  }

  selectTab(selectedTab: any) {
    let tab = selectedTab['tab']['textLabel'].toLowerCase();

    if (selectedTab['index'] === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (product: { ['category']: string }) => product['category'] === tab
      );
    }
  }

  onSubmit(): void {
    console.log('Your order has been submitted', this.checkoutForm.value);

    let taart: unknown = this.checkoutForm.value.name;
    let test;
    test = this.filteredProducts.filter(
      (product: { ['title']: string }) => product['title'].includes(taart as string)
    );
    console.log(test);
  }

  public ngOnInit(): void {
    this.getProducts();
  }
}
