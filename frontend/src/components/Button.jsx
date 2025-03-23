const Button = ({ onClick }) => (
    <button
      onClick={onClick}
      className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
    >
      Shorten URL
    </button>
  );
  
  export default Button;
  