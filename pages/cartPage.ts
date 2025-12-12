import { Page } from "playwright-core";
import { BasePage } from "./basePage";
import { CartItemComponent } from "../utility/components/cartItemComponent";
import { ICartProduct} from "../utility/interfaces/ICartProduct";
import { Locator, expect } from "playwright/test";
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

    this.locatorYourCart = page.getByText('Your Cart');
    this.locatorQty = page.getByText("QTY");
    this.locatorDescription = page.getByText('Description');
    this.locatorContinueShoppingButton = page.getByRole('button', { name: 'Continue Shopping'});
    this.locatorCheckoutButton = page.getByRole('button', { name: 'Checkout'});
  }

  
}