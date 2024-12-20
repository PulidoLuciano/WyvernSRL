const HttpStatuses = {
    CONTINUE: { code: 100, reason: "Continue" },
    SWITCHING_PROTOCOLS: { code: 101, reason: "Switching Protocols" },
    PROCESSING: { code: 102, reason: "Processing" },
    EARLY_HINTS: { code: 103, reason: "Early Hints" },
  
    OK: { code: 200, reason: "OK" },
    CREATED: { code: 201, reason: "Created" },
    ACCEPTED: { code: 202, reason: "Accepted" },
    NON_AUTHORITATIVE_INFORMATION: { code: 203, reason: "Non-Authoritative Information" },
    NO_CONTENT: { code: 204, reason: "No Content" },
    RESET_CONTENT: { code: 205, reason: "Reset Content" },
    PARTIAL_CONTENT: { code: 206, reason: "Partial Content" },
    MULTI_STATUS: { code: 207, reason: "Multi-Status" },
    ALREADY_REPORTED: { code: 208, reason: "Already Reported" },
    IM_USED: { code: 226, reason: "IM Used" },
  
    MULTIPLE_CHOICES: { code: 300, reason: "Multiple Choices" },
    MOVED_PERMANENTLY: { code: 301, reason: "Moved Permanently" },
    FOUND: { code: 302, reason: "Found" },
    SEE_OTHER: { code: 303, reason: "See Other" },
    NOT_MODIFIED: { code: 304, reason: "Not Modified" },
    USE_PROXY: { code: 305, reason: "Use Proxy" },
    TEMPORARY_REDIRECT: { code: 307, reason: "Temporary Redirect" },
    PERMANENT_REDIRECT: { code: 308, reason: "Permanent Redirect" },
  
    BAD_REQUEST: { code: 400, reason: "Bad Request" },
    UNAUTHORIZED: { code: 401, reason: "Unauthorized" },
    PAYMENT_REQUIRED: { code: 402, reason: "Payment Required" },
    FORBIDDEN: { code: 403, reason: "Forbidden" },
    NOT_FOUND: { code: 404, reason: "Not Found" },
    METHOD_NOT_ALLOWED: { code: 405, reason: "Method Not Allowed" },
    NOT_ACCEPTABLE: { code: 406, reason: "Not Acceptable" },
    PROXY_AUTHENTICATION_REQUIRED: { code: 407, reason: "Proxy Authentication Required" },
    REQUEST_TIMEOUT: { code: 408, reason: "Request Timeout" },
    CONFLICT: { code: 409, reason: "Conflict" },
    GONE: { code: 410, reason: "Gone" },
    LENGTH_REQUIRED: { code: 411, reason: "Length Required" },
    PRECONDITION_FAILED: { code: 412, reason: "Precondition Failed" },
    PAYLOAD_TOO_LARGE: { code: 413, reason: "Payload Too Large" },
    URI_TOO_LONG: { code: 414, reason: "URI Too Long" },
    UNSUPPORTED_MEDIA_TYPE: { code: 415, reason: "Unsupported Media Type" },
    RANGE_NOT_SATISFIABLE: { code: 416, reason: "Range Not Satisfiable" },
    EXPECTATION_FAILED: { code: 417, reason: "Expectation Failed" },
    IM_A_TEAPOT: { code: 418, reason: "I'm a teapot" },
  
    UNPROCESSABLE_ENTITY: { code: 422, reason: "Unprocessable Entity" },
    LOCKED: { code: 423, reason: "Locked" },
    FAILED_DEPENDENCY: { code: 424, reason: "Failed Dependency" },
    TOO_EARLY: { code: 425, reason: "Too Early" },
    UPGRADE_REQUIRED: { code: 426, reason: "Upgrade Required" },
    PRECONDITION_REQUIRED: { code: 428, reason: "Precondition Required" },
    TOO_MANY_REQUESTS: { code: 429, reason: "Too Many Requests" },
    REQUEST_HEADER_FIELDS_TOO_LARGE: { code: 431, reason: "Request Header Fields Too Large" },
  
    INTERNAL_SERVER_ERROR: { code: 500, reason: "Internal Server Error" },
    NOT_IMPLEMENTED: { code: 501, reason: "Not Implemented" },
    BAD_GATEWAY: { code: 502, reason: "Bad Gateway" },
    SERVICE_UNAVAILABLE: { code: 503, reason: "Service Unavailable" },
    GATEWAY_TIMEOUT: { code: 504, reason: "Gateway Timeout" },
    HTTP_VERSION_NOT_SUPPORTED: { code: 505, reason: "HTTP Version Not Supported" }
  };
  
  export default HttpStatuses