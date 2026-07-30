# Dot11 Wi-Fi Services — Site Spec

## Purpose
Marketing/lead-generation website for Dot11 Wi-Fi Services, a one-person wireless
networking consultancy run by Aaron Poper (CWNA/CWDP certified). The site explains
what services are offered, how engagements work, and how to get in touch. There is
no backend, auth, database, or admin panel — content is hardcoded in the Angular app.

## Tech Stack
- Angular 15 (standalone-free, NgModule-based), TypeScript 4.9
- Angular Router for client-side navigation (4 routes, no lazy loading)
- Static hosting target (no server-side rendering, no API layer)
- Google Fonts (Rajdhani, Titillium Web, Montserrat) loaded via `index.html`
- Form submission handled by a third-party service, [formsubmit.co](https://formsubmit.co) (no backend code)

## Routes / Pages
| Path | Component | Purpose |
|---|---|---|
| `/` | `HomeComponent` | Landing page: tagline, logo, list of technical service offerings, social links, CTA to Contact |
| `/about` | `AboutComponent` | Company mission statement, founder bio (Aaron Poper), certification badges (CWNA, CWDP) |
| `/contact` | `ContactComponent` | Lead capture form (name, email, phone, description) POSTed to formsubmit.co |
| `**` | — | Redirects to `/` |

Navigation is a persistent top nav (`app.component.html`) with links to all four pages, active-route highlighting via `routerLinkActive`.

## Content Model
Service offerings are the one piece of structured data in the app, defined in
[home/services.ts](src/app/pages/home/services.ts) as a typed array (`ServiceItem[]`)
rendered with `*ngFor` on the Home page. Current offerings:
1. Wireless Design & Implementation
2. Post-Deployment WLAN Support
3. Economical Wi-Fi and IoT (customer self-install option)
4. Managed Services (optional paid ongoing support, no lock-in)
5. Home Office optimization

All other page content (About text, nav labels) is inline HTML —
there is no CMS or i18n layer.

## Key Product Facts (for accurate copy/consistency)
- No expensive contracts; pricing is meant to feel realistic, not upsell-driven.
- Customers own all purchased equipment outright; Managed Services is an optional
  add-on, not a requirement to keep the network running.
- Social presence: Facebook and X (`@Dot11services`).

## Assets
- `assets/logo.png` — brand logo (Home page)
- `assets/aaron-profile.png` — founder photo (About page)
- `assets/certs/cwna.png`, `assets/certs/cwdp.png` — certification badges (About page)
- `assets/old/`, `assets/sectorAntenna.jpg` — present in repo, not currently referenced by any component

## Non-goals / Explicitly Out of Scope
- No user accounts, login, or dashboard
- No dynamic backend or database — all content ships in the built JS bundle
- No payment processing (Managed Services is negotiated off-site)
- No CMS — content changes require editing the Angular source and redeploying
