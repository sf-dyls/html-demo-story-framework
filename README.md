# Demo Story Framework

An editable, presenter-led React presentation with a CMS, persona journeys, animated before/after diagrams, customer value cards and follow-up notes.

## Start here — no GitHub experience required

1. Extract the ZIP on your Mac. Keep the entire `demo-story-framework` folder together.
2. Install Node.js 22 LTS (or a compatible newer LTS) from https://nodejs.org and GitHub Desktop from https://desktop.github.com.
3. Open Terminal. Type `cd ` (including the space), drag this folder onto Terminal, then press Return.
4. Run `npm ci` to download the project's dependencies. Internet is required for this first step.
5. Run `npm run dev`.
6. Open the localhost address printed by Terminal, normally http://127.0.0.1:5173.
7. Leave Terminal running while using the presentation. Press Control+C to stop it.

Use **Edit content**, or open `/cms`, to edit slides. Arrow keys navigate. N captures follow-ups. This version runs a local file-backed CMS without a Salesforce connection or hosted account.

## Put it on GitHub using GitHub Desktop

This ZIP deliberately contains no Git history or remote credentials.

1. Sign into GitHub Desktop.
2. Choose File → Add Local Repository and select the extracted folder.
3. If Desktop says it is not a Git repository, choose the option to create a repository here. Check that the repository folder is the one containing `package.json` (do not create an extra nested project folder).
4. Review Changes. You should see source, content and assets, but not `node_modules`, `dist` or `.local-data`.
5. Commit the files with the message “Initial demo story framework”.
6. Click Publish repository, name it `demo-story-framework`, and keep it private. Select your organisation if appropriate.
7. Open the repository on GitHub and invite teammates through its access settings.

The supplied customer content and Salesforce fonts/images are included for your team's existing presentation use. Review these assets and their usage rights before distributing outside the team. No open-source licence is granted by this package.

## What Save and Publish mean locally

- Save draft writes content to `.local-data/state.json` on YOUR computer.
- Publish copies the saved draft to the LOCAL presentation. It does not change the live ChatGPT Site or GitHub.
- Uploaded images are saved in `.local-data/media/`.
- Follow-up notes are saved in the same state file and grouped by customer.
- Back up the entire `.local-data` folder to keep personal edits, uploads and notes.
- `.local-data` is excluded from Git, so personal edits and questions are not accidentally shared.
- Each teammate has an independent copy; this is not a shared multiuser server.

To intentionally share edited content: click Publish locally, then run:

```bash
npm run export:content
```

This updates `content/initial.json` and copies uploaded images into `public/team-media`. Review and commit those changes in GitHub Desktop. Follow-up notes are excluded.

Existing local state takes precedence over `content/initial.json`. To load a teammate's updated initial content, stop the server and rename `.local-data` to a backup name, then restart. Do not delete it without backing it up.

## How teammates contribute

Clone the repository in GitHub Desktop, open its folder in Terminal, run `npm ci`, then `npm run dev`. Create a new branch for a change, edit in VS Code or a coding assistant, test locally, commit and push, then open a pull request for review. Merge accepted changes into main; other teammates use Fetch/Pull to receive them.

## Project map

| Location | Purpose |
| --- | --- |
| `src/screens/` | Presentation slides and diagrams |
| `src/screens/NativeVoice.tsx` | Before/after diagram, paths and animation |
| `src/screens/ContactCenter.tsx` | Contact centre capabilities diagram |
| `src/cms/Editor.tsx` | Content editor |
| `src/data/` | Types, default content and diagram labels |
| `src/state/` | Navigation, order, hiding and reveal state |
| `src/components/` | Shared UI, notes and navigation |
| `content/initial.json` | Published content snapshot used on first run |
| `public/` | Fonts and presentation images |
| `scripts/local-cms.mjs` | Local file-based content, notes and uploads API |
| `worker/` and `db/` | Original hosted backend source, for developers |

## Build and hosting

`npm run build` type-checks and builds the frontend to `dist/client`.
`npm run preview` runs the built frontend with the local CMS.
`npm run build:worker` additionally bundles the original Worker backend.

The local API is intended for a trusted localhost machine only; it has no team login. Do not expose the dev/preview server publicly. A production migration needs authentication, database/media provisioning, and deployment configuration. The original Worker uses Cloudflare D1/R2 and a Sites-provided identity header; that identity check must be replaced for another host. Set an appropriate OWNER_EMAIL binding if retaining that worker. Personal hosting IDs and old data migrations are intentionally excluded.

GitHub stores and reviews the project; pushing a commit does not deploy the existing live Site. GitHub Pages alone cannot run this hosted CMS backend.

## Offline HTML exports

This is the editable source project, not a single-file presentation. After dependencies are installed it can run locally without the hosted service. Building produces multiple files; it does not create `Presentation.html`. The previously supplied single-HTML exports use a separate bundling and file-save implementation. A maintained `export:html` command is not included in this handover; use the source/local mode for development and keep existing HTML exports for presenting. External customer-story links still require internet.

## Troubleshooting

- “npm: command not found”: install Node.js, then reopen Terminal.
- Address in use: Vite prints another available port; use that address.
- Missing edits: check you opened the same project folder and retained `.local-data`.
- Conflicting draft: reload the editor before saving; another tab may have saved first.
- Build failure: use `npm ci`, then retry `npm run build`.

## Provenance

Source snapshot: `bbf0f0d0e4a9043a55efc34d76187b5714ca40db`.
Published content captured 16 October 2026. This handover adds local file persistence and content export without modifying the live presentation. No private follow-up notes, Git history, access tokens or hosted infrastructure credentials are included.
