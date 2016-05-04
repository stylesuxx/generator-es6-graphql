# Changelog

## [Unreleased]
### Added
- NodeJs v6.0 support

### Updated
- Dependencies
- Tests

### Removed
- iojs support
- support for NodeJs versions < 4.4.3

## [0.7.0] - 2015-12-13
### Added
- Hot loading support
- Persist session on server restart when mongoose is enabled

### Improved
- Removed items from the webpack config that are not relevant for the server
- Added more documentation to the README of the generated project
- Testcases
- Sensitive configuration now has a separate folder that is ignored by git
- Generator now defaults to using mongoose and local auth

## [0.6.0] - 2015-12-12
### Added
- Changelog
- User profile skeleton
- Signup via mutation
- Use graphql-custom-types where appropriate
