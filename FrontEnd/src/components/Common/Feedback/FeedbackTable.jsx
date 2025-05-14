import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const FeedbackTable = ({ feedbacks }) => {
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