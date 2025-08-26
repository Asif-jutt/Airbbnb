let upresponse = `
<html>
    <head>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: #f9f9f9;
          font-family: Arial, sans-serif;
        }
        .card {
          background: #fff;
          padding: 20px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          text-align: center;
          position: relative;
          width: 350px;
        }
        .card h2 {
          color: #2ecc71;
          margin: 0;
          font-size: 20px;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 18px;
          cursor: pointer;
          color: #888;
        }
        .close-btn:hover {
          color: #000;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="close-btn" onclick="redirectNow()">❌</span>
        <h2>✅ Product Updated Successfully!</h2>
        <p>You will be redirected shortly...</p>
      </div>

      <script>
        function redirectNow(){
          window.location='/listing';
        }
        setTimeout(redirectNow, 5000);
      </script>
    </body>
  </html>`;
const insertresponse = `<html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: #f8f8f8;
        }
        .notification-card {
          background: #fff;
          padding: 20px 30px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
          text-align: center;
          position: relative;
          width: 320px;
          animation: fadeIn 0.4s ease-in-out;
        }
        .notification-card h2 {
          color: #2ecc71;
          margin: 0 0 10px;
        }
        .notification-card p {
          color: #555;
          font-size: 14px;
          margin: 0;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #888;
        }
        .close-btn:hover {
          color: #e74c3c;
        }
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(-10px);}
          to {opacity: 1; transform: translateY(0);}
        }
      </style>
    </head>
    <body>
      <div class="notification-card">
        <button class="close-btn" onclick="redirectNow()">✖</button>
        <h2>✅ Success!</h2>
        <p>New product added successfully.</p>
      </div>

      <script>
        function redirectNow() {
          window.location.href = '/listing';
        }
        // Auto redirect after 2.5 seconds
        setTimeout(redirectNow, 50000);
      </script>
    </body>
  </html>
`;
const defaultresponse = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Under Maintenance</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1d3557, #457b9d);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #f1faee;
      text-align: center;
    }
    .container {
      background: rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      max-width: 500px;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 25px;
    }
    .emoji {
      font-size: 3rem;
      margin-bottom: 10px;
    }
    .btn {
      padding: 12px 24px;
      border: none;
      background: #e63946;
      color: white;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.3s ease;
      text-decoration: none;
    }
    .btn:hover {
      background: #d62828;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="emoji">🚧</div>
    <h1>Site Under Maintenance</h1>
    <p>Sorry 😔 This site is currently under maintenance.<br>Please check back later.</p>
    <a href="/listing" class="btn">Go Home</a>
  </div>
</body>
</html>
`;
module.exports = { upresponse, insertresponse, defaultresponse };
