const authToken = "recieved authheader is: authtoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQxODA3MzN9.6MLKAlhBwvCYy0XnfqoDpKMRk4_w2WNF4q9VBEYCvx8";
//console.log(authToken);

const token = authToken.split("authtoken=")[1];
console.log(token || "Token not found in the string.");
