# Use Cypress base image
FROM cypress/included:12.17.1

# Create working directory
WORKDIR .

# Copy test files and config
COPY . .

# Run the tests
CMD ["npx", "cypress", "run"]