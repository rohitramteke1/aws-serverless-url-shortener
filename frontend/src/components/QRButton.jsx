import { HiOutlineQrCode } from "react-icons/hi2";


const QRButton = ({ showQR, setShowQR }) => {
  return (
    <button
      onClick={() => setShowQR(prev => !prev)}
      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      title={showQR ? "Hide QR Code" : "Show QR Code"}
    >
      <HiOutlineQrCode className="w-5 h-5" />
    </button>
  );
};

export default QRButton;
