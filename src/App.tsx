
import { useEffect, useState } from "react";
import "./App.css";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

function App() {
  // State hooks grouped together at the top
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop", price: 75000, category: "Electronics" },
    { id: 2, name: "Mouse", price: 1500, category: "Accessories" },
    { id: 3, name: "Keyboard", price: 3500, category: "Accessories" },
    { id: 4, name: "Monitor", price: 15000, category: "Electronics" }
  ]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);

  // Effects after state hooks
  useEffect(() => {
    document.title = `VibeStore (${products.length} products)`;
  }, [products.length]);

  // Helper and handler functions
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericPrice = Number(price);

    if (
      !name.trim() ||
      price.trim() === "" ||
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      alert("Enter a valid product name and price.");
      return;
    }

    setProducts((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: name.trim(),
        price: numericPrice,
        category: "Electronics"
      }
    ]);

    setName("");
    setPrice("");
  }

  function deleteProduct(id: number) {
    setProducts((previous) =>
      previous.filter((product) => product.id !== id)
    );
  }

  // Derived values
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // JSX
  return (
    <div className="store">
      <header className="navbar">
        <h2>🛍️ VibeStore</h2>
        <span>🛒 Cart: {cartCount}</span>
      </header>

      <main className="container">
        {/* Example of Tailwind CSS-styled component */}
        <div className="mb-6 rounded-xl border border-purple-500/40 bg-purple-950 p-6 shadow-lg">
          <h2 className="mb-2 text-2xl font-bold text-white">
            Welcome to Tailwind CSS!
          </h2>
          <p className="text-sm text-purple-200">
            I styled this component without writing a new CSS class.
          </p>
        </div>

        {/* Hero section */}
        <section className="hero">
          <p className="eyebrow">YOUR PERSONAL PRODUCT STORE</p>
          <h1>Discover Your Next Favorite Product</h1>
          <p>
            Add products, manage prices, and explore
            your growing collection.
          </p>
          <a href="#products" className="hero-link">
            Explore Products
          </a>
        </section>

        {/* Add Product Form */}
        <section className="form-section">
          <h2>Add a New Product</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <button type="submit">Add Product</button>
          </form>
        </section>

        {/* Search Field */}
        <input
          className="search-input"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {/* Category Filters */}
        <div className="category-filters">
          <button
            type="button"
            onClick={() => setCategory("All")}
          >
            All Products
          </button>
          <button
            type="button"
            onClick={() => setCategory("Electronics")}
          >
            Electronics
          </button>
          <button
            type="button"
            onClick={() => setCategory("Accessories")}
          >
            Accessories
          </button>
        </div>

        {/* Product Listing */}
        <section id="products" className="products-section">
          <div className="section-heading">
            <h2>Featured Products</h2>
            <span>{filteredProducts.length} products</span>
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">🛍️</div>
                <h3>{product.name}</h3>
                <p className="product-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <button
                  type="button"
                  onClick={() => setCartCount((count) => count + 1)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete Product
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
