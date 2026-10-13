
type Product = {
    name: string;
    price: number;
    discount?: number;
  };
  
  function getFinalPrice(product: Product): number {
    const discount = product.discount ?? 0;
  
    return product.price - (product.price * discount) / 100;
  }
  
  const laptop: Product = {
    name: "Laptop",
    price: 75000,
    discount: 10
  };
  
  const mouse: Product = {
    name: "Mouse",
    price: 1500
  };
  
  console.log(getFinalPrice(laptop));
  console.log(getFinalPrice(mouse));
  