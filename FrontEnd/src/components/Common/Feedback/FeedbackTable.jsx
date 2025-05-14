import PropTypes from 'prop-types';
import { FaStar, FaEdit, FaTrashAlt } from 'react-icons/fa';
import {useBuyerService} from '../../../services/buyer/buyerServices';

const FeedbackTable = ({ feedbacks }) => {

  const { updateFeedback, deleteFeedback } = useBuyerService();

  const handleEditClick = async (feedback) => {
  try {
    console.log("Editing feedback:", feedback);
    const updated = await updateFeedback(feedback.id, feedback.rating, feedback.comment);
    console.log("Updated:", updated);
    // optionally refetch or show success message
  } catch (error) {
    console.error("Update failed", error);
  }
};

  const handleDeleteClick = async (feedback) => {
  try {
    const deleted = await deleteFeedback(feedback._id);
    console.log("Deleted:", deleted);
    // optionally remove from UI or refetch
  } catch (error) {
    console.error("Delete failed", error);
  }
};

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      {feedbacks?.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Product Feedbacks</h3>
          <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-10 mt-8">
            <div className="md:w-full">
              <div className="flex justify-between border-b item-center mb-4 text-xs font-bold">
                <div className="max-h-80 overflow-y-auto border rounded-md w-full">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max border-collapse">
                      <thead className="bg-gray-200 sticky top-0 text-sm">
                        <tr>
                          <th className="text-left px-4 py-2">Rating</th>
                          <th className="text-left px-4 py-2">Comment</th>
                          <th className="text-left px-4 py-2">Date</th>
                          <th className="text-left px-4 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm md:text-base">
                        {feedbacks?.map((feedback) => (
                          <tr key={feedback._id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                  <FaStar
                                    key={index}
                                    className={`w-4 h-4 ${
                                      index < feedback.rating
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-2">{feedback.comment}</td>
                            <td className="px-4 py-2">
                              {new Date(feedback.createdAt).toLocaleDateString()}
                            </td>
                            
                            <td className="px-4 py-2">
                                <button
                                  className="w-4 h-5 mr-2 text-green-6"
                                  onClick={() => handleEditClick(feedback)}
                                >
                                  <FaEdit />
                                </button>

                                <button
                                   className="w-4 h-5 text-red-500"
                                   onClick={() => handleDeleteClick(feedback)}
                                >
                                   <FaTrashAlt />
                                </button>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-gray-500 text-lg">No feedbacks available yet.</p>
        </div>
      )}
    </div>
  );
};

FeedbackTable.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  )
};

export default FeedbackTable;
