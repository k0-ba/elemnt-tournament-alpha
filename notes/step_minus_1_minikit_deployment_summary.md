# Summary of "Step -1": Minikit Miniapp Deployment & Manifest Generation

**Date:** 2025-05-15

**Objective:** The primary goal of "Step -1" was to successfully build and deploy the `elemnt-tournament-alpha` Miniapp to Vercel, with a strong focus on correctly generating the Farcaster manifest (which had been a challenge for the user previously), and to prepare the application for use within the Warpcast ecosystem. This step was undertaken before proceeding with "Step 0" of the main project roadmap.

## Key Steps & Outcomes:

1.  **Project Initialization & Setup:**
    *   It was confirmed that the current project in `c:\github\elemnt-tournament-alpha` was a copy from another repository where initial Minikit setup (`npx create-onchain --mini` or similar) had already been performed.
    *   The directory structure was verified and found to be a standard Next.js/Minikit setup.
    *   Project dependencies were installed using `npm install`, as `yarn` was not available on the system.
    *   The local development server was successfully started using `npm run dev` and was accessible at `http://localhost:3000`.
    *   A code check confirmed the correct implementation of `MiniKitProvider` in `app/providers.tsx` and the usage of the `useMiniKit` hook in `app/page.tsx`.

2.  **Vercel Deployment:**
    *   The application was deployed to Vercel using the Vercel CLI (`vercel` command).
    *   The stable production URL for the project was identified and confirmed as `https://elemnt-tournament-alpha.vercel.app/`.
    *   The `NEXT_PUBLIC_URL` variable in the local `.env` file was updated to this stable Vercel URL.
    *   The following essential environment variables were set in the Vercel project's production environment:
        *   `NEXT_PUBLIC_URL`: `https://elemnt-tournament-alpha.vercel.app/`
        *   `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: (Value taken from the user's `.env` file)

3.  **Farcaster Manifest Generation (Combined Approach):**
    *   A two-phase approach was adopted for robust manifest generation, incorporating user-provided advice from a Base developer alongside Minikit documentation:
    *   **Phase 1: Domain Verification (`farcaster.json` via Warpcast Mobile App):**
        *   The directory `public/.well-known/` was created.
        *   The user generated the necessary JSON content using the Developer Mode in their Warpcast mobile application, targeting the stable Vercel URL (`https://elemnt-tournament-alpha.vercel.app/`).
        *   The generated JSON was used to create and populate `public/.well-known/farcaster.json`.
        *   This new `farcaster.json` file was committed to git and deployed to Vercel.
    *   **Phase 2: Minikit Frame Manifest (`.env` variables via CLI Tool):**
        *   The user successfully executed the `npx create-onchain --manifest` command in the project root.
        *   This tool automatically updated the local `.env` file by adding/populating the `FARCASTER_HEADER`, `FARCASTER_PAYLOAD`, and `FARCASTER_SIGNATURE` variables.
        *   These three newly generated Farcaster-specific variables were then manually added to the Vercel project's production environment variables.

4.  **Finalization & Next Steps:**
    *   A final `vercel --prod` deployment was executed to ensure all changes, including the updated `farcaster.json` and all Vercel environment variables (both initial and Farcaster-specific), were live and active.
    *   The Miniapp is now considered fully configured on Vercel, with both domain verification and Minikit frame signing manifests in place, making it ready for testing and casting within the Warpcast ecosystem.
    *   The importance of customizing frame-related images (e.g., `icon.png`, `image.png`, `splash.png` referenced in `farcaster.json` and potentially `.env`) by placing them in the `public` directory and redeploying was briefly noted as a subsequent step for visual customization.

This comprehensive "Step -1" successfully addressed the user's previous challenges with manifest generation and has established a correctly deployed and configured Miniapp on Vercel.
