export const Mock = [
  // title = título do evento, espaço ou informativo
  // data = data do evento ou informativo
  // imagem = pode ser uma URL ou um require de uma imagem local
  // descriptionCard = descrição do informativo no card
  // descriptionModal = descrição detalhada do informativo no modal
  {
    id: "1",
    name: "Eventos",
    items: [
      {
        id: "1",
        title: "Oficina de Jardinagem",
        data: "2025-09-15",
        imagem: "",
      },
      {
        id: "2",
        title: "Piquenique Comunitário",
        data: "2025-10-20",
        imagem: "",
      },
      {
        id: "3",
        title: "Jogos Abertos do Parána",
        data: "2025-11-28",
        imagem: require("../assets/imagens/jogos_do_parana_2025.png"),
        local: [{Espaços: "Complexo Esportivo Roberto Brzezinski"}],
        descriptionModal: "Os Jogos Abertos do Paraná são uma celebração anual do esporte que reúne atletas de todas as regiões do estado. Com competições em diversas modalidades.",
      },
    ],
  },
  {
    id: "2",
    name: "Espaços",
    items: [
      {
        id: "1",
        title: "Praça Central (Catedral São José)",
        imagem: require("../assets/imagens/praca.jpeg"),
      },
      {
        id: "2",
        title: "Complexo Esportivo Roberto Brzezinski",
        imagem: require("../assets/imagens/estadio.jpg"),
      },
      {
        id: "3",
        title: "Ginásio De Esportes Vila Urupês",
        imagem: require("../assets/imagens/ginasio.jpg"),
      },
      {
        id: "4",
        title: "Parque do Lago",
        imagem: require("../assets/imagens/lago.jpg"),
      },
    ],
  },
  {
    id: "3",
    name: "Atividades",
    items: [
      {
        id: "1",
        title: "Aula de Dança",
        descriptionCard:
          "Venha aprender passos de dança variados em nossas aulas semanais.",
        descriptionModal:
          "Nossas aulas de dança são abertas para todas as idades e níveis de habilidade. Ministradas por instrutores experientes, as aulas cobrem diversos estilos, incluindo salsa, forró, dança contemporânea e hip-hop. Traga sua energia e prepare-se para se divertir enquanto aprende novos movimentos!",
      },
      {
        id: "2",
        title: "Treino de Atletismo",
        descriptionCard:
          "Participe dos nossos treinos de atletismo para melhorar sua resistência e velocidade.",
        descriptionModal:
          "Os treinos de atletismo são projetados para corredores de todos os níveis, desde iniciantes até atletas experientes. Nossos treinadores especializados focam em técnicas de corrida, fortalecimento muscular e estratégias de competição. Junte-se a nós para alcançar seus objetivos atléticos em um ambiente motivador e de apoio.",
      },
      {
        id: "3",
        title: "Yoga ao Ar Livre",
        descriptionCard:
          "Relaxe e rejuvenesça com nossas sessões de yoga ao ar livre em ambientes tranquilos.",
        descriptionModal:
          "Nossas sessões de yoga ao ar livre são realizadas em parques e áreas verdes, proporcionando um ambiente sereno para a prática. As aulas são adequadas para todos os níveis, desde iniciantes até praticantes avançados. Venha experimentar os benefícios do yoga, incluindo aumento da flexibilidade, redução do estresse e melhoria do bem-estar geral.",
      },
    ],
  },
  {
    id: "4",
    name: "Informativos",
    items: [
      {
        id: "1",
        title: "Novas Regras para Uso dos Espaços Públicos",
        descriptionCard:
          "Saiba mais sobre as novas diretrizes para utilização dos espaços comunitários.",
        data: "2025-08-01",
        descriptionModal:
          "Com o objetivo de garantir a segurança e o bem-estar de todos os cidadãos, a prefeitura implementou novas regras para o uso dos espaços públicos. É obrigatório o uso de máscaras em áreas fechadas, manter o distanciamento social e respeitar os horários de funcionamento estabelecidos. Para mais informações, visite o site oficial da prefeitura ou entre em contato com a Secretaria de Cultura e Lazer.",
      },
    ],
  },
];
