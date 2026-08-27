import Navbar from "@/components/Navbar";
import AnalyticsBeacon from "@/components/AnalyticsBeacon";
import Footer from "@/components/Footer";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { FeatureGridBlock } from "@/components/blocks/FeatureGridBlock";
import { TestimonialBlock } from "@/components/blocks/TestimonialBlock";
import { CtaBandBlock } from "@/components/blocks/CtaBandBlock";

export default function Home() {
  return (
    <>
      <AnalyticsBeacon />
      <Navbar theme="light" />
      <main className="mx-auto max-w-6xl space-y-16 px-6 pt-32 pb-20">
        <HeroBlock
          props={{
            heading: "Transforme o Caos da sua Agência em Workflows Padrão Ouro.",
            subheading:
              "O painel de controle definitivo para profissionais que precisam rastrear tarefas, alinhar a equipe e encantar clientes sem perder horas faturáveis.",
            ctaLabel: "Começar Agora",
            ctaHref: "/login",
          }}
        />

        <FeatureGridBlock
          props={{
            heading: "Centralize sua operação. Pare de perder dinheiro com processos bagunçados.",
            items: [
              {
                icon: "📋",
                title: "Kanban Intuitivo",
                description: "Organize projetos e acompanhe o progresso da equipe em tempo real.",
              },
              {
                icon: "🗂️",
                title: "Templates de Workflow",
                description: "Padronize suas entregas usando os templates de fluxo de trabalho do GOLD TRAFFIC.",
              },
              {
                icon: "🎙️",
                title: "Sincronização de Reuniões & Notas",
                description: "Mantenha as informações dos clientes documentadas e acessíveis a todos.",
              },
              {
                icon: "💰",
                title: "Finanças Integradas",
                description: "Acompanhe o lado financeiro dos seus projetos diretamente na plataforma.",
              },
            ],
          }}
        />

        <section id="depoimentos">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-ink">
            Junte-se a agências de elite que já escalam com o GOLD TRAFFIC.
          </h2>
          <TestimonialBlock
            props={{
              items: [
                {
                  quote:
                    "Desde que centralizamos tudo no GOLD TRAFFIC, nossa produtividade como equipe deu um salto — nada mais se perde entre e-mail, WhatsApp e planilha.",
                  name: "[Depoimento a definir]",
                  role: "[Cargo/Agência]",
                },
                {
                  quote:
                    "A organização mudou completamente. Cada projeto tem um lugar certo e todo mundo sabe exatamente o que fazer a seguir.",
                  name: "[Depoimento a definir]",
                  role: "[Cargo/Agência]",
                },
                {
                  quote:
                    "Nossos clientes sentem a diferença: comunicação mais fluida, menos retrabalho e entregas no prazo certo.",
                  name: "[Depoimento a definir]",
                  role: "[Cargo/Agência]",
                },
              ],
            }}
          />
        </section>

        <CtaBandBlock
          props={{
            heading: "O crescimento da sua agência exige planejamento de ouro.",
            ctaLabel: "Criar minha conta.",
            ctaHref: "/login",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
