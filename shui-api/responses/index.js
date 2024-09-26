export function sendResponse( status, data ) {
    
    return {
        statusCode: status,
        headers : { 
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': '*',  // Tillåter CORS från alla domäner
          'Access-Control-Allow-Headers': 'Content-Type', 
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // Tillåter specifika metoder
        },
        body: JSON.stringify({ data }),
    };
}

export function sendError( status, data ) {
    return {
      statusCode: status,
      headers : { 
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',  // Tillåter CORS från alla domäner
        'Access-Control-Allow-Headers': 'Content-Type', 
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // Tillåter specifika metoder
      },
      body: JSON.stringify({ data }),
  };
}

// exports.sendResponse = sendResponse;