# Contributing to Financial Scorecard System

We love your input! We want to make contributing to this project as easy and transparent as possible.

## Development Process

We use GitHub to sync code, track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. **Fork the repo** and create your branch from `main`.
2. **Make your changes** and ensure the code follows our style guidelines.
3. **Test your changes** - make sure all existing tests pass and add tests for new features.
4. **Update documentation** if you've changed APIs or added features.
5. **Ensure your code lints** and follows the project's coding standards.
6. **Issue the pull request** with a clear description of what you've done.

## Local Development Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL (or use Docker)

### Backend Setup
```bash
# Clone your fork
git clone https://github.com/yourusername/financial-scorecard-system.git
cd financial-scorecard-system

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.production.example .env
# Edit .env with your database settings

# Run database migrations
alembic upgrade head

# Start the backend
python main.py
```

### Frontend Setup
```bash
# In a new terminal
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.production.example .env.local
# Edit .env.local with your backend URL

# Start the frontend
npm run dev
```

### Testing
```bash
# Run backend tests
python -m pytest

# Run frontend tests
cd frontend
npm test
```

## Coding Standards

### Python (Backend)
- Follow [PEP 8](https://pep8.org/) style guidelines
- Use type hints for function parameters and return values
- Write docstrings for all public functions and classes
- Use meaningful variable and function names

### TypeScript/React (Frontend)
- Follow [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- Use functional components with hooks
- Implement proper TypeScript typing
- Follow component naming conventions

### Database
- Use Alembic migrations for all schema changes
- Write descriptive migration messages
- Test migrations in both directions (up and down)

## Issue Reporting

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/3bsolutionsltd/financial-scorecard-system/issues).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We welcome feature requests! Please:

1. **Check existing issues** first to avoid duplicates
2. **Use the feature request template** when creating a new issue
3. **Provide detailed use cases** and examples
4. **Consider implementation complexity** and provide suggestions if possible

## Project Structure

```
financial-scorecard-system/
├── 🔧 Backend (FastAPI)
│   ├── api/              # REST API endpoints
│   │   └── endpoints/    # Individual endpoint modules
│   ├── models/           # SQLAlchemy database models
│   ├── services/         # Business logic layer
│   └── alembic/          # Database migrations
├── 🎨 Frontend (Next.js)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── api/          # API client & TypeScript types
│   │   └── app/          # Next.js app directory
├── 🐳 Deployment
│   ├── Dockerfile        # Backend container
│   ├── frontend/Dockerfile  # Frontend container
│   └── railway.json      # Railway deployment config
└── 📚 Documentation
    ├── *.md             # Various guides and documentation
    └── scripts/         # Utility scripts
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add role-based access control
fix(api): resolve trading account creation validation
docs(readme): update deployment instructions
style(frontend): apply consistent formatting
```

## Documentation

- Update relevant documentation when making changes
- Use clear, concise language
- Include code examples where appropriate
- Update API documentation for endpoint changes

## Deployment Testing

Before submitting a PR that affects deployment:

1. Test Docker build: `docker build -t test-scorecard .`
2. Verify environment variables work correctly
3. Test database migrations
4. Ensure frontend builds successfully: `npm run build`

## Community

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Provide constructive feedback

## Questions?

Don't hesitate to ask questions by:
- Opening an issue with the "question" label
- Starting a discussion in the Discussions tab
- Reaching out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.