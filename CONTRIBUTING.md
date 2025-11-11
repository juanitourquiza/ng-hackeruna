# Contributing to Hackeruna Frontend

Thank you for your interest in contributing to Hackeruna Frontend! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/juanitourquiza/ng-hackeruna/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, Angular version)

### Suggesting Features

1. Open an issue with the `feature request` label
2. Clearly describe the feature and its benefits
3. Provide examples if possible

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following our coding standards
4. **Test** your changes thoroughly
5. **Commit** using Conventional Commits:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** with:
   - Clear title and description
   - Link to related issues
   - Screenshots/GIFs if UI changes

## Development Setup

1. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ng-hackeruna.git
   cd ng-hackeruna
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start dev server**:
   ```bash
   npm start
   ```

4. **Run tests**:
   ```bash
   npm test
   ```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Angular

- Use standalone components
- Follow the Angular style guide
- Use signals for reactive state when appropriate
- Implement OnPush change detection when possible

### Styling

- Use Tailwind utility classes
- Follow the existing design system
- Ensure dark mode compatibility
- Test responsive behavior

### File Naming

- Components: `feature-name.component.ts`
- Services: `feature-name.service.ts`
- Models: `feature-name.models.ts`
- Use kebab-case for file names

### Component Structure

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {
  // Public properties first
  // Private properties last
  // Constructor
  // Lifecycle hooks
  // Public methods
  // Private methods
}
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Code style (formatting, missing semicolons, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `ci:` CI/CD changes
- `build:` Build system changes

### Examples

```bash
feat: add search functionality to header
fix: correct dark mode toggle behavior
docs: update README with new environment variables
refactor: simplify WordPress API service
test: add unit tests for theme service
```

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for good test coverage
- Use Vitest for unit tests

## Documentation

- Update README.md if adding features
- Add JSDoc comments for public APIs
- Update CHANGELOG.md following Keep a Changelog format

## Questions?

Open an issue with the `question` label or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Hackeruna Frontend! 🚀
