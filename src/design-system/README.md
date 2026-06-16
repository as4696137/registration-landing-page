# 初聲 Contest Design System

A small, opinionated design system **reverse-engineered from the existing site's
styles** — a neo-brutalist language of black hairline borders, hard offset
shadows, fluorescent accent blocks, and the `Dela Gothic One` display typeface.

Nothing here invents a new look; every token and component mirrors patterns
already shipping in `src/components/**`.

## Design language

| Trait        | Value                                                    |
| ------------ | -------------------------------------------------------- |
| Borders      | `1px` solid **black**, no radius (except avatars)        |
| Shadows      | Hard offset, no blur — `0 10px 0 rgba(0,0,0,0.25)`       |
| Display font | `Dela Gothic One` (headings) + black text stroke         |
| Body font    | `Noto Sans TC`, body line-height `160%`                  |
| Accent       | Neon yellow `#ffff41`, plus teal `#00ffc7`, pink `#ff6996` |
| Radius       | `0` everywhere; `9999px` for circular avatars only       |

Full machine-readable values: [`tokens.json`](./tokens.json) (W3C design-tokens
format).

## Tokens in Tailwind

The tokens are wired into [`tailwind.config.js`](../../tailwind.config.js) so you
can use them as utilities:

```
Colors    bg-brand / bg-brand-hover / text-ink / bg-surface / bg-tag-{yellow,teal,pink} / bg-section-{green,mint,blue}
Shadows   drop-shadow-hard-{sm,md,lg,diagonal}  ·  shadow-hard-{sm,md,lg,solid}
Display   text-display-{sm,md,lg}   (40 / 65 / 80px @ 120% line-height)
```

The signature title treatment also relies on the `title-shadow-{sm,md,lg}` and
`stroke-black` utilities already defined in [`src/tailwind.css`](../tailwind.css).

## Components (atoms)

| Component      | Mirrors                                  | Key props                          |
| -------------- | ---------------------------------------- | ---------------------------------- |
| `Button`       | standardized CTA (text equivalent of the star buttons) | `variant` `primary\|secondary\|dark`, `size`, `as` |
| `Tag`          | award-name label blocks (InfoA)          | `color` `yellow\|teal\|pink`       |
| `Card`         | white bordered description boxes (InfoA) | —                                  |
| `Avatar`       | circular jury portrait frames            | `size` `sm\|md\|lg`, `fill`        |
| `SectionTitle` | big "賽事説明"-style display headings      | `as`, `size`, `color`              |

### Usage

```tsx
import { SectionTitle, Tag, Card, Avatar, Button } from "../design-system";

<SectionTitle color="brand">賽事説明</SectionTitle>

<div className="flex flex-col gap-4">
  <Tag color="teal">最佳新聞受眾洞察獎</Tag>
  <Card>
    <p className="mb-2 text-xl font-bold">「新聞要對誰說話？」</p>
    <p>找出新聞議題背後的受衆…</p>
  </Card>
</div>

<Avatar size="lg"><img src={portrait} alt="評審" /></Avatar>

<Button as="a" href="/submit" variant="dark" size="lg">交件專區</Button>
```

## Accessibility notes

- `Button` renders a real `<button>` (or `<a>` when `as="a"`), is keyboard
  focusable, and shows a `focus-visible` ring.
- **Contrast caveat (WCAG 2.1 AA):** the brand neon yellow `#ffff41` has poor
  contrast against white. Use it for large display type (≥ 24px bold, which
  clears the 3:1 large-text bar) and accent fills, **not** small body text.
  Black-on-neon and black-on-white combinations used by `Tag`/`Card` pass AA.
- When an `Avatar` wraps a meaningful image, give the inner `<img>` a
  descriptive `alt`; use `alt=""` for decorative ones.

## Scope / next steps

Current coverage is the atom layer most reused on the homepage. Natural
extensions, in priority order:

1. **Molecules** — `AwardCard` (Tag + artwork + Card), nav link, footer link.
2. **Refactor** existing sections (`InfoA_section`, `About_section`, …) to consume
   these atoms and delete duplicated class strings.
3. **Storybook** for visual documentation (the skill recommends it).
