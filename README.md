# Demo Story Framework

A reusable, interactive presentation framework for customer demonstrations. It helps presenters connect customer challenges to a solution story, walk through demo personas, explain value and capture follow-up actions.

The presentation runs in a web browser. It includes a content management system (CMS), so you can tailor the story, images and slide order without editing code. Developers can extend the layouts, interactions and animations through the React and TypeScript source.

**This README describes the GitHub source package and its local CMS.** Each teammate runs their own copy on their computer. It is separate from the hosted ChatGPT Site and from previously exported single-file HTML presentations.

## What you can do

- Tailor the presentation to a customer: title, challenges, benefits, personas, value points, customer story and closing.
- Introduce up to four presenters.
- Present animated Before/After and contact centre capability diagrams.
- Follow persona journeys and reveal points as you speak.
- Hide slides and rearrange their order.
- Highlight supported cards on hover and reveal customer logos on value cards.
- Capture questions with **N** and review them on the Actions screen.
- Share improvements through GitHub while keeping personal drafts and notes local.

## 1. Get your copy and start it

### Get the project (both options)

You need repository access, [GitHub Desktop](https://desktop.github.com/) and [Node.js](https://nodejs.org/) installed. Use Node.js 22 or a compatible newer LTS version.

1. Accept your GitHub repository invitation and sign in to GitHub Desktop.
2. Choose **File → Clone repository** and select this repository. Cloning downloads your own working copy.
3. Open the downloaded project folder. Its root should contain `package.json`, `src`, `public`, `content` and `.gitignore`.

Choose either option below. Both run the same presentation and CMS, and both save to the same local files.

### Option A — Use Terminal

1. Open Terminal in that folder. On a Mac, you can type `cd `, drag the folder into Terminal, then press Return.
2. Install the required packages:

   ```bash
   npm ci
   ```

3. Start the presentation:

   ```bash
   npm run dev
   ```

4. Open the local address printed in Terminal, usually **http://127.0.0.1:5173**.

Keep Terminal running while you use the presentation. Press **Control+C** to stop it. Installation requires internet; the local presentation and CMS can then run without the hosted service. External story links still require internet.

### Option B — Use Cursor Agent

Install [Cursor](https://cursor.com/) as well as Node.js. Cursor can run the commands for you; you do not need to open a separate Terminal application. Agent availability may depend on your Cursor account and settings.

1. In GitHub Desktop, choose **Repository → Show in Finder** (or **Show in Explorer** on Windows) to locate your cloned repository.
2. In Cursor, choose **File → Open Folder** and select the folder containing `package.json`, `src` and `public`.
3. Open Cursor's Agent chat and paste:

   > Help me run this project locally. Read README.md and package.json. Install dependencies with npm ci if needed, then start the development server using npm run dev. Give me the local preview URL. Do not change project files, commit anything or push to GitHub.

4. Approve command execution if Cursor asks. It may show the running server in its integrated terminal.
5. Open the address Cursor provides in Chrome, usually **http://127.0.0.1:5173**. Use the actual port it reports if different.
6. Click **Edit content** to open the CMS, or add `/cms` to that local address.

Keep Cursor and the development server running while using the presentation. To stop, ask Agent to stop the development server it started, or press **Control+C** in that server's integrated terminal.

**Do not double-click this project's `index.html`.** It is React source and needs the development server to assemble the page and provide CMS saving. Separate `Presentation.html` exports are the versions that open directly.

### Next time

| Your preference | What to do |
| --- | --- |
| Terminal | Open Terminal in the project folder and run `npm run dev` |
| Cursor | Open the same folder and ask: “Start the local development server and give me the preview URL. Do not change any files.” |

Use one running server for the project. Switching between Terminal and Cursor does not require another clone or installation. Reinstall dependencies when they change or the installation needs repair.

## Download one HTML file for offline presenting

After customising the presentation, click **Download offline HTML** in the local CMS. This exports the current editor content, including unsaved text changes, and saved follow-up notes for the selected customer. It does not require a Git commit or push, and it does not overwrite your local draft or publish to the hosted Site.

1. Wait for the export to finish; the first build may take a few seconds.
2. Keep the downloaded `Presentation.html` wherever you want to present from.
3. Open it directly in desktop Chrome. You can stop the local server and close Cursor. The presentation, CMS, fonts, images and animations are embedded in this one file.
4. To edit the exported copy, click **Edit content**, then **Save to file**.
5. On the first save in each browser session, choose the file to update (or choose a new name). Chrome requires your permission to write to that file. Later saves in that session reuse the chosen file.
6. Reopen the saved HTML to check your changes. Keep dated backups.

Submitting or resetting follow-up notes in the standalone version also saves the HTML. If direct file saving is unavailable, it downloads a new HTML copy instead; keep the newest copy. Cancelling the file picker cancels that save. External customer-story links still need internet.

Offline changes remain in that HTML file. They do not automatically sync back to the source project's CMS or to GitHub. To share framework improvements, use the GitHub workflow below; to share a finished presentation, share the HTML file.

**Terminal alternative:** run `npm run export:html` in the repository. This exports the local **published** content and its saved notes to `exports/Presentation.html`. If no local state exists, it uses the initial content. Publish first if you want your draft included.

**Cursor alternative:** ask Agent: “Run npm run export:html and show me exports/Presentation.html. Do not commit or push anything.” This uses published content, unlike the CMS button which uses current editor fields.

## 2. Present the story

Use the arrow keys to move through the presentation. Some screens reveal the next point or diagram state before moving to the next slide. Use the navigation menu to jump to a screen, or the Journey Hub button to return to the persona overview.

On the Before/After screen, use the state buttons or keyboard navigation to switch between diagrams. Hover over supported challenge, benefit, story and value cards to emphasise the point you are discussing. Customer value cards can flip to show their uploaded logos.

Press **N** to capture a follow-up question, enter the note and submit it. Submitted notes appear on the **Actions** screen. Its **Reset** button clears the local list for the current customer.

Before a meeting, publish your local draft and walk through the actual presentation—not only the CMS preview—to check the slide order, images, reveals and notes.

## 3. Edit content in the CMS

Open **Edit content**, or visit `/cms` at the local address—for example, **http://127.0.0.1:5173/cms**.

The editor has three main areas:

| Area | Purpose |
| --- | --- |
| Slide list on the left | Select a screen and change its position |
| Preview in the middle | See the selected screen as you edit |
| Fields on the right | Change text, images and screen visibility |

### Make a change

1. Select the relevant screen on the left.
2. Edit its fields on the right. The preview updates as you type.
3. Click **Save draft** to save your work without changing the presenting version.
4. Click **Publish** when the changes are ready to appear in your local presentation.
5. Return through **← Presentation** and check the result. Refresh an already-open presentation tab if necessary.

Typing updates the editor preview; it is **not an automatic file save**. Wait for the saved confirmation before closing the editor.

### Common customisations

| Screen | What to edit |
| --- | --- |
| Title | Customer name, presentation title, subtitle, date, hero image and customer logo |
| Team introductions | Up to four presenters, roles and portraits |
| Challenges / Benefits | Three challenge-and-benefit pairs and their descriptions |
| Journey hub / Persona introduction | Persona names, roles, portraits, overview points and quotes |
| Persona journey | Journey title, points, tags and optional step icons |
| Customer value | Value points, metrics, descriptions, reverse-side logos and audience portraits |
| Customer story | Story details, statistics, relevance and external source link |
| Key takeaways | Its own three benefit boxes and heading |
| Contact centre capabilities | Diagram headings and text labels |
| Why native voice matters | Before/After headlines, supporting sentences and diagram labels |
| Closing | Closing content and vendor branding |

“Why native voice matters” is the editor's section name for the Before/After diagram. The CMS changes its content; changes to connector positions, animation timing or layout require source-code edits.

### Hide or reorder screens

- Use the **↑ / ↓** buttons beside a screen in the slide list to move it.
- Select a screen and untick **Show in presentation** to hide it. Its content remains available in the editor.
- Click **Publish** to apply these changes to your local presentation.

### Images and icons

Use each image field's size guidance. Upload JPG, PNG or WebP files under 8 MB. Use **Fill frame** when cropping is appropriate, or **Show whole image** for logos.

For journey-step icons, use a square **256 × 256 px** image, ideally a transparent PNG, with roughly 10% space around the symbol. If no icon is uploaded, the step displays a number.

### Shared fields: change once, reuse across screens

The presentation reads shared content from one configuration. For example, persona names and portraits are reused across their introductions and journey hub, and the customer/vendor branding is reused in the footer and closing experience.

Not every similar-looking field is linked. **Key takeaways has its own benefit text**, so changing Benefits does not automatically rewrite Key takeaways. Check both when tailoring the story.

## 4. Understand where your work is saved

| Action | What happens |
| --- | --- |
| Save draft | Writes your draft to `.local-data/state.json` on your computer |
| Publish in the local CMS | Makes that draft the local presentation's published content |
| Upload an image | Saves it in `.local-data/media/` |
| Submit a follow-up | Saves it locally, associated with the published customer name |
| GitHub commit | Records selected project-file changes in your local Git history |
| GitHub push | Uploads committed changes to the shared repository |

**Publish in the CMS does not publish to GitHub or update the hosted live Site.** Your teammates cannot see your local CMS edits until you intentionally export and share them.

Back up the entire `.local-data` folder to retain drafts, published content, uploaded images and notes. It is excluded from Git so these personal files are not accidentally uploaded. Follow-ups use the customer name for grouping; changing that name changes the list you see.

## 5. Share content changes through GitHub

Use this when you want your revised presentation content to become available to the team.

1. In GitHub Desktop, fetch/pull the latest repository changes before starting shared work.
2. Create a branch with a descriptive name, such as `content/customer-story-update`.
3. Edit through the CMS, then click **Publish** locally.
4. In a second Terminal window, open the same project folder and run:

   ```bash
   npm run export:content
   ```

   **Cursor alternative:** ask Agent: “Run npm run export:content in this project and tell me which files changed. Do not commit or push.” You still need to Publish in the CMS first.

5. In GitHub Desktop, review the changed files. This command updates **`content/initial.json`** and copies uploaded images into **`public/team-media/`**. It exports the full published configuration, not just the screen you edited. Private follow-up notes are excluded.
6. Commit with a clear message, such as `Update customer story and key takeaways`.
7. Push/publish the branch, then open a **pull request** describing what changed and how you checked it.
8. A reviewer checks and merges the pull request into `main`.

Coordinate when several people edit presentation content: the configuration is one JSON file, so simultaneous exports may conflict. Do not blindly overwrite another teammate's changes.

### Receive another teammate's content update

Pulling updates the code and initial content, but **your existing `.local-data` still takes precedence**. This protects your personal draft from being overwritten.

To start from the team's updated initial content:

1. Save your work and stop the local server.
2. Move `.local-data` to a safe backup location outside the repository. On a Mac, **Command+Shift+.** shows hidden folders.
3. Pull the latest repository changes.
4. Run `npm ci` if dependencies changed, then `npm run dev`.

The app now starts from `content/initial.json`. Your backed-up draft, uploads and notes remain separate; this process does not merge them with the new team content.

## 6. Develop new features

Content changes generally belong in the CMS. New layouts, interactions or animation behaviour belong in the source code.

1. Pull the latest `main`, then create a feature branch.
2. Edit the source in VS Code or your preferred coding tool.
3. Run `npm run dev` and exercise the changed behaviour.
4. Run `npm run build` to check TypeScript and build the frontend.
5. Commit and push the branch, then open a pull request.

Before requesting review, check the affected slides in both navigation directions, editor save/publish behaviour, image sizing and laptop layout. For animation changes, also check reduced-motion behaviour. Describe any verification you could not complete.

| File or folder | What it controls |
| --- | --- |
| `src/screens/` | Slide components and their styling |
| `src/screens/NativeVoice.tsx` | Before/After diagram and request animation |
| `src/screens/ContactCenter.tsx` | Contact centre capability diagram |
| `src/cms/Editor.tsx` | CMS fields and editor controls |
| `src/data/` | Types, defaults and diagram configuration |
| `src/state/` | Slide order, visibility, navigation and reveals |
| `src/components/` | Shared controls, notes and other reusable UI |
| `content/initial.json` | Starting presentation content for a new local copy |
| `public/` | Images, fonts and other assets |
| `scripts/local-cms.mjs` | Local file-based API |
| `scripts/export-content.mjs` | Exports published local content for sharing |
| `scripts/export-html.mjs` | Builds the standalone offline HTML |
| `src/cms/offline.ts`, `offline-api.ts` | Embedded content and save-to-file behaviour |
| `worker/`, `db/` | Original hosted backend source for future deployment work |

## 7. Avoid uploading thousands of dependency files

`npm ci` creates `node_modules`. These downloaded dependencies should not be committed. Each teammate installs their own copy.

Keep `.gitignore` at the repository root, beside `package.json`. The supplied file excludes `node_modules/`, `dist/`, `.local-data/`, environment files and temporary build files.

If GitHub Desktop suddenly shows thousands of dependency files, stop before committing. Check that the hidden `.gitignore` file was copied into the correct folder. If the files were already committed, ask the repository maintainer to remove them from Git tracking; adding an ignore rule alone does not untrack existing files.

## 8. Build, hosting and offline use

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the locked dependency versions |
| `npm run dev` | Start local development with the file-backed CMS |
| `npm run build` | Type-check and build the frontend into `dist/client` |
| `npm run preview` | Preview the built frontend with the local CMS |
| `npm run export:content` | Export published local content and images for Git |
| `npm run export:html` | Build a self-contained HTML from published content |
| `npm run build:worker` | Additionally bundle the original hosted Worker backend |

GitHub is the place to store, review and share the project. It does not automatically deploy this app. GitHub Pages alone cannot run its hosted CMS backend.

The supplied local server is for localhost use and has no team authentication. Production hosting requires authentication, database/media provisioning and deployment configuration. The original Worker assumes Cloudflare D1/R2 and Sites identity headers; it needs adaptation for another host.

This repository is the editable development project. `npm run build` produces the multi-file frontend; use **Download offline HTML** or `npm run export:html` for a standalone presentation. Exporting requires the installed development dependencies, but using the exported HTML requires only a browser. Exported files in `exports/` are ignored by Git.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| `npm: command not found` | Install Node.js, reopen Terminal and retry |
| `package.json` cannot be found | Open Terminal in the repository root |
| Browser cannot connect | Keep `npm run dev` running and use the exact address it prints |
| CMS edit does not appear in the presentation | Click Publish locally, then refresh the presentation |
| Teammate's content update is missing | Existing `.local-data` overrides initial content; follow the backup/reset instructions above |
| “A newer draft exists” | Another tab may have saved; preserve unsaved text before reloading the editor |
| Missing images after moving folders | Keep `.local-data/media` with its state file and retain the project's `public` assets |
| Thousands of files in GitHub Desktop | Check `.gitignore`; do not commit `node_modules` |

The package includes customer content and Salesforce-branded assets for the existing team presentation. Keep the repository private and review content and asset rights before broader distribution. No open-source licence is supplied.
