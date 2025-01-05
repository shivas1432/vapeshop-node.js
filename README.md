
**VapeShop Node Application**
## Description

The **VapeShop Web Application** is a modern e-commerce platform for purchasing vape products online. Built with **Node.js** as the backend, **EJS** as the templating engine, and **Laravel Mix** for asset management, the platform provides a seamless shopping experience. 

### Key Features:
- **Add Items to Cart**: Users can browse through various vape products and add them to their shopping cart.
- **Checkout and Purchase**: Once the user is ready to purchase, they can proceed to checkout, fill in their shipping details, and complete the payment.
- **Order Confirmation**: After completing the purchase, the user receives an order confirmation page with details of their transaction.
- **Responsive UI**: The application is designed to be mobile-friendly and provides a smooth user experience across all devices.
- **User-Friendly Interface**: Easy-to-navigate design for users to search and filter through different products.


## Installation

### Prerequisites
- **Node.js** (>= 12.x)
- **npm** (Node Package Manager)

### Steps to Install

1. **Clone the repository** to your local machine:

    git clone https://github.com/shivas1432/vapeshop-node.js.git
2. **Install npm Dependencies**:

    In the root directory of your project, run:
    npm install
    

3. **Set Up Environment Variables**:
     DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=************
DB_DATABASE=social
DB_PORT=3306
SECRET_KEY=a3f17c987ab235c4de06e7d0af30e42a0b9f3e28783f9e3f7d396383b*******8
DB_URL=mysql://root:*********@localhost:3306/social
[use correct deatails for successful functionality]

4. **Run the Development Server**:

    To start the development server and automatically compile assets with hot-reloading:


    npm run dev
   

    This will:
    - Compile and bundle your assets (CSS, JS).
    - Watch for changes in your files and rebuild the assets when you make changes.
    - Start the server locally (usually accessible at `http://localhost:3000`).

### Running in Production

For production, you should build and optimize your assets:

npm run production
This command will:

Minify and version the assets (JavaScript and CSS).
Place optimized files in the /public directory.
Enhance performance by reducing load times.
Project Structure
Here’s an overview of the important directories and files:

/resources/views      - EJS view templates
/public               - Public files (images, fonts, compiled assets like CSS/JS)
/resources            - can make changes in server
/src                  - routes file
/package.json         - Node.js project dependencies
/webpack.mix.js       - Laravel Mix configuration for compiling assets

Asset Management with Laravel Mix
Laravel Mix is used to compile and bundle your assets. You can modify or add new assets by editing the relevant resources files.

JavaScript Files: /resources/js/app.js, /resources/js/cart.js, /resources/js/product.js, etc.
CSS Files: /resources/css/products.css, /resources/css/payment.css, /resources/css/header.css, etc.
The webpack.mix.js file contains the configuration for compiling and bundling assets.

Example of Usage in EJS Views

<head>
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
</head>

<body>
    <script src="{{ mix('/js/app.js') }}"></script>
</body>
This ensures that the latest version of the compiled assets is included in the view.

Useful Commands
Start Development Server:

npm run dev
Compile Assets for Production:

npm run production
Start the Application:

The application can be started on a specific port (by default, at http://localhost:3000):

npm start

