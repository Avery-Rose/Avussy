// Create class that initializes the response
class ApiResponse {
  #res;
  constructor(res) {
    this.#res = res;
  }

  error(message, key, error) {
    this.#res.status(400).json({
      success: false,
      errorKey: key,
      message: message || "An unknown error occurred",
      error,
    });
  }

  success(data) {
    this.#res.status(200).json({
      success: true,
      data,
    });
  }
}

module.exports = ApiResponse;
