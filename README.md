# Projeto 85 🟢

**PWA de treino e alimentação gamificados, com foco em recomposição corporal.**

Acompanhe seus treinos, refeições, cardio, hábitos e evolução do peso em uma interface responsiva, em português, com pontos de experiência (XP), níveis e conquistas.

## Funcionalidades

- **Treino de musculação 5 vezes por semana:** Upper A, Lower A, Push, Pull e Lower B. Registro das séries, repetições e cargas.
- **Plano alimentar:** referência ajustável de 2.450 kcal e 180 g de proteína por dia; quatro refeições sugeridas e registro de alimentos extras.
- **Gamificação:** XP por consistência, níveis e conquistas, sem premiar perda rápida de peso.
- **Progresso:** gráfico de peso, registros de cintura, acompanhamento de cardio, passos e hidratação.
- **Backup JSON:** exporte e importe os dados quando precisar trocar de dispositivo.
- **Uso offline:** service worker mantém a interface disponível após o primeiro carregamento em HTTPS.

> **Aviso:** os valores calóricos e as metas são referências iniciais, não orientação médica individualizada. Adapte-os com profissionais de saúde conforme sua evolução.

## Publicar no GitHub Pages

Não há etapa de compilação, banco de dados nem dependências externas.

1. Crie um repositório público no GitHub e envie os arquivos `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png` e `README.md` para a raiz da branch `main`.
2. Acesse **Settings → Pages** no repositório.
3. Em **Build and deployment**, escolha **Deploy from a branch**, depois **main** e **/(root)**, e clique em **Save**.
4. Abra `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/` após a publicação. Para a conta `Vinni071` e o repositório `GymApp`, o endereço esperado é `https://vinni071.github.io/GymApp/`.
5. No Android, abra o endereço no **Chrome** e use **Instalar app** ou **Adicionar à tela inicial** no menu. O navegador pode variar a opção apresentada.

O endereço só funcionará depois que o GitHub Pages estiver habilitado e a publicação terminar.

## Desenvolvimento local

Abra `index.html` diretamente no navegador para explorar a interface. Para testar instalação e cache PWA localmente, rode um servidor HTTP local, por exemplo:

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000/`. Service workers funcionam em `localhost` ou em HTTPS.

## Privacidade

- Os registros pessoais são mantidos no `localStorage` do navegador, **não são enviados ao repositório nem ao GitHub Pages**.
- O aplicativo não tem autenticação nem sincronização entre dispositivos.
- Se os dados do navegador forem apagados, os registros podem ser perdidos. Faça backups JSON periodicamente.
- Como o repositório é público, o código e as metas padrão embutidas no app ficam visíveis publicamente; **seus registros pessoais futuros não são publicados automaticamente**.

## Estrutura de arquivos

```text
Projeto85/
├── index.html              # interface, estilos e lógica
├── manifest.webmanifest    # metadados de instalação PWA
├── sw.js                   # cache para uso offline
├── icon-192.png            # ícone 192 × 192
├── icon-512.png            # ícone 512 × 512
├── README.md               # documentação do repositório
└── COMO_USAR.md            # guia detalhado em português
```

## Interface v5

A navegação foi refeita com um início visual, banner fotográfico, seletor de dias e cartões compactos. Em Treinos, toque no exercício para abrir a foto do equipamento e o registro de séries. A busca encontra exercícios por nome ou equipamento. Dieta reúne o resumo nutricional e os cartões das refeições.

Os dados continuam na chave original de armazenamento local. O redesign preserva perfil, treinos, cargas, refeições, pesagens, XP e backups. As fotos dos exercícios e o banner são incluídos no cache offline do PWA.

### Créditos das imagens

- Banner: [Unsplash](https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e). Arquivo servido localmente; fotografia ilustrativa, sem associação com o aplicativo.
- Exercícios: [free-exercise-db](https://github.com/yuhonas/free-exercise-db), sob Unlicense. Fontes individuais registradas em `EXERCISE_MEDIA` no `app.js`. Imagens ilustrativas; equipamentos podem variar entre academias.


## Animações dos exercícios

As demonstrações animadas vêm de [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset), revisão `7455efae41b330c265e7cd4b78dfa848e7ce5ebd`. As mídias permanecem em GIF, com resolução original de 180×180, disponíveis no cache offline. Fonte e identificador de cada animação constam em `EXERCISE_MEDIA` no `app.js`.

© Gym visual — https://gymvisual.com/

A licença MIT do dataset não cobre as mídias. Consulte `assets/EXERCISES-DATASET-LICENSE.txt` e `assets/EXERCISES-DATASET-NOTICE.md` e os termos da Gym visual.

A prancha usa a demonstração da versão com peso, identificada por uma nota; o plano mantém a prancha sem carga adicional. A elevação pélvica mantém a foto com banco e barra, pois não há GIF equivalente dessa variação no catálogo. As fotos anteriores são preservadas como alternativa caso alguma animação não carregue.
