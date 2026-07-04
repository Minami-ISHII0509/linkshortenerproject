---
description: Read this file to understand how to fetch data in the project.
---
# Data Fetching Guidelines
This document outlines the best practices and guidelines for fetching data in our Next.js project. Adhereing to these guidelines will ensure consistency, maintainability, and performance across the application.

## 1. Use Server Components for Data Fetching
In Next.js, ALWAYS using Server Componnts for data fetching, NEVER use Client Components to fetch data.

## 2. Data Fetching Methods
ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data directly in the components.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions.