-- Rebrand skill_cards content: the original deck paired stoic-philosopher
-- quotes with Bible verses (Marco Aurélio, Sêneca, Epicteto / Provérbios,
-- Eclesiastes...). That framing belonged to the old Gold Planner "builder"
-- concept; Gold Traffic's voice is modern/systems-oriented, not historical
-- or religious. Content-only update — ids, level_req, skill_name, and
-- sort_order are untouched, so existing builder_cards unlocks are unaffected.

UPDATE skill_cards SET
  stoic_quote  = 'Sistemas batem motivação. Construa o processo uma vez e deixe ele te carregar todo dia.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'Disciplina é a ponte entre um objetivo definido e um objetivo alcançado.',
  bible_ref    = 'Manual de Operação, Cap. 1'
WHERE id = 'card-01';

UPDATE skill_cards SET
  stoic_quote  = 'O que é medido, melhora. O que é ignorado, apodrece.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'Cada tarefa concluída hoje é uma métrica que ninguém vai precisar recuperar amanhã.',
  bible_ref    = 'Manual de Operação, Cap. 2'
WHERE id = 'card-02';

UPDATE skill_cards SET
  stoic_quote  = 'Toda automação boa parece lenta para construir e instantânea para usar.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'Resultado composto vence esforço isolado.',
  bible_ref    = 'Manual de Operação, Cap. 3'
WHERE id = 'card-03';

UPDATE skill_cards SET
  stoic_quote  = 'Uma métrica de cada vez. Duas prioridades são zero prioridades.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'O que não está no roadmap não está no seu radar hoje.',
  bible_ref    = 'Manual de Operação, Cap. 4'
WHERE id = 'card-04';

UPDATE skill_cards SET
  stoic_quote  = 'O dado discorda de você com mais frequência do que seu ego gostaria.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'Todo processo tem uma falha esperando ser encontrada — inclusive o seu raciocínio.',
  bible_ref    = 'Manual de Operação, Cap. 5'
WHERE id = 'card-05';

UPDATE skill_cards SET
  stoic_quote  = 'Publique a versão 1. A versão perfeita não existe fora da produção.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'Errar rápido é mais barato que planejar devagar.',
  bible_ref    = 'Manual de Operação, Cap. 6'
WHERE id = 'card-06';

UPDATE skill_cards SET
  stoic_quote  = 'Detalhe não é luxo. É a diferença entre uma ferramenta e um produto.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'Refinar o que já funciona vale tanto quanto lançar algo novo.',
  bible_ref    = 'Manual de Operação, Cap. 7'
WHERE id = 'card-07';

UPDATE skill_cards SET
  stoic_quote  = 'O log não mente. Construa como se alguém fosse auditar cada decisão.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'Um sistema confiável funciona igual quando ninguém está olhando.',
  bible_ref    = 'Manual de Operação, Cap. 8'
WHERE id = 'card-08';

UPDATE skill_cards SET
  stoic_quote  = 'Todo pipeline quebra em produção pelo menos uma vez. O que importa é o tempo de resposta.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'Consistência composta em silêncio supera esforço isolado em destaque.',
  bible_ref    = 'Manual de Operação, Cap. 9'
WHERE id = 'card-09';

UPDATE skill_cards SET
  stoic_quote  = 'A ferramenta mais poderosa é a que você não abre sem necessidade.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'Notificação não é urgência. Aprenda a diferença antes que ela aprenda por você.',
  bible_ref    = 'Manual de Operação, Cap. 10'
WHERE id = 'card-10';

UPDATE skill_cards SET
  stoic_quote  = 'Nem todo problema precisa de mais tecnologia. Alguns só precisam de um processo mais simples.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'A melhor arquitetura é a que ninguém percebe que existe.',
  bible_ref    = 'Manual de Operação, Cap. 11'
WHERE id = 'card-11';

UPDATE skill_cards SET
  stoic_quote  = 'Construa o sistema que a empresa vai precisar em dois anos, não só o que resolve hoje.',
  stoic_source = 'Gold Traffic — Princípios de Sistema',
  bible_verse  = 'Escala é o que acontece quando o processo sobrevive sem você no meio dele.',
  bible_ref    = 'Manual de Operação, Cap. 12'
WHERE id = 'card-12';
