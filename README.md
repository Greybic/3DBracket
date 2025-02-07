git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Greybic/3D.git
git push -u origin main
```

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/Greybic/3D.git
cd 3D
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following:
```env
# Required: Database Connection
DATABASE_URL=postgresql://user:password@localhost:5432/bracket_db

# Optional: Development settings
NODE_ENV=development
PORT=5000

# Optional: BigCommerce Integration (if needed)
BC_STORE_HASH=your_store_hash
BC_ACCESS_TOKEN=your_access_token
BC_CLIENT_ID=your_client_id
BC_CLIENT_SECRET=your_client_secret
```

4. Initialize the database:
```bash
npm run db:push
```

## Development

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5000`

## Deployment

### Hosting on Hostinger

1. Build the application:
```bash
npm run build
```

2. Upload the following files/directories to Hostinger:
   - `dist/` directory (contains built frontend and backend)
   - `package.json`
   - `.env` file (with production values)
   - `node_modules/` (or run npm install on the server)

3. Configure Hostinger:
   - Set up a Node.js hosting environment
   - Configure environment variables in Hostinger's dashboard
   - Set up a PostgreSQL database and update DATABASE_URL
   - Configure the domain and SSL certificate

4. Start the application:
```bash
npm start