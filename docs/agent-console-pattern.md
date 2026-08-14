# Agent console pattern

The reference for building an agent console and the recording that goes on its agent page.
Sterling is the built example. Everything here is what to copy; the content is what to
*not* copy.

Governed by CLAUDE.md §13. Read that first for status and the rollout gate.

---

## What the screen is

An unlisted route rendering a real product console, recorded and embedded on the public
agent page. `/sterling` is the working example. Visual record of the built state:
`public/media/sterling-console.png`.

### Chrome (identical for every agent)

| Zone | Contents |
|---|---|
| **App bar** | Floating pill. Ferrata Labs mark + wordmark, hairline separator, workspace name with its ERP beneath, "Illustrative data" chip. The **agent name does not appear here** — it lives in the rail. |
| **Rail** | Floating pill column. The active agent expanded with its three sections as children, then `OTHER AGENTS` with the remaining five collapsed and their role in mono, then a divider, then Settings, Data, Collapse. |

The rail is the thing that makes this read as a platform rather than a dashboard. Collapsed
siblings are **inert** — those consoles do not exist, and a chevron that expands into
nothing is worse than one that does not move.

### Body (five panels, same skeleton, agent-specific content)

1. **Head** — one-line tagline plus a two-line lede. Sterling: *"The cash position, written
   every morning."*
2. **KPI row, four tiles** — three about the work, **one about what is waiting on a human.**
   Sterling's third tile is `Drafts awaiting release · 7`. That tile is the point of the
   whole screen.
3. **Main table** — the agent's queue. Whatever it ranks, it ranks by something defensible
   and shows the basis in the row.
4. **Right column, two cards** — the approval queue on top (the differentiator), a run log
   beneath ending on a line about waiting for a person.
5. **Written panel** — prose, not charts. Sterling's is "This morning". Four sentences a
   controller would actually read.

---

## Content rules

**The distinctness test.** If two consoles could swap their data and still make sense, one
of them is wrong. Sterling and Pledge share a receivables queue, so they are separated on
the verb: Pledge *executes and meters credits*; Sterling *drafts and stops*. Every console
needs an equivalent separation.

**The approval gate is the centrepiece, not a footnote.** §7 promises on every marketing
page that nothing touches a customer without a person saying so. These consoles are where
that is shown working. Release / Edit / Skip on every drafted action, and a closing line:
*"Sterling drafts. A person releases. Nothing reaches a customer before that."*

**Score against the customer's own baseline, not against terms.** Sterling's queue measures
days open against each customer's learned settlement day and flags `off pattern`. It is the
most credible thing on the screen because it is the thing a spreadsheet cannot do.

**Written, not charted.** No charts anywhere. A prose panel beats a graph for a finance
buyer and matches §7's voice.

**Everything is illustrative** and says so, in the app bar chip and the page footer.

---

## Sketches for the remaining five

Not drafted. These are the angles that satisfy the distinctness test, to be written when
the rollout is authorised.

| Agent | Queue ranks | Approval queue holds | The one credible detail |
|---|---|---|---|
| **Clark** · Payables | Invoices by exception type | Postings awaiting release | Three-way match variance named to the line, plus near-duplicate detection across vendor groups |
| **Tally** · Reconciliation | Breaks by age and size | Proposed journals with support attached | Break aging: a 3-day break is noise, the same break at 40 days is a control problem |
| **Chandler** · Procurement | Open RFQs by response gap | Award recommendations | Quotes normalised to one basis so the comparison is real, with the arithmetic shown |
| **Swift** · Order management | Inbound POs by intake status | Orders held on a real conflict | Only true exceptions surface; unit and part-number differences resolve silently |
| **Quill** · Quotes & CRM | Enquiries by age and value | Drafted quotes ready to send | Priced against the customer's contracted rates, not list |

---

## Files and commands

```
content/sterling.ts                     console content, all illustrative
app/(product)/sterling/page.tsx         the console route, unlisted + noindex
components/product/AgentRail.tsx        the agent tree rail
components/product/AppShell.tsx         shared chrome, branches on isSterling
components/ConsolePreview.tsx           the embed, with the reduced-motion swap
scripts/record-console.mjs              capture and encode
public/media/sterling-console.{mp4,webm,png}
```

To rebuild the asset:

```bash
npm i -D playwright && npx playwright install chromium   # not a project dep, ~200MB
npm run build && npx next start -p 3001
node scripts/record-console.mjs sterling
```

MP4 is h264/yuv420p with faststart, which Safari and iOS require. WebM is VP9. The poster
doubles as the reduced-motion still, so the server renders it and the browser upgrades to
video only when motion is welcome — a reduced-motion visitor never downloads the video.

---

## To pick this up in a later prompt

Say: **"Build the console for \<agent\> using the pattern in
`docs/agent-console-pattern.md`."**

That is enough to reproduce the chrome, the five panels, the recording and the embed. Add
the angle you want if you disagree with the sketch above.
