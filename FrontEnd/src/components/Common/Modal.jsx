

const Modal = ({ isModelOpen, setIsModelOpen, children }) => {
  if (!isModelOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white w-50 rounded-lg shadow-lg h-auto">
        <button 
          className="absolute top-4 right-4 text-gray-300 text-3xl"
          onClick={() => setIsModelOpen(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
