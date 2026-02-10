import products from './products.json' assert { type: 'json' };

class User {
	private username!: string;
	private password!: string;

	setUsername(username: string) {
		this.username = username;
	}

	setPassword(password: string) {
		this.password = password;
	}
}

function createUser(username: string, password: string): User {
    const user = new User();
    user.setUsername(username);
    user.setPassword(password);
    if (username.length > 0) {
        return user;
    } else {
        throw new Error("Invalid username");
    }
}

const multipleProductNames: Array<Array<string>> = [
    [products.az[0].name, products.az[0].price.toString()],
    [products.az[1].name, products.az[1].price.toString()],
    [products.az[2].name, products.az[2].price.toString()],
    [products.az[3].name, products.az[3].price.toString()]
];

function printProductInfo(productInfo: Array<Array<string>>) {
    for (let i in productInfo) {
        const product = productInfo[i];
        console.log(`Product: ${product[0]}`);
    }
}

function printProductCheaperThan(productInfo: Array<Array<string>>, price: number) {
    for (let i in productInfo) {
        const product = productInfo[i];
        if (parseInt(product[1]) < price) {
            console.log(`Product: ${product[0]}`);
        }
    }
}
