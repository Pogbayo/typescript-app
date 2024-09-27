import { FaCheckCircle } from "react-icons/fa";
import { MenuItem } from "../App";

interface ModalProps {
  cart: MenuItem[];
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ cart, isOpen, onClose }) => {
  return (
    <>
      {isOpen ? (
        <div className={`modal ${isOpen ? "open" : ""}`}>
          <div className="modal-content">
            {/* Order confirmation content */}
            <FaCheckCircle className="semiIcon" />
            <h1>
              <b>Order Confirmed</b>
            </h1>
            <p>We hope you enjoyed your meal!</p>
            <section className="confirmedOrder">
              {cart.map((cartItem) => (
                <div key={cartItem.name}>
                  {/* Display cartItem details */}
                  <img src={cartItem.image.thumbnail} alt="" />
                  <p>{cartItem.name}</p>
                  <p>{cartItem.price}</p>
                  {/* ... other item details */}
                </div>
              ))}
            </section>
            <div className="client">
              <p>Order Total</p>
              <p className="dollie">
                ${cart.reduce((acc, cur) => acc + cur.price, 0)}
              </p>
            </div>
            <button className="startNewOrder" onClick={onClose}>
              Start New Order
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Modal;
