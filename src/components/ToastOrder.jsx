import toast from "react-hot-toast";
import Button from "./Button";

const ToastOrder = (text, handleCancel) =>
  toast.success((t) => (
    <div className={`gap-2 flex-col flex `}>
      <div className="font-bold text-sm">{text}</div>
      <Button
        onClick={() => {
          toast.dismiss(t.id);
          handleCancel();
        }}
        className="bg-red-700 p-2 ml"
      >
        Cancel Order
      </Button>
    </div>
  ));

export default ToastOrder;
