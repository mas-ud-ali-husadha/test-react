import toast from "react-hot-toast";

const Toast = (text) =>
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-5`}
    >
     <div className="font-bold text-sm">{text}</div>
    </div>
  ));

export default Toast;
