import { Locator, Page } from "playwright-core";
import { BasePage } from "./basePage";
import { CartItemComponent } from "../utility/components/cartItemComponent";
import { ICartProduct} from "../utility/interfaces/ICartProduct";
import { expect } from "playwright/test";
import { FooterComponent } from "../utility/components/footerComponent";
import { HeaderComponent } from "../utility/components/headerComponent";

export class CartPage extends BasePage{ 
    readonly products: CartItemComponent[];  
    readonly locatorYourCart: Locator;
    readonly locatorQty: Locator;
    readonly locatorDescription: Locator;
    readonly locatorContinueShoppingButton: Locator;
    readonly locatorCheckoutButton: Locator; 
    readonly footer: FooterComponent;
    readonly header: HeaderComponent;

  constructor(page: Page, products: ICartProduct[]) {
    super(page, "/cart");    

    this.footer = new FooterComponent(page);
    this.header = new HeaderComponent(page);

    this.products = new Array<CartItemComponent>();
    for(const product of products){
      this.products.push(new CartItemComponent(this.page, product));
    }

    this.locatorYourCart = this.page.getByText('Your Cart');
    this.locatorQty = this.page.getByText('Qty');
    this.locatorDescription = this.page.getByText('Description');
    this.locatorContinueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping'});
    this.locatorCheckoutButton = this.page.getByRole('button', { name: 'Checkout'});
  }

  validateDefaultLayout = async () => {
    await expect(this.locatorYourCart).toBeVisible();
    await expect(this.locatorQty).toBeVisible();
    await expect(this.locatorDescription).toBeVisible();
    await expect(this.locatorContinueShoppingButton).toBeVisible();
    await expect(this.locatorCheckoutButton).toBeVisible();

    for(const product of this.products){
      await product.validateDefaultUX();
    }
  }

  validateEmptyLayout = async () => {
    await expect(this.locatorYourCart).toBeVisible();
    await expect(this.locatorQty).toBeVisible();
    await expect(this.locatorDescription).toBeVisible();
    await expect(this.locatorContinueShoppingButton).toBeVisible();
    await expect(this.locatorCheckoutButton).toBeVisible();
  }
}