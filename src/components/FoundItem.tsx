import { MenuItem } from "../App";
interface FoundItemProps {
  item: MenuItem;
  onDelete: () => void;
}

const FoundItem = ({ item, onDelete }: FoundItemProps) => {
  const handleDeleteButton = () => {
    onDelete();
  };

  return (
    <>
      <div className="diva">
        <section>
          <div className="neh">
            <img className="n" src={item.image.thumbnail} alt="" />
            <p>{item.name}</p>
          </div>
          <p className="spanBoys">
            <span>{item.count}x</span>
            <i>@{item.price}</i>
            <i>{item.price * (item.count ?? 0)}</i>
          </p>
          {/* ... other item details */}
        </section>
        <button onClick={handleDeleteButton} className="x-men">
          X
        </button>
      </div>
    </>
  );
};

export default FoundItem;
