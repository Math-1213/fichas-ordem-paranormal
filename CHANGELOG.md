# Changelog - Ordem Paranormal Ficha

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.2.0] 
- Correção no input da nacionalidade
- Criação do arquivo de regras - Esse arquivo ajuda a padronizar os nomes pelo sistema
- Implementação das regras na criação de personagem
- Melhoria na UX/UI das infos

## [1.1.2] - 2026-01-15
### Adicionado
- Script de inicialização automática (`run.bat`).
- Geração de subdomínios aleatórios para evitar conflitos no Localtunnel.
- Captura automática de IP Público para o "IP Chave".
- Suporte a Servidor de Produção usando o pacote `serve`.

### Corrigido
- Erro de leitura de JSON no Python 3.13 (ajuste de encoding para `utf-8-sig`).
- Duplicidade de arquivos de configuração (`enviroment.json` vs `environment.json`).
- Problema de cache no Vite que mantinha URLs antigas da API após o build.

### Alterado
- Otimização do fluxo de inicialização: agora o build é gerado após a atualização das configurações.
- Janelas do terminal agora iniciam minimizadas para reduzir a poluição visual.

## [1.0.0] - 2026-01-10
### Adicionado
- Estrutura base da API em Flask.
- Sistema de fichas de personagens.
- Integração inicial com Localtunnel para modo desenvolvimento.