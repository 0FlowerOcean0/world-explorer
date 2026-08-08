import {
  toc,
  elsewhere,
  publishedZh,
  publishedEn,
  ossSoftware,
  claudePlugins,
  community,
  investments,
} from '@/lib/about'

function SectionHeading({ id, zh, en }: { id: string; zh: string; en: string }) {
  return (
    <h2 id={id} className="scroll-mt-24 font-serif text-2xl text-foreground md:text-3xl">
      {zh} — <em className="italic text-accent">{en}</em>
    </h2>
  )
}

function Sidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <h4 className="font-mono text-[11px] tracking-widest text-muted-foreground">
          ON THIS PAGE
        </h4>
        <ul className="mt-4 space-y-2.5">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-foreground/70 transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <h4 className="mt-10 font-mono text-[11px] tracking-widest text-muted-foreground">
          ELSEWHERE
        </h4>
        <ul className="mt-4 space-y-2.5">
          {elsewhere.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm text-foreground/70 transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 leading-relaxed text-foreground/90">
      <span className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
      <span>{children}</span>
    </li>
  )
}

export function AboutContent() {
  return (
    <section
      id="content"
      className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 lg:grid-cols-[15rem_1fr]"
    >
      <Sidebar />

      <article className="max-w-2xl space-y-16">
        {/* Bio */}
        <div className="space-y-5">
          <SectionHeading id="bio" zh="简介" en="Bio" />
          <p className="leading-relaxed text-foreground/90">
            花海 —— 个人网站。笔记、书籍和课程。关于学习、金钱、语言和注意力。
          </p>
          <blockquote className="border-l-2 border-accent/50 pl-5">
            <p className="font-serif text-lg italic leading-relaxed text-muted-foreground">
              花开有时，绽放无期。在这里，我们记录成长，分享智慧。
            </p>
          </blockquote>
        </div>

        {/* Published */}
        <div className="space-y-5">
          <SectionHeading id="published" zh="出版书籍" en="Published" />
          <ul className="space-y-2.5">
            {publishedZh.map((t) => (
              <Bullet key={t}>{t}</Bullet>
            ))}
          </ul>
          <p className="pt-2 font-serif text-sm italic text-muted-foreground">
            English editions in rotation:
          </p>
          <ul className="space-y-2.5">
            {publishedEn.map((t) => (
              <Bullet key={t}>{t}</Bullet>
            ))}
          </ul>
        </div>

        {/* OSS books */}
        <div className="space-y-5">
          <SectionHeading id="oss-books" zh="开源书籍" en="Open source" />
          <p className="leading-relaxed text-foreground/90">
            所有开源书籍均已重新整理、编排并汇总在本站 Books 页面。
          </p>
        </div>

        {/* OSS software */}
        <div className="space-y-5">
          <SectionHeading id="oss-software" zh="开源软件" en="Open-source software" />
          <ul className="space-y-2.5">
            {ossSoftware.map((s) => (
              <Bullet key={s.name}>
                <strong className="font-semibold text-foreground">{s.name}</strong>
                <span className="text-muted-foreground"> — {s.desc}</span>
              </Bullet>
            ))}
          </ul>
          <p className="pt-2 font-serif text-sm italic text-muted-foreground">
            Claude Code plugins:
          </p>
          <ul className="space-y-2.5">
            {claudePlugins.map((s) => (
              <Bullet key={s.name}>
                <strong className="font-semibold text-foreground">{s.name}</strong>
                <span className="text-muted-foreground"> — {s.desc}</span>
              </Bullet>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div className="space-y-5">
          <SectionHeading id="community" zh="社群课程" en="Community" />
          <ul className="space-y-2.5">
            {community.map((c) => (
              <Bullet key={c}>{c}</Bullet>
            ))}
          </ul>
          <p className="pt-2 font-serif text-sm italic text-muted-foreground">
            购买渠道：微信搜索服务号「花海」，菜单内购买。
          </p>
        </div>

        {/* Investments */}
        <div className="space-y-5">
          <SectionHeading id="investments" zh="投资项目" en="Investments" />
          <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-3">
            {investments.map((inv) => (
              <div
                key={inv.name}
                className="flex flex-col border-b border-r border-border px-4 py-3"
              >
                <span className="text-sm text-foreground">{inv.name}</span>
                {inv.note ? (
                  <span className="mt-1 font-mono text-[10px] tracking-wider text-muted-foreground">
                    {inv.note}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-5">
          <SectionHeading id="contact" zh="联系方式" en="Contact" />
          <p className="leading-relaxed text-foreground/90">
            微信服务号 <strong className="font-semibold text-accent">花海</strong>
            。书籍、课程、社群的购买与入群入口均在服务号菜单。
          </p>
        </div>
      </article>
    </section>
  )
}
