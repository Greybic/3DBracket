# 3D Bracket Configurator

A sophisticated 3D bracket configurator built with React, Three.js, and Express.js, enabling precise product customization through an intuitive web interface with advanced rendering capabilities.

## Features

- Interactive 3D bracket visualization using Three.js/React Three Fiber
- Real-time configuration updates
- Advanced camera controls and full-bracket visibility
- Surface treatment and hardware customization options
- Price calculation based on selected options
- PostgreSQL database for configuration storage

## Tech Stack

- Frontend: React, Three.js, React Three Fiber (R3F)
- Backend: Express.js
- Database: PostgreSQL
- ORM: Drizzle
- Styling: Tailwind CSS, shadcn/ui
- Type Safety: TypeScript

## Docker Setup

### Prerequisites

- Docker installed on your system
- Node.js 20.x (for local development)

### Building the Container

```bash
# Clone the repository
git clone <your-repository-url>
cd bracket-configurator

# Build the Docker image
docker build -t bracket-configurator .
```

### Running the Container

```bash
# Run the container
docker run -p 5000:5000 bracket-configurator
```

The application will be available at `http://localhost:5000`

### Environment Variables

The following environment variables are required:

- `DATABASE_URL`: PostgreSQL database connection string
- `PORT`: Application port (default: 5000)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## License

MIT License - See LICENSE file for details
