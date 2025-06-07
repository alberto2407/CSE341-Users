const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "crud-operations-6f030",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDP1nrwLk8/WAZr\n1Zb/iBC5vCOUtcuQKUd6gyySvNyqczRMvb8o2ZlIKuKT1WSTOPxQNu5lZBfUBu3X\ngrozJPZnEnjrV/jh5RCHghcaZYlYMsvieK2e7dVhCtFikMcjh8Lu8FoFYfLX2HIL\ncheAmIgQf21jvraeMFKDEG7W4kkl4fPSRrrapho5DshQVa9kiCaw0Fz30ml+kdmr\nJtv3BW9eD9p854OayP0JuGoJRDAgd4HMK2/Ag7tEck1upUk1k5yinltUbwjbg0kF\n9gwzXgkp9IbPevgu46wzMjsNC9zEaLDbMqJFJMOykBlHqz3qVIqQANv5KDv4BQtE\nRsaRmEBvAgMBAAECggEAJRKS90irZhcjfhSpTIdOxHKkvh/3YY2bbGT9jGcXzWej\nSpUGBhlaWB8eL1R/Diu6BezmdTt3bKCXyDtPT1Qmh5gp7YDRqimb2y//QvwdlZfp\n+kmgXpr51seBNd2xR8stoEVLKW6hTJMVNKlzO8L5ckfokUQxeuIPtcU2oCnY9mKX\nImqw1CH4r00cP6MJQqxDTkYsblVL9o65de8IYFI6cpOs5DVjaGwtl2hHHgtlAM/J\n1XfLPGFewG6UoAPT/G/BTtLxzDj4uepDGcwBrbf6ZJSLRLZkQuLQSe9WW6pTfjjX\n1gzA8cCq2gJaEJVcWwwyXIWaautVVC0BzjzwXJ/nUQKBgQDyGDCjiHk7FzSYUwXE\n+6LThyDBq0zRIApCyC7A93a7NSmko2CJcAX98eOrQgKtRPso2eNW4EZKHHOrGIFN\nwxWAhsLCecNmE7/GMqBm7Ywn77BmsUJJX7PL3AF/3asWwRUwMDxssMESSHxX/or+\nYwORL77qVw8gDbay/dltyBZORQKBgQDbxpKU9bMuurZTn/NDU4hivkK1hdwL0wSA\nUO94bw3gbAoBS2VvrnjCIpu1ZgNLffWcPJJGmOxkBWilbuBm1Z0JcCnk/llcukvJ\n3WJFXGIl+nm82BB0cTdtfEupHkgiMi7Ma0QxJRtefV2kDUQ6yhippc9NuqydnLty\nQ5BfR2CpIwKBgG579a6cON9rzrf5o7drM7sffyaDm9IQsj4aB6RPC2OSdofJe+Qd\nOM7VFpbw0DHtOkZBcgwS3GE0LOGXlGM9tdFrLvT8Bt3OA4ZbUnLG1GDhdXrYSK0d\nvPs7U3/cVRlUUuwkB19/Jw3GAOFTrHE+FMGsrY9a3e898vQq/5CncO6VAoGAPzq/\nG1ohBhWztRV0oG8c8wO4H492gnRgfCZM70JMJMAQlNTDR0FT/s6EK8lAs2x2yE9o\n6iS/BfvEYqwmpY9ZkciSVQ6UWShD+7zUtA3jMvgAJEOpYEbeYoJ7JhnPOP9lFWza\n/qSlXicFVNh4Q823EL/ih4NofCQGjdZAaBkaBy8CgYBON7rz+0tqzWQldF7A13Mi\nzcHSPYlx5BysvYuF465pj7WqMgfhEoVmDZd2IAiZOdgKbyyO4wJeqpzQGb+LNies\nYk4UeU2OHw8B0glzL+71VT8Xr6oUjXY/TEFRzAzIJrwcPz7oZqxXoJ2BOIEPcgXC\nUN7DLb0hTBnxGJGS+fiA9A==\n-----END PRIVATE KEY-----\n",
    clientEmail: "firebase-adminsdk-fbsvc@crud-operations-6f030.iam.gserviceaccount.com"
  })
});

const verifyToken = async ({token}) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // Check if the decoded token is valid
    if (!decodedToken) throw new Error("Unauthorized"); 
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Unauthorized");
  }
};

module.exports = {
  verifyToken
};