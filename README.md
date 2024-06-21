# MediMentor AI

## Overview

MediMentor AI is an advanced educational assistant designed to provide accurate, accessible information on medical topics.

## Purpose

To empower medical education by offering an intelligent, user-friendly resource for students, healthcare professionals, and medical enthusiasts.

## Key Features

- Focused on medical education topics
- Clear explanations of complex concepts
- Adaptive learning based on user knowledge level
- Encourages further exploration in medicine

## Scope

Covers a wide range of medical education topics including anatomy, physiology, pathology, diagnostics, treatments, and healthcare systems.

## Usage Guidelines

- For educational purposes only
- Not for personal medical advice
- Consult healthcare professionals for health concerns

## Feedback

We welcome user feedback to continuously improve MediMentor AI.

## Disclaimer

MediMentor AI is an educational tool and not a substitute for professional medical advice or treatment.

## Data Flow

1. User prompts Baatcheet.

2. Frontend (optional): Preprocesses prompt.

3. Frontend sends prompt + history to Gemini API.

4. Backend (Gemini): Processes prompt & history, generates response.\*\*

5. Backend sends response to Frontend.

6. Frontend displays response.

7. Backend stores prompt & response in Internet Computer canister.

**Benefits**:

- Improved context for future interactions.
- Personalized experience based on chat history.
- Ability to resume conversations from past points.

To learn more before you start working with baatcheet, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **dfx**: You have installed the latest version of the DFINITY Canister SDK, `dfx`. You can download it from the DFINITY SDK page. [installation guide](https://demergent-labs.github.io/azle/get_started.html#installation)

- **Node.js**: You have installed Node.js, version 18 or above.

Please ensure all these prerequisites are met before proceeding with the setup of the project.

## ⚠️ Disclaimer: Local Development with Gemini and Content Security Policy (CSP)

Local Development with Gemini and Content Security Policy (CSP)

### Important: When deploying this frontend locally and attempting to interact with the Gemini generative language model API, you may encounter errors due to Content Security Policy (CSP) restrictions.

### Reason: The CSP limits connections to specific sources for security. (`Here connection is http`)

### Recommendation:

For seamless **local interaction with frontend and AI**, **we strongly recommend`using the Vite development server`**. Vite handles CORS (Cross-Origin Resource Sharing) issues, allowing you to interact with Gemini without modifying the CSP.

# Running the project locally

If you want to test your project locally, you can use the following commands:

Cloning repo:

```bash
git clone https://github.com/ahdrahees/baatcheet.git
cd baatcheet
```

### **If you want to install packages and deploy everything in one command Run below script:**

```bash
 chmod +x deploy-local.sh

 ./deploy-local.sh
```

> **You will see a URL in terminal example `http://localhost:3000/` from vite. And you can open this URL in Browser and start interacting with MediMentor AI**

-
-
-
-
-
-
-
-
-
-

### If you want to install and deploy Step by Step Follow below commands:

```bash
# Installing Dependencies
npm i

# Starts the replica, running in the background
dfx start --background

# Deploys your Backend canisters to the replica and generates your candid interface
dfx deploy backend

#Deploy intenet idenity canister
dfx deploy internet_identity
```

Once the job completes, your application will be available at `http://localhost:8080?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

You will see a URL in terminal example `http://localhost:3000/` from vite. And you can open this URL in Browser and start interacting with MediMentor AI
