<form onSubmit={handleSubmit} className="p-4 flex flex-col h-full">
  <div className="flex flex-col md:flex-row gap-4 flex-grow">
    <div className="w-full md:w-1/3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Rate Here
      </label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className="cursor-pointer text-yellow-500 text-xl"
            onClick={() => handleRatingClick(value)}
          >
            {value <= formData.rating ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>
    </div>

    <div className="w-full md:w-2/3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Comment Here
      </label>
      <textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        required
        className="w-full h-28 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10C8B8]"
      />
    </div>
  </div>

  <div className="flex justify-end space-x-3 pt-4 mt-auto">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 bg-[#10C8B8] text-white rounded-md hover:bg-[#0eb2a6]"
    >
      Submit
    </button>
  </div>
</form>
