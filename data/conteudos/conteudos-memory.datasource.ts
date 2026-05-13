import { enumTipoUsuario } from '../../constants/enums';
import type { Conteudo } from '../../domain/conteudos/types';

export const CONTEUDOS_MOCK: Conteudo[] = [
  {
    id: '1',
    titulo: 'Entendendo a primeira menstruação',
    resumo: 'Tudo sobre a menarca, fluxo e o que é normal.',
    conteudoCompleto:
      'A menarca é o nome dado à primeira menstruação, um marco importante no desenvolvimento feminino que geralmente ocorre entre os 10 e 15 anos. É normal que nos primeiros anos o ciclo seja irregular. Durante o período menstrual, você pode notar cólicas leves e alterações de humor. Mantenha a higiene usando absorventes adequados ao seu fluxo.',
    tag: 'menstruação',
    tipo: enumTipoUsuario.Adolescente,
  },
  {
    id: '2',
    titulo: 'Absorvente interno, externo ou coletor?',
    resumo: 'Conheça as opções e descubra qual se adapta ao seu corpo.',
    conteudoCompleto:
      'A escolha do produto menstrual é muito pessoal. O absorvente externo é o mais comum para quem acabou de menstruar. O interno oferece liberdade para esportes, mas requer atenção extra com o tempo de uso. Coletores menstruais e calcinhas absorventes são opções ecológicas. Se quiser testar o interno, comece com tamanhos "mini".',
    tag: 'menstruação',
    tipo: enumTipoUsuario.Adolescente,
  },
  {
    id: '3',
    titulo: 'O que é um fluxo menstrual muito intenso?',
    resumo: 'Saiba quando a quantidade de sangue deixa de ser normal.',
    conteudoCompleto:
      'Trocar de absorvente a cada hora, precisar usar fraldas noturnas ou ter vazamentos constantes na escola pode ser sinal de fluxo intenso (menorragia). Se isso acontece com você e vem acompanhado de fraqueza, é fundamental conversar com um responsável e agendar uma consulta médica para descartar anemias.',
    tag: 'menstruação',
    tipo: enumTipoUsuario.Adolescente,
  },
  {
    id: '4',
    titulo: 'Socorro, menstruei na escola!',
    resumo: 'Dicas práticas de como lidar com imprevistos fora de casa.',
    conteudoCompleto:
      'Primeira regra: respire. Acontece com quase todo mundo! Mantenha sempre um "kit emergência" na mochila com um absorvente extra e, se possível, uma calcinha limpa. Se vazar na roupa, amarre uma blusa na cintura. Não tenha vergonha de pedir ajuda a uma amiga, professora ou na coordenação da escola.',
    tag: 'menstruação',
    tipo: enumTipoUsuario.Adolescente,
  },
  {
    id: '5',
    titulo: 'Espinhas e hormônios: o que acontece?',
    resumo: 'Por que a pele muda tanto e como cuidar dela.',
    conteudoCompleto:
      'Durante a puberdade, o aumento de andrógenos faz as glândulas produzirem mais óleo, resultando em acne. O principal erro é espremer as espinhas! Lave o rosto duas vezes ao dia com sabonete específico e use protetor solar.',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.Adolescente,
  },
  {
    id: '6',
    titulo: 'Montando uma rotina de Skincare básica',
    resumo: 'Menos é mais! Aprenda a cuidar do rosto sem gastar muito.',
    conteudoCompleto:
      'Você não precisa de 10 passos. O básico funciona: 1) Limpeza com gel suave; 2) Hidratação com produto livre de óleo (oil-free); 3) Proteção solar. Deixe os ácidos fortes e produtos anti-idade de lado, sua pele é jovem e só precisa de proteção e limpeza.',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.Adolescente,
  },
  {
    id: '7',
    titulo: 'TPM: Lidando com a montanha-russa de humor',
    resumo: 'Por que ficamos irritadas ou tristes antes de menstruar?',
    conteudoCompleto:
      'A Tensão Pré-Menstrual é real e causada pela queda brusca de hormônios. É normal sentir vontade de chorar, irritação ou desejo por doces. Praticar exercícios físicos ajuda a liberar endorfina. Seja gentil com você mesma nesses dias.',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.Adolescente,
  },
  {
    id: '8',
    titulo: 'Camisinha: Sua melhor amiga',
    resumo: 'O único método que protege contra ISTs e gravidez.',
    conteudoCompleto:
      'A camisinha (masculina ou feminina) é inegociável. Além de prevenir uma gravidez não planejada, é o único método que bloqueia Infecções Sexualmente Transmissíveis (ISTs). Carregue sempre a sua, não dependa apenas do parceiro.',
    tag: 'contracepção',
    tipo: enumTipoUsuario.Adolescente,
  },
  {
    id: '9',
    titulo: 'Pílula anticoncepcional faz mal?',
    resumo: 'Mitos e verdades sobre o primeiro método de muitas meninas.',
    conteudoCompleto:
      'A pílula é segura quando receitada por um médico. Ela inibe a ovulação e costuma ajudar muito com cólicas fortes e espinhas. No entanto, você não deve tomar a pílula que a sua amiga usa, pois cada corpo precisa de uma dosagem específica.',
    tag: 'contracepção',
    tipo: enumTipoUsuario.Adolescente,
  },
  {
    id: '10',
    titulo: 'Clube das Garotas',
    resumo: 'Tire suas dúvidas anonimamente com outras meninas.',
    conteudoCompleto:
      'Espaço seguro para conversar sobre escola, corpo, relacionamentos e menstruação. Seja respeitosa com as dúvidas das outras.',
    tag: 'chat',
    tipo: enumTipoUsuario.Adolescente,
  },
  {
    id: '11',
    titulo: 'Sintomas do primeiro trimestre',
    resumo: 'Enjoos, sono e mudanças no corpo nas primeiras semanas.',
    conteudoCompleto:
      'O primeiro trimestre é marcado por uma explosão hormonal. O sintoma mais clássico são os enjoos matinais e um sono avassalador, pois o corpo gasta energia formando a placenta. Descanse e fracione as refeições.',
    tag: 'saúde',
    tipo: enumTipoUsuario.Gestante,
  },
  {
    id: '12',
    titulo: 'Calendário de Vacinas na Gestação',
    resumo: 'Proteja você e o seu bebê com a imunização correta.',
    conteudoCompleto:
      'Vacinas obrigatórias incluem: dTpa (difteria, tétano e coqueluche) a partir da 20ª semana, Hepatite B, Influenza (Gripe) e Covid-19. Vacinas de vírus vivo (como sarampo e rubéola) são proibidas durante a gravidez.',
    tag: 'saúde',
    tipo: enumTipoUsuario.Gestante,
  },
  {
    id: '13',
    titulo: 'Entendendo os exames do Pré-Natal',
    resumo: 'Ultrassom morfológico, curva glicêmica e exames de sangue.',
    conteudoCompleto:
      'O pré-natal é sua rede de segurança. O ultrassom morfológico do 1º e 2º trimestre avaliam a formação dos órgãos do bebê. A curva glicêmica, feita entre a 24ª e 28ª semana, é essencial para descartar Diabetes Gestacional.',
    tag: 'saúde',
    tipo: enumTipoUsuario.Gestante,
  },
  {
    id: '14',
    titulo: 'Tipos de Parto: Normal, Natural e Cesárea',
    resumo: 'Conheça as opções para tomar uma decisão informada.',
    conteudoCompleto:
      'Parto normal ocorre via vaginal e pode ter intervenções como anestesia. O natural é via vaginal sem intervenções médicas. A cesárea é uma cirurgia que salva vidas, mas por ser invasiva, exige uma recuperação mais longa. Estude as opções e monte seu plano de parto.',
    tag: 'saúde',
    tipo: enumTipoUsuario.Gestante,
  },
  {
    id: '15',
    titulo: 'Alimentação segura na gravidez',
    resumo: 'O que evitar e o que priorizar para o bebê.',
    conteudoCompleto:
      'Evite carnes mal passadas, peixes crus e laticínios não pasteurizados devido ao risco de bactérias. Priorize alimentos ricos em ferro (carnes vermelhas, espinafre) com vitamina C, e beba muita água para garantir o líquido amniótico.',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.Gestante,
  },
  {
    id: '16',
    titulo: 'Exercícios físicos na gestação',
    resumo: 'Pode malhar grávida? Descubra o que é seguro.',
    conteudoCompleto:
      'Se sua gravidez não for de risco, manter-se ativa é recomendado! Ajuda a controlar o peso e prepara o corpo para o parto. Caminhadas, natação, pilates e hidroginástica são excelentes. Evite esportes de contato e exercícios com risco de queda.',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.Gestante,
  },
  {
    id: '17',
    titulo: 'Melhores posições para dormir',
    resumo: 'Como encontrar conforto com o barrigão.',
    conteudoCompleto:
      'A partir do segundo trimestre, dormir de barriga para cima pode comprimir a veia cava e causar tonturas. A posição ideal recomendada é deitar do lado esquerdo, o que melhora o fluxo sanguíneo para a placenta. Use travesseiros entre as pernas para apoiar a lombar.',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.Gestante,
  },
  {
    id: '18',
    titulo: 'Rede de Apoio Materno',
    resumo: 'Converse com outras futuras mães.',
    conteudoCompleto:
      'Troque figurinhas sobre enxoval, sintomas e preparativos para a chegada do bebê. Juntas somos mais fortes.',
    tag: 'chat',
    tipo: enumTipoUsuario.Gestante,
  },
  {
    id: '19',
    titulo: 'Como calcular seu período fértil',
    resumo: 'Aprenda a identificar a sua janela de ovulação.',
    conteudoCompleto:
      'O período fértil é a janela em que a concepção é possível (cerca de 5 dias antes e no dia da ovulação). Observe o muco cervical: próximo à ovulação, ele fica elástico e transparente, como clara de ovo crua.',
    tag: 'menstruação',
    tipo: enumTipoUsuario.Tentante,
  },
  {
    id: '20',
    titulo: 'Entendendo a temperatura basal',
    resumo: 'A técnica do termômetro para confirmar a ovulação.',
    conteudoCompleto:
      'A temperatura basal é a temperatura do corpo em repouso absoluto. Logo após a ovulação, a progesterona faz sua temperatura subir cerca de 0.5 graus. Medindo todos os dias de manhã antes de levantar da cama, você consegue mapear se ovulou de fato.',
    tag: 'menstruação',
    tipo: enumTipoUsuario.Tentante,
  },
  {
    id: '21',
    titulo: 'Testes de ovulação de farmácia',
    resumo: 'Como funcionam as famosas fitinhas de LH.',
    conteudoCompleto:
      'Os testes de ovulação detectam o pico do hormônio LH na urina, que ocorre 24h a 36h antes do óvulo ser liberado. Diferente do teste de gravidez, o de ovulação só é positivo se a linha de teste for IGUAL ou mais escura que a linha de controle.',
    tag: 'menstruação',
    tipo: enumTipoUsuario.Tentante,
  },
  {
    id: '22',
    titulo: 'Síndrome dos Ovários Policísticos (SOP)',
    resumo: 'Como a SOP afeta a fertilidade e o que fazer.',
    conteudoCompleto:
      'A SOP causa ciclos muito irregulares e falta de ovulação crônica. O tratamento geralmente envolve mudanças no estilo de vida, controle da resistência à insulina e, em alguns casos, indutores de ovulação receitados pelo ginecologista.',
    tag: 'menstruação',
    tipo: enumTipoUsuario.Tentante,
  },
  {
    id: '23',
    titulo: 'A importância do Ácido Fólico',
    resumo: 'Por que começar a suplementação antes de engravidar.',
    conteudoCompleto:
      'O ácido fólico previne defeitos no tubo neural do embrião, que se fecha nas primeiras 4 semanas (antes mesmo de você saber que está grávida). Inicie a suplementação pelo menos 3 meses antes das tentativas.',
    tag: 'saúde',
    tipo: enumTipoUsuario.Tentante,
  },
  {
    id: '24',
    titulo: 'Exames pré-concepcionais',
    resumo: 'O check-up necessário antes de tentar engravidar.',
    conteudoCompleto:
      'Agende uma consulta para solicitar exames de sangue, checar suas vitaminas (D, B12, Ferro), sorologias (HIV, Sífilis) e atualizar a carteira de vacinação. É o momento de preparar o terreno.',
    tag: 'saúde',
    tipo: enumTipoUsuario.Tentante,
  },
  {
    id: '25',
    titulo: 'Avaliando o parceiro: O Espermatograma',
    resumo: 'A fertilidade é uma via de mão dupla.',
    conteudoCompleto:
      'Em 30 a 40% dos casos de dificuldade de engravidar, o fator é masculino. O espermatograma avalia a quantidade, mobilidade e formato dos espermatozoides. É um exame simples e fundamental após 1 ano de tentativas sem sucesso.',
    tag: 'saúde',
    tipo: enumTipoUsuario.Tentante,
  },
  {
    id: '26',
    titulo: 'Lidando com a ansiedade da espera',
    resumo: 'Estratégias para manter a saúde mental.',
    conteudoCompleto:
      'Ver testes negativos repetidos pode ser devastador. Estabeleça limites: não viva em função do ciclo. Mantenha hobbies, evite fazer testes de gravidez muito precocemente e considere apoio psicológico.',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.Tentante,
  },
  {
    id: '27',
    titulo: 'Círculo das Tentantes',
    resumo: 'Troque experiências e apoio emocional.',
    conteudoCompleto:
      'Um abraço virtual para quem está na mesma jornada. Compartilhe seus gráficos, desabafos e, em breve, seu positivo!',
    tag: 'chat',
    tipo: enumTipoUsuario.Tentante,
  },
  {
    id: '28',
    titulo: 'Como aliviar os fogachos (calorões)',
    resumo: 'Dicas práticas para lidar com as ondas de calor.',
    conteudoCompleto:
      'Fogachos afetam o "termostato" do cérebro. Para aliviar: vista-se em camadas, evite gatilhos como álcool e café à noite, e mantenha o quarto fresco. Exercícios de respiração profunda também ajudam.',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.Menopausa,
  },
  {
    id: '29',
    titulo: 'Brain Fog: O nevoeiro mental',
    resumo: 'Esquecimentos e falta de foco são normais nessa fase?',
    conteudoCompleto:
      'Sim. A queda do estrogênio afeta áreas do cérebro responsáveis pela cognição. Você pode sentir dificuldade em achar palavras. Manter-se mentalmente ativa, dormir bem e fazer exercícios aeróbicos ajuda a dissipar a "névoa".',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.Menopausa,
  },
  {
    id: '30',
    titulo: 'Exercícios de força são o novo cardio',
    resumo: 'A importância da musculação após os 50 anos.',
    conteudoCompleto:
      'Com a menopausa, a perda de massa muscular (sarcopenia) se acelera. Levantar peso não é para ficar "forte", é para preservar sua autonomia, proteger as articulações e acelerar o metabolismo.',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.Menopausa,
  },
  {
    id: '31',
    titulo: 'Terapia de Reposição Hormonal (TRH)',
    resumo: 'Para quem é indicada e quais os benefícios.',
    conteudoCompleto:
      'A TRH repõe o estrogênio perdido. Trata os fogachos, atrofia vaginal e previne osteoporose. Quando iniciada precocemente (primeiros 10 anos pós-menopausa), é muito segura para a maioria, mas exige avaliação médica individual.',
    tag: 'saúde',
    tipo: enumTipoUsuario.Menopausa,
  },
  {
    id: '32',
    titulo: 'Saúde Óssea e Prevenção de Fraturas',
    resumo: 'O impacto da menopausa nos seus ossos.',
    conteudoCompleto:
      'O estrogênio atua como um escudo para os ossos. Sem ele, a osteopenia e osteoporose podem surgir silenciosamente. A densitometria óssea é o exame padrão para diagnóstico. Aumente o aporte de cálcio e Vitamina D.',
    tag: 'saúde',
    tipo: enumTipoUsuario.Menopausa,
  },
  {
    id: '33',
    titulo: 'Ressecamento vaginal e saúde sexual',
    resumo: 'Sintomas geniturinários não precisam ser um tabu.',
    conteudoCompleto:
      'A falta de hormônio afina e resseca as paredes vaginais, causando dor na relação e aumento de infecções urinárias. O uso de hidratantes vaginais (não confundir com lubrificantes comuns) e estrogênio tópico resolvem o problema para a imensa maioria.',
    tag: 'saúde',
    tipo: enumTipoUsuario.Menopausa,
  },
  {
    id: '34',
    titulo: 'Cuidado extra com o Coração',
    resumo: 'Por que o risco de infarto aumenta após os 50 anos.',
    conteudoCompleto:
      'Enquanto menstruamos, o estrogênio protege as artérias e regula o colesterol. Na menopausa, perdemos esse escudo, igualando nosso risco cardiovascular ao dos homens. Fazer check-ups cardiológicos anuais torna-se vital.',
    tag: 'saúde',
    tipo: enumTipoUsuario.Menopausa,
  },
  {
    id: '35',
    titulo: 'Nova Fase',
    resumo: 'Compartilhe suas vivências sobre o climatério.',
    conteudoCompleto:
      'A menopausa não é o fim da linha, é o início de um novo ciclo de liberdade. Fórum focado em qualidade de vida, troca de dicas e bem-estar.',
    tag: 'chat',
    tipo: enumTipoUsuario.Menopausa,
  },
  {
    id: '36',
    titulo: 'As 4 fases do ciclo menstrual',
    resumo: 'Menstrual, folicular, ovulatória e lútea: entenda seu corpo.',
    conteudoCompleto:
      '1. Menstrual: Descamação do útero.\n2. Folicular: Estrogênio sobe, muita energia.\n3. Ovulatória: Pico de fertilidade.\n4. Lútea: Progesterona domina, preparação para gravidez ou TPM.',
    tag: 'menstruação',
    tipo: enumTipoUsuario.NaoDefinido,
  },
  {
    id: '37',
    titulo: 'Coletor Menstrual: Guia para Iniciantes',
    resumo: 'Como dobrar, colocar e higienizar sem mistérios.',
    conteudoCompleto:
      'A curva de aprendizado do coletor leva uns 3 ciclos. As dobras mais famosas são a "C" e a "Punch Down". Ferva em água por 5 minutos entre os ciclos para esterilizar. Durante o fluxo, basta lavar com água e sabão neutro.',
    tag: 'menstruação',
    tipo: enumTipoUsuario.NaoDefinido,
  },
  {
    id: '38',
    titulo: 'Guia definitivo de Métodos Contraceptivos',
    resumo: 'Pílula, DIU, implante... Conheça as opções.',
    conteudoCompleto:
      'Existem métodos de barreira (camisinha), hormonais curtos (pílula, adesivo, anel), hormonais longos (DIU hormonal, Implante) e não hormonais (DIU de Cobre/Prata). A escolha ideal depende do seu histórico de saúde e do esquecimento diário.',
    tag: 'contracepção',
    tipo: enumTipoUsuario.NaoDefinido,
  },
  {
    id: '39',
    titulo: 'Pílula do Dia Seguinte',
    resumo: 'Quando usar e como ela atua no organismo.',
    conteudoCompleto:
      'A contracepção de emergência deve ser usada apenas quando a camisinha estoura ou há falha no método. Ela não é abortiva; ela impede que a ovulação aconteça. Quanto mais rápido for tomada, maior a eficácia. Pode desregular seu ciclo seguinte.',
    tag: 'contracepção',
    tipo: enumTipoUsuario.NaoDefinido,
  },
  {
    id: '40',
    titulo: 'A importância do Exame Papanicolau',
    resumo: 'Previna o câncer de colo de útero.',
    conteudoCompleto:
      'O preventivo (Papanicolau) deve ser feito anualmente ou a cada 3 anos dependendo do resultado anterior, a partir do início da vida sexual. Ele detecta lesões causadas pelo HPV antes mesmo de virarem câncer.',
    tag: 'saúde',
    tipo: enumTipoUsuario.NaoDefinido,
  },
  {
    id: '41',
    titulo: 'Aliviando os sintomas da TPM',
    resumo: 'Exercícios e chás que ajudam nas cólicas.',
    conteudoCompleto:
      'Bolsa de água quente é sua melhor amiga por causar vasodilatação. Chás de camomila e gengibre ajudam nas náuseas e dor. Se a cólica incapacita você, procure um médico para investigar endometriose.',
    tag: 'bem-estar',
    tipo: enumTipoUsuario.NaoDefinido,
  },
  {
    id: '42',
    titulo: 'Fórum Geral de Saúde Feminina',
    resumo: 'Comunidade aberta para todas as usuárias.',
    conteudoCompleto:
      'Espaço acolhedor para tirar dúvidas, compartilhar relatos e apoiar outras mulheres.',
    tag: 'chat',
    tipo: enumTipoUsuario.NaoDefinido,
  },
];

export class MemoryConteudosDataSource {
  async listByTipoUsuario(tipoUsuario: enumTipoUsuario): Promise<Conteudo[]> {
    return CONTEUDOS_MOCK.filter((item) => item.tipo === tipoUsuario);
  }
}
