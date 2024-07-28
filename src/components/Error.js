function Error() {
  return (
    <div className="container">
      <div className="flex items-center gap-2 p-6 bg-red-200 text-red-900">
        <span className="material-symbols-outlined">warning</span>
        An error occurred while fetching the data. Please try again later.
      </div>
    </div>
  );
}

export default Error;
