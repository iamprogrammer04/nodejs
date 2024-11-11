/* eslint-disable @typescript-eslint/no-explicit-any */

export const HTTP_STATUS = {
  // Informational responses (100 – 199)
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  EARLY_HINTS: 103,

  // Successful responses (200 – 299)
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  ALREADY_REPORTED: 208,
  IM_USED: 226,

  // Redirection messages (300 – 399)
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  SWITCH_PROXY: 306,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,

  // Client error responses (400 – 499)
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  IM_A_TEAPOT: 418,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,

  // Client error responses (400 – 499)
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
};

const STATUS_DATA: { [key: number]: { status: boolean; info: string } } = {
  // Informational responses (100 – 199)
  100: { status: true, info: 'Continue' },
  101: { status: true, info: 'Switching Protocols' },
  102: { status: true, info: 'Processing' },
  103: { status: true, info: 'Early Hints' },

  // Successful responses (200 – 299)
  200: { status: true, info: 'OK' },
  201: { status: true, info: 'Created' },
  202: { status: true, info: 'Accepted' },
  203: { status: true, info: 'Non-Authoritative Information' },
  204: { status: true, info: 'No Content' },
  205: { status: true, info: 'Reset Content' },
  206: { status: true, info: 'Partial Content' },
  207: { status: true, info: 'Multi-Status' },
  208: { status: true, info: 'Already Reported' },
  226: { status: true, info: 'IM Used' },

  // Redirection messages (300 – 399)
  300: { status: true, info: 'Multiple Choices' },
  301: { status: true, info: 'Moved Permanently' },
  302: { status: true, info: 'Found' },
  303: { status: true, info: 'See Other' },
  304: { status: true, info: 'Not Modified' },
  305: { status: true, info: 'Use Proxy' },
  306: { status: true, info: 'Switch Proxy' },
  307: { status: true, info: 'Temporary Redirect' },
  308: { status: true, info: 'Permanent Redirect' },

  // Client error responses (400 – 499)
  400: { status: false, info: 'Bad Request' },
  401: { status: false, info: 'Unauthorized' },
  402: { status: false, info: 'Payment Required' },
  403: { status: false, info: 'Forbidden' },
  404: { status: false, info: 'Not Found' },
  405: { status: false, info: 'Method Not Allowed' },
  406: { status: false, info: 'Not Acceptable' },
  407: { status: false, info: 'Proxy Authentication Required' },
  408: { status: false, info: 'Request Timeout' },
  409: { status: false, info: 'Conflict' },
  410: { status: false, info: 'Gone' },
  411: { status: false, info: 'Length Required' },
  412: { status: false, info: 'Precondition Failed' },
  413: { status: false, info: 'Payload Too Large' },
  414: { status: false, info: 'URI Too Long' },
  415: { status: false, info: 'Unsupported Media Type' },
  416: { status: false, info: 'Range Not Satisfiable' },
  417: { status: false, info: 'Expectation Failed' },
  418: { status: false, info: "I'm a Teapot" },
  421: { status: false, info: 'Misdirected Request' },
  422: { status: false, info: 'Unprocessable Entity' },
  423: { status: false, info: 'Locked' },
  424: { status: false, info: 'Failed Dependency' },
  425: { status: false, info: 'Too Early' },
  426: { status: false, info: 'Upgrade Required' },
  428: { status: false, info: 'Precondition Required' },
  429: { status: false, info: 'Too Many Requests' },
  431: { status: false, info: 'Request Header Fields Too Large' },
  451: { status: false, info: 'Unavailable For Legal Reasons' },

  // Server error responses (500 – 599)
  500: { status: false, info: 'Internal Server Error' },
  501: { status: false, info: 'Not Implemented' },
  502: { status: false, info: 'Bad Gateway' },
  503: { status: false, info: 'Service Unavailable' },
  504: { status: false, info: 'Gateway Timeout' },
  505: { status: false, info: 'HTTP Version Not Supported' },
  506: { status: false, info: 'Variant Also Negotiates' },
  507: { status: false, info: 'Insufficient Storage' },
  508: { status: false, info: 'Loop Detected' },
  510: { status: false, info: 'Not Extended' },
  511: { status: false, info: 'Network Authentication Required' },
};

interface ApiResponse {
  message: string;
  data?: any;
  status: boolean;
  code: number;
  info: string;
  timestamp: string;
}

export const createResponse = (code: number, message: string, data?: any): ApiResponse => {
  const info = STATUS_DATA[code]?.info || 'Unknown Status';
  const status = STATUS_DATA[code]?.status ?? false;

  return {
    code,
    status,
    info,
    timestamp: new Date().toISOString(),
    message,
    ...(data && { data }),
  };
};
