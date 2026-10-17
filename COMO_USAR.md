# PROJETO 85 — Treino e dieta gamificados

Aplicativo web feito para seu planejamento inicial de recomposição corporal:
- Peso inicial: 110 kg; meta pessoal: 85 kg.
- Musculação: 5 dias por semana (Upper A, Lower A, Push, Pull, Lower B).
- Alimentação: referência de ~2.450 kcal/dia, 180 g de proteína, 275 g de carboidratos, 70 g de gordura.
- Cardio e passos: progressivos e ajustáveis.

## Como usar imediatamente
Abra `index.html` em um navegador (Chrome, Edge, Safari ou Firefox). Os controles não precisam de conexão com a internet. Caso você use apenas o arquivo HTML isolado, ele também pode ser aberto sem os demais arquivos do pacote.

## Como instalar como aplicativo no Android
Para instalação PWA confiável, os arquivos devem estar hospedados em um site HTTPS, por exemplo GitHub Pages.
1. Crie um repositório no GitHub.
2. Envie **todos os arquivos desta pasta** para a raiz do repositório (`index.html`, `manifest.webmanifest`, `sw.js` e os ícones).
3. Nas configurações do repositório, em **Pages**, escolha publicar a branch `main` a partir da pasta `/ (root)`.
4. Abra o endereço HTTPS gerado pelo GitHub Pages no Chrome para Android.
5. No menu do Chrome, selecione **Instalar app** ou **Adicionar à tela inicial** (o texto pode variar).

O app usa cache offline quando instalado pela web e armazena registros no `localStorage` do navegador. Um link público do GitHub Pages disponibiliza os arquivos do aplicativo para quem souber o endereço; os registros locais não são enviados ao GitHub automaticamente.

## Backups e privacidade
Em **Meu perfil > Exportar backup JSON** você salva seu histórico. Para restaurar, use **Importar backup**. Os dados não são sincronizados entre dispositivos e poderão ser perdidos ao limpar dados do navegador ou usar aba anônima. Recomenda-se exportar periodicamente.

## Como funciona a gamificação
- Concluir treino: 80 XP (o mesmo treino do mesmo dia não pontua duas vezes).
- Marcar refeição: 10 XP, e bônus de 15 XP por registrar as quatro.
- Registrar cardio de 20+ minutos: 15 XP por dia.
- Atingir a meta de passos: 10 XP por dia.
- Atingir 2 L de água: 5 XP por dia (valor ajustável).
- Pesagens adicionadas: 10 XP por registro, sem premiar o peso perdido.
- A cada 250 XP: novo nível. Há oito conquistas desbloqueáveis.

## Cuidados
As calorias e os macros por refeição são estimativas ilustrativas, não cálculos clínicos. Marque uma refeição apenas se realmente a consumiu. As metas de calorias e peso são referências a ajustar conforme resultados reais e acompanhamento profissional. Evite acelerar o emagrecimento às custas de sua saúde.