# Contributing Guidelines

Thank you for considering contributing to our project! We appreciate your interest and support. Please take a moment to read these guidelines to ensure a smooth and productive collaboration.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
   - [Reporting Issues](#reporting-issues)
   - [Submitting Pull Requests](#submitting-pull-requests)
3. [Development Setup](#development-setup)
4. [Coding Guidelines](#coding-guidelines)
5. [Commit Guidelines](#commit-guidelines)
6. [Testing](#testing)
7. [Documentation](#documentation)
8. [License](#license)

## Code of Conduct

Please review and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive environment for all contributors.

## How to Contribute

### Reporting Issues

If you encounter a bug, have a feature request, or want to discuss improvements, please open an issue on our [GitHub issue tracker](https://github.com/your-repo/issues).

When reporting an issue, please provide as much detail as possible, including:

- A clear and concise description of the problem.
- Steps to reproduce the issue.
- Any error messages or screenshots if applicable.
- Information about your environment (e.g., operating system, browser, version).

### Submitting Pull Requests

We welcome and encourage contributions from the community! To submit a pull request (PR):

1. Fork the repository to your GitHub account.
2. Create a new branch for your changes:

   ```shell
   git checkout -b feature/your-feature
   ```

3. Make your changes and ensure that they adhere to our coding guidelines (see [Coding Guidelines](#coding-guidelines)).
4. Commit your changes with a clear and concise message (see [Commit Guidelines](#commit-guidelines)):

   ```shell
   git commit -m "feat: Add new feature"
   ```

5. Push your changes to your fork:

   ```shell
   git push origin feature/your-feature
   ```

6. Create a pull request (PR) from your fork's branch to our `master` branch.
7. Describe your changes in the PR, referencing any related issues.

Our maintainers will review your PR and may request further changes or provide feedback. Once your changes are accepted, they will be merged into the project.

## Development Setup

To set up a development environment, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. Install project dependencies:

   ```shell
   npm install   # or yarn install
   ```

3. Follow any additional setup instructions in the project's README if available.

## Coding Guidelines

Please adhere to our coding guidelines to maintain code consistency throughout the project. Refer to the [CONTRIBUTING_GUIDELINES.md](CONTRIBUTING_GUIDELINES.md) for detailed coding guidelines.

## Commit Guidelines

We follow conventional commits for our commit messages. Each commit message should have the following format:

```
type: short description

Longer description (optional)

Closes #issue-number
```

The `type` can be one of the following:

- `feat`: New feature
- `fix`: Bug fix
- `chore`: Routine tasks, maintenance, or tooling changes
- `docs`: Documentation changes
- `style`: Code style changes (e.g., formatting)
- `test`: Adding or modifying tests
- `refactor`: Code refactoring
- `perf`: Performance improvement

## Testing

Ensure that your code changes include appropriate tests. Run the tests locally before submitting a pull request. Provide test cases for new features and bug fixes whenever possible.

## Documentation

If your changes affect user documentation, please update the documentation accordingly in the relevant files or folders. Make sure that your documentation is clear and concise.

## License

By contributing to this project, you agree that your contributions will be licensed under the project's license. See the [LICENSE](LICENSE) file for details.

Thank you for contributing to our project! Your efforts are greatly appreciated.
