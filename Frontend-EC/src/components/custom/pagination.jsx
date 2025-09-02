function Pagination({pagination, handlePageChange}) {

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
            Prev
      </button>

      {Array.from({ length: pagination.totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`px-3 py-1 rounded hover:shadow-md hover:shadow-gray-400 transition-all ${
            pagination.page === i + 1 ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={pagination.page === pagination.totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
            Next
      </button>
    </div>
  )
}

export default Pagination