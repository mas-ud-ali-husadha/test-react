const MenuCard = ({ img, name, price, disabled, onAddCart }) => {
  return (
    <div className="bg-white flex flex-col p-3 gap-3 rounded-md shadow">
      <img src={img} className="h-40 object-contain p-2 border rounded" />

      <p className="font-medium text-base text-primary">{name}</p>
      <p className="font-bold text-sm text-cyan-500">Rp. {price}</p>
      <button
        className={`bg-cyan-500 py-2 px-4 rounded-md text-xs text-white ${disabled() ? 'bg-slate-500' : ''}`}
        onClick={onAddCart}
      >
        {!disabled() ? "Tambahkan ke Keranjang" : "Batalkan"}
      </button>
    </div>
  );
};

export default MenuCard;
