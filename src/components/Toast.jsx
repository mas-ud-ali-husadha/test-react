import toast from "react-hot-toast";

const Toast = (text, type = "success") =>
  toast?.[type]((t) => <div className="font-bold text-sm">{text}</div>);

export default Toast;
