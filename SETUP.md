## Getting Started

- Install Requirements
- Run developmenent server

## Requirements

- Bun [Install](https://bun.sh/)
- Docker [Install](https://www.docker.com/products/docker-desktop/)
- Node.js [Install](https://nodejs.org/en)
- Git [Install](https://git-scm.com/)
- NO STROKES

```bash
git clone https://github.com/Halfwit-Technologies/STEV-Client
cd STEV-Client
bun install
```

## Running Locally

Use the included setup script to create your `.env` file:

```bash
bun run db:setup
```

Then, run the database migrations and seed the database with emails and folders:

```bash
bun run db:migrate
# bun run db:seed
```

Finally, run the Next.js development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.
