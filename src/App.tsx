import { useEffect, useState } from "react";

import FoundItem from "./components/FoundItem";
import Modal from "./components/Modal";
import "./components/Modal.css";
import axios from "axios";

export interface MenuItem {
  image: {
    desktop: string;
    mobile: string;
    thumbnail: string;
    tablet: string;
  };
  name: string;
  category: string;
  price: number;
  count?: number;
}
function App() {
  const [menuItem, setMenuItem] = useState<MenuItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<MenuItem[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseBtn = () => {
    setIsModalOpen(false);
    setCart([]);
  };
  const handleAddToCart = (item: MenuItem): void => {
    const existingItem = cart?.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCart(
        (prevCart) =>
          prevCart?.map((cartItem) =>
            cartItem.name === item.name
              ? { ...cartItem, count: cartItem.count ? +1 : 0 }
              : cartItem
          ) ?? []
      );
    } else {
      setCart((prevCart) => [...(prevCart ?? []), { ...item, count: 1 }]);
    }
  };
  const handleDeleteButton = (item: MenuItem): void => {
    setCart((prevCart) => {
      // Ensure type safety and handle potential null cart
      if (!prevCart) {
        return null; // Or an empty array if a default cart is needed
      }

      // Filter out the item to be deleted
      return prevCart.filter((cartItem) => cartItem.name !== item.name);
    });
  };

  const handleIncrementCount = (item: MenuItem): void => {
    setCart((prevCart) => {
      if (!prevCart) {
        return null; // Or an empty array if a default cart is needed
      }

      return prevCart.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, count: cartItem.count ? cartItem.count + 1 : 1 }
          : cartItem
      );
    });
  };

  const handleDecrementCount = (item: MenuItem): void => {
    setCart((prevCart) => {
      if (!prevCart) {
        return null; // Or an empty array if a default cart is needed
      }

      return prevCart.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, count: cartItem.count ? cartItem.count - 1 : 1 }
          : cartItem
      );
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/items"); // Replace with your JSON server endpoint
        setMenuItem(response.data);
        console.log(response.data);
      } catch (error) {
        setError;
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  //   echo "# typescript-app" >> README.md
  // git init
  // git add README.md
  // git commit -m "first commit"
  // git branch -M main
  // git remote add origin https://github.com/Pogbayo/typescript-app.git
  // git push -u origin main
  return (
    <>
      <main>
        <div className="boxNav">
          <nav>
            <b>Desserts</b>
          </nav>
          <div className="itemBox">
            {error ? (
              <p>Error:{error}</p>
            ) : menuItem ? (
              menuItem.map((item, index) => (
                <div key={index} className="grid-item">
                  <img
                    src={item.image.desktop}
                    alt={item.name}
                    className="img"
                  />
                  <section className="details">
                    <i>{item.category}</i>
                  </section>
                  <p className="menuPrice">$ {item.price}</p>
                  {cart?.find((cartItem) => cartItem.name === item.name) ? (
                    <div className="cart-controls">
                      <button
                        className="minus"
                        onClick={() => handleDecrementCount(item)}
                      >
                        -
                      </button>
                      <span className="count">
                        {cart?.find((cartItem) => cartItem.name === item.name)
                          ?.count || 0}
                      </span>
                      <button
                        className="plus"
                        onClick={() => handleIncrementCount(item)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        {/* <CartPage menuItem={menuItem}  /> */}
        <div className="cartPage">
          <h2 className="cartHeader">Your Cart</h2>
          {cart ? (
            <section className="cartItem">
              <div>
                {cart?.map((item) => {
                  const foundItem = cart.find(
                    (cartItem) => cartItem.name === item.name
                  );
                  return foundItem ? (
                    <FoundItem
                      item={item}
                      onDelete={() => handleDeleteButton(item)}
                    />
                  ) : (
                    <div>Cart is empty</div>
                  );
                })}
              </div>
            </section>
          ) : (
            <p>Your cart items will appear here</p>
          )}

          <div className="lower">
            <div className="orderBoys">
              <p>Order Total</p>
              <p className="dollarSign">
                {" "}
                ${cart?.reduce((acc, cur) => acc + cur.price, 0)}
              </p>
            </div>
            <button
              className="placeOrderBtn"
              onClick={() => {
                if (cart?.length) {
                  // Check if cart has items (length > 0)
                  handleOpenModal();
                } else {
                  alert("Your cart is empty");
                }
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </main>
      <Modal cart={cart || []} isOpen={isModalOpen} onClose={handleCloseBtn} />
    </>
  );
}

export default App;
