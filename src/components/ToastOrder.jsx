import toast from "react-hot-toast";
import Button from "./Button";

const ToastOrder = (text, handleCancel) =>
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-sm w-full gap-2 flex-col bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-5`}
    >
      <div className="font-bold text-sm">{text}</div>
      <Button onClick={handleCancel} className="bg-red-700 w-52 ml">Cancel Order</Button>
    </div>
  ));

export default ToastOrder;
