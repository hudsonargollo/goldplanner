import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="relative bg-ink-950 border-t border-ivory/[0.08] overflow-hidden">
      <div className="absolute inset-0 grain-dark" aria-hidden />
      {/* Final CTA band */}
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo variant="ivory" className="h-5 w-auto" />
              <span className="font-mono text-sm font-bold tracking-[0.28em] text-ivory">
                GOLD PLANNER
              </span>
            </div>
            <p className="text-editorial mt-4 max-w-md text-pretty text-2xl sm:text-3xl leading-snug text-ivory">
              O futuro pertence a quem constrói hoje.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <a
              href="/login"
              className="group inline-flex items-center gap-2 rounded-lg border border-green-mist/30 bg-green-mist/10 px-6 py-3.5 text-sm font-bold text-green-mist transition-all duration-200 hover:bg-green-mist/20 hover:border-green-mist/50"
            >
              CRIAR MINHA CONTA
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <p className="font-mono text-xs tracking-wide text-sand/50">
              Leva menos de 1 minuto.
            </p>
          </div>
        </div>
      </div>

      {/* Company info + contact */}
      <div className="border-t border-ivory/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5 font-mono text-[11px] tracking-wide text-sand/40">
            <p className="text-sand/60">GOLD PLANNER</p>
            {/* TODO: real legal entity name + CNPJ before this goes live to customers */}
            <p>Razão Social: [preencher]</p>
            <p>CNPJ: [preencher]</p>
          </div>
          <div className="flex flex-col gap-2.5 font-mono text-[11px] tracking-wide text-sand/40">
            {/* TODO: real Instagram/LinkedIn accounts for Gold Planner */}
            <a
              href="mailto:contato@goldplanner.clubemkt.digital"
              className="inline-flex items-center gap-2 transition-colors hover:text-green-mist"
            >
              <Mail className="h-3.5 w-3.5" /> contato@goldplanner.clubemkt.digital
            </a>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-ivory/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <p className="font-mono text-xs tracking-wide text-sand/40">
            © 2026 GOLD PLANNER · Consultoria de Tecnologia &amp; Negócios
          </p>
          <div className="flex items-center gap-4 font-mono text-[11px] tracking-wide text-sand/40">
            <Link href="/politica-de-privacidade" className="transition-colors hover:text-green-mist">
              Política de privacidade
            </Link>
            <span className="text-sand/20">·</span>
            <Link href="/termos-de-uso" className="transition-colors hover:text-green-mist">
              Termos de uso
            </Link>
          </div>
          <p className="font-mono text-[11px] tracking-wide text-sand/25">
            built in the dark
          </p>
        </div>
      </div>
    </footer>
  );
}
