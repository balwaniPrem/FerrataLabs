---
wpId: 58
title: What an approval gate actually is
excerpt: Every agent we ship stops before it does anything consequential. Here is what that looks like in the software, and why it is a design decision rather than a disclaimer.
date: 2026-09-02
categories: [Field notes]
---

Every claim we make about an agent is paired with the same sentence:

> Every agent stops at an approval gate until it has earned its way out of one. Nothing releases cash, commits spend or touches a customer without a person saying so.

That reads like a legal disclaimer. It is not. It is a description of how the software is built, and it changes what gets built.

## The gate is a queue, not a checkbox

The version people expect is a confirmation dialog: the agent decides, a human clicks yes. That is theatre. Nobody reads the fortieth dialog of the morning, and an approval that is always granted is not a control.

What we build instead is a queue of drafted actions. The agent has done the work: pulled the aging report, scored the accounts, written the follow-up, matched the invoice to the purchase order and the receipt. What it has not done is send, post or pay. Each row shows the action, the evidence behind it, and what changes if it goes through. A person releases a batch, or sends one back.

The difference matters because of where the human attention goes. A dialog asks "are you sure?" A queue asks "which of these forty is wrong?" The second question is answerable.

## Why it survives contact with a controller

Finance teams do not resist automation because they distrust models. They resist it because they are accountable for the output and cannot see how it was produced. A gate with the working shown is not a slower path to the same place. It is the only version that a controller will sign.

It also gives you an honest measure of whether the agent is any good. The release rate is right there: how many drafted actions went through untouched, how many were corrected, which categories keep coming back. That number tells you when the gate can start to open, and for which slice of work first.

## Earning the way out

"Until it has earned its way out of one" is the part that does the work. Gates are not permanent, and treating them as permanent is its own failure. A category of action that has run for months at a high release rate with no corrections is a candidate for going straight through, with sampling behind it.

That decision belongs to the client, on evidence, one category at a time. Not to us, and not on day one.
