import toast from "react-hot-toast";

const Toast = (text, type = "success") =>
  toast?.[type]((t) => <div className="font-bold text-xs">{text}</div>);

export default Toast;
