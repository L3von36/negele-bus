# Contributing to Negele Easy Ride

Thank you for your interest in contributing to the Negele Easy Ride project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and inclusive in all interactions. We welcome contributions from everyone regardless of experience level.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/negele-easy-ride.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Guidelines

### Code Style
- Use Vue 3 Composition API with `<script setup>` syntax
- Follow ESLint rules (run `npm run lint` before committing)
- Use meaningful variable and function names
- Add comments for complex logic

### Component Structure
```vue
<script setup>
// Imports
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  // prop definitions
})

// Emits
const emit = defineEmits(['event-name'])

// State
const state = ref(null)

// Methods
const methodName = () => {
  // implementation
}
</script>

<template>
  <!-- Template content -->
</template>

<style scoped>
/* Styles */
</style>
```

### Testing
- Write tests for new features using Vitest
- Run tests with `npm test`
- Aim for good test coverage on critical functionality

### Commit Messages
Follow conventional commits format:
- `feat: add new feature`
- `fix: resolve bug in booking flow`
- `docs: update README`
- `style: format code`
- `refactor: improve component structure`
- `test: add unit tests`
- `chore: update dependencies`

## Pull Request Process

1. Ensure your code passes linting and tests
2. Update documentation if needed
3. Add tests for new functionality
4. Submit a PR with a clear description of changes
5. Wait for review and address feedback

## Areas for Contribution

- New features for passenger booking
- Admin dashboard improvements
- Driver app enhancements
- Performance optimizations
- Accessibility improvements
- Localization (Amharic, Oromo translations)
- Bug fixes
- Documentation

## Questions?

Open an issue for questions or discussions about potential features.

Thank you for contributing! 🙏
