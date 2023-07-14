import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import MenuCard from "./components/MenuCard";
import Drawer from "./components/Drawer";
import Button from "./components/Button";
import toast, { Toaster } from "react-hot-toast";
import Toast from "./components/Toast";
import ToastOrder from "./components/ToastOrder";

function App() {
  const [list, setList] = useState([]);
  const [cart, setCart] = useState([]);
  const [vouchers, setVouchers] = useState(null);
  const [open, setOpen] = useState(false);

  async function getMenu() {
    try {
      const response = await axios.get("https://tes-mobile.landa.id/api/menus");
      setList(response.data.datas);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getMenu();
  }, []);

  const handleAddToCart = ({ id, harga }) => {
    const copy = [...cart];
    const findIndex = copy.findIndex((i) => i.id == id);
    if (findIndex >= 0) {
      copy.splice(findIndex, 1);
    } else {
      copy.push({ id, harga, catatan: "" });
    }
    setCart(copy);
  };

  const handleChangeCatatan = (e, i) => {
    const copy = [...cart];
    copy[i].catatan = e.target.value;
    setCart(copy);
  };

  const checkData = (id) => {
    return cart.findIndex((i) => i.id == id) >= 0;
  };

  const getVoucher = async (text) => {
    try {
      const response = await axios.get(
        `https://tes-mobile.landa.id/api/vouchers?kode=${text}`
      );
      console.log(response);
      if (response.data.status_code == 200) {
        setVouchers(response.data.datas);
        Toast("Voucher digunakan");
      } else {
        Toast("Voucher tidak ditemukan", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const total = useMemo(() => {
    const totalItems = cart.reduce((a, b) => a + b.harga, 0) || 0;
    const voucher = vouchers?.nominal || 0;
    const diskon = totalItems - voucher;
    if (diskon < 0) {
      return 0;
    } else {
      return diskon;
    }
  }, [cart, vouchers]);

  const handleCancel = async (id) => {
    try {
      const response = await axios.post(
        `https://tes-mobile.landa.id/api/order/cancel/${id}`
      );
      console.log(response);
      if (response.data.status_code == 200) {
        setVouchers(response.data.datas);
        toast.dismiss();
        Toast("Berhasil Membatalkan pesanan");
      } else {
        Toast("Gagal Membatalkan pesanan", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePesan = async () => {
    const data = {
      nominal_diskon: vouchers?.nominal || 0,
      nominal_pesanan: total,
      items: cart,
    };

    try {
      const response = await axios.post(
        `https://tes-mobile.landa.id/api/order`,
        data
      );
      if (response.data.status_code == 200) {
        ToastOrder("Behasil memesan", () => handleCancel(response.data.id));
        Normalisasi(Toast);
      } else {
        Toast("Gagal memesan", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Normalisasi = () => {
    setList([]);
    setCart([]);
    setVouchers({});
    setOpen(false);
    getMenu();
  };
  return (
    <>
      <div className="container mx-auto py-5">
        <div className="flex w-full justify-between my-3">
          <h1 className="font-bold text-lg">Main Course</h1>
          <div className="relative">
            <Button onClick={() => setOpen(true)}> Lihat Keranjang</Button>
            {Boolean(cart.length) && (
              <div className="absolute cursor-pointer text-white bg-slate-500 -top-2 -right-2 p-1 h-6 w-6 rounded-full text-center text-xs">
                {cart.length}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
          {list.map((item) => (
            <MenuCard
              key={item.id}
              img={item.gambar}
              price={item.harga}
              name={item.nama}
              onAddCart={() => handleAddToCart(item)}
              disabled={() => checkData(item.id)}
            />
          ))}

          <Drawer isOpen={open} setIsOpen={setOpen}>
            {Boolean(cart.length) && (
              <div className="font-extrabold text-lg my-2">List Keranjang</div>
            )}

            {!cart.length && (
              <div className="font-bold text-lg">
                Tidak ada item di keranjang
              </div>
            )}
            {cart.map((item, i) => (
              <div
                key={item.id}
                className="flex gap-5 border rounded p-1 px-3 items-center"
              >
                <img
                  className="h-16 w-16 object-contain"
                  src={list.find((i) => i.id == item.id)?.gambar}
                  alt={item.id}
                />
                <div className="flex flex-col gap-2 my-2 w-full">
                  <p className="font-medium text-sm text-primary">
                    {list.find((i) => i.id == item.id)?.nama}
                  </p>
                  <p className="font-bold text-xs text-cyan-500">
                    Rp. {item.harga}
                  </p>
                  <textarea
                    className="border rounded text-sm font-normal p-2 outline-none  "
                    cols="20"
                    rows="2"
                    placeholder="Masukan Catatan"
                    onChange={(e) => handleChangeCatatan(e, i)}
                    defaultValue={item.catatan}
                  />
                </div>
              </div>
            ))}
            {Boolean(cart.length) && (
              <>
                <div className="flex flex-col gap-2">
                  <div className="font-semibold text-sm">Tambah Voucher</div>
                  <input
                    placeholder="Masukan voucher disini "
                    className="rounded border outline-none text-xs p-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (e.target.value.length) {
                          e.preventDefault();
                          getVoucher(e.target.value);
                        }
                      }
                    }}
                  />
                </div>

                {Boolean(vouchers) && (
                  <div className="relative flex flex-col gap-2">
                    <div className="font-medium text-sm">
                      List Voucher digunakan
                    </div>
                    <div className="flex flex-col shadow p-4 rounded relative border">
                      <div className="text-sm font-bold">{vouchers.kode}</div>
                      <div className="text-sm">Rp. {vouchers.nominal}</div>
                      <div
                        onClick={() => setVouchers(null)}
                        className="absolute cursor-pointer text-white bg-slate-500 -top-2 -right-2 p-1 h-6 w-6 rounded-full text-center text-xs"
                      >
                        X
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {Boolean(cart.length) && (
              <div className="flex h-full flex-col gap-1">
                <div className="bg-bgPrimary p-2 flex mt-auto rounded w-full justify-between">
                  <div className="text-sm font-bold">Total</div>
                  <div className="text-sm font-bold">Rp. {total}</div>
                </div>

                <Button className="h-9" onClick={handlePesan}>
                  Buat Pesanan
                </Button>
              </div>
            )}
          </Drawer>
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
      />
    </>
  );
}

export default App;
