/* ============================================================
   LUCAS EXPRESSO — SITE INSTITUCIONAL
   Arquivo: script.js

   ÍNDICE
   1.  Configurações gerais
   2.  Menu de navegação (fixo + hambúrguer)
   3.  Rolagem suave e menu ativo (scroll spy)
   4.  Animações de entrada (scroll reveal)
   5.  Galeria de fotos (filtros)
   6.  Lightbox (ampliação de imagens)
   7.  Formulário de contato (validação e envio)
   8.  Botão flutuante "voltar ao topo"
   9.  Utilitários e inicialização

   OBSERVAÇÃO: todo o código usa JavaScript puro, sem bibliotecas.
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. CONFIGURAÇÕES GERAIS
     ============================================================ */
  const CONFIG = {
    // Deslocamento (em px) considerado ao marcar o item ativo do menu
    scrollSpyOffset: 140,
    // Distância (em px) para exibir o botão "voltar ao topo"
    topoVisivelApos: 420,
    // Máscara de telefone: true para aplicar a máscara (00) 00000-0000
    mascaraTelefone: true,
    // Telefone mínimo de dígitos para validação
    telefoneDigitosMin: 10,
    // URL de envio do formulário (deixe "" para apenas validar os campos).
    // Ex.: "https://formspree.io/f/SEU-ID" ou "/api/contato"
    formularioEndpoint: ''
  };

  /* ============================================================
     2. MENU DE NAVEGAÇÃO (FIXO + HAMBÚRGUER)
     ============================================================ */
  const header   = document.getElementById('header');
  const nav      = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');

  /** Adiciona o efeito de "menu sólido" ao rolar a página. */
  function aoRolarHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }

  /** Abre ou fecha o menu mobile. */
  function alternarMenu(forcarEstado) {
    if (!nav || !hamburger) return;

    const aberto = typeof forcarEstado === 'boolean'
      ? forcarEstado
      : !nav.classList.contains('is-open');

    nav.classList.toggle('is-open', aberto);
    hamburger.classList.toggle('is-open', aberto);
    hamburger.setAttribute('aria-expanded', String(aberto));
    hamburger.setAttribute('aria-label', aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');

    // Trava a rolagem do site enquanto o menu estiver aberto
    document.body.style.overflow = aberto ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => alternarMenu());
  }

  // Fecha o menu ao clicar em qualquer link do menu
  if (nav) {
    nav.addEventListener('click', (evento) => {
      if (evento.target.closest('a')) alternarMenu(false);
    });
  }

  // Fecha o menu com a tecla Escape
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && nav && nav.classList.contains('is-open')) {
      alternarMenu(false);
      if (hamburger) hamburger.focus();
    }
  });

  // Ao redimensionar para telas maiores, garante que o menu seja fechado
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) alternarMenu(false);
  });

  /* ============================================================
     3. ROLAGEM SUAVE E MENU ATIVO (SCROLL SPY)
     ============================================================ */

  // A rolagem suave é feita pelo CSS (html { scroll-behavior: smooth }).
  // Aqui garantimos o fechamento do menu e o foco correto para acessibilidade.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (evento) => {
      const idAlvo = link.getAttribute('href');
      if (!idAlvo || idAlvo === '#') return;

      const alvo = document.querySelector(idAlvo);
      if (!alvo) return;

      evento.preventDefault();
      alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Atualiza a URL sem "pular" a página
      if (history.pushState) {
        history.pushState(null, '', idAlvo);
      }

      // Move o foco para a seção (acessibilidade por teclado)
      alvo.setAttribute('tabindex', '-1');
      alvo.focus({ preventScroll: true });
    });
  });

  /** Destaca no menu o link da seção atualmente visível. */
  function iniciarScrollSpy() {
    const secoes = document.querySelectorAll('main section[id]');
    const links  = document.querySelectorAll('.nav__link');
    if (!secoes.length || !links.length) return;

    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        const id = entrada.target.id;
        links.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    }, {
      // Considera a seção ativa quando ela cruza a parte superior da tela
      rootMargin: '-' + CONFIG.scrollSpyOffset + 'px 0px -55% 0px',
      threshold: 0
    });

    secoes.forEach((secao) => observador.observe(secao));
  }

  /* ============================================================
     4. ANIMAÇÕES DE ENTRADA (SCROLL REVEAL)
     ============================================================ */
  function iniciarReveal() {
    const elementos = document.querySelectorAll('.reveal');
    if (!elementos.length) return;

    // Se o navegador não suportar IntersectionObserver, mostra tudo
    if (!('IntersectionObserver' in window)) {
      elementos.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observador = new IntersectionObserver((entradas, obs) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        const elemento = entrada.target;

        // Pequeno atraso progressivo para animar os elementos em sequência
        const irmaos = elemento.parentElement
          ? Array.from(elemento.parentElement.children).filter((el) => el.classList.contains('reveal'))
          : [];
        const indice = irmaos.indexOf(elemento);
        elemento.style.transitionDelay = (indice > 0 ? Math.min(indice, 6) * 90 : 0) + 'ms';

        elemento.classList.add('is-visible');
        obs.unobserve(elemento); // Anima apenas uma vez
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    elementos.forEach((el) => observador.observe(el));
  }

  /* ============================================================
     5. GALERIA DE FOTOS (FILTROS)
     ============================================================ */
  function iniciarFiltrosGaleria() {
    const botoes  = document.querySelectorAll('.gallery__filter');
    const itens   = document.querySelectorAll('.gallery__item');
    if (!botoes.length || !itens.length) return;

    botoes.forEach((botao) => {
      botao.addEventListener('click', () => {
        const filtro = botao.dataset.filter;

        // Atualiza o botão ativo
        botoes.forEach((b) => b.classList.remove('is-active'));
        botao.classList.add('is-active');

        // Mostra ou esconde os itens conforme a categoria
        itens.forEach((item) => {
          const mostrar = filtro === 'todas' || item.dataset.category === filtro;
          item.classList.toggle('is-hidden', !mostrar);
        });
      });
    });
  }

  /* ============================================================
     6. LIGHTBOX (AMPLIAÇÃO DE IMAGENS)
     ============================================================ */
  function iniciarLightbox() {
    const lightbox = document.getElementById('lightbox');
    const imgLightbox = document.getElementById('lightbox-img');
    const legenda = document.getElementById('lightbox-caption');
    const btnAnterior = document.getElementById('lightbox-prev');
    const btnProximo = document.getElementById('lightbox-next');

    if (!lightbox || !imgLightbox) return;

    let itensVisiveis = [];
    let indiceAtual = 0;
    let elementoComFoco = null;

    /** Retorna apenas os itens visíveis da galeria (respeita os filtros). */
    function obterItensVisiveis() {
      return Array.from(document.querySelectorAll('.gallery__item:not(.is-hidden)'));
    }

    /** Abre o lightbox exibindo a imagem informada. */
    function abrir(indice) {
      itensVisiveis = obterItensVisiveis();
      if (!itensVisiveis.length) return;

      indiceAtual = (indice + itensVisiveis.length) % itensVisiveis.length;
      const item = itensVisiveis[indiceAtual];
      const imagem = item.querySelector('img');
      const textoLegenda = item.querySelector('figcaption span');

      imgLightbox.src = imagem.currentSrc || imagem.src;
      imgLightbox.alt = imagem.alt;
      if (legenda) legenda.textContent = textoLegenda ? textoLegenda.textContent : imagem.alt;

      elementoComFoco = document.activeElement;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';

      const btnFechar = lightbox.querySelector('[data-lightbox-close].lightbox__btn');
      if (btnFechar) btnFechar.focus();
    }

    /** Fecha o lightbox. */
    function fechar() {
      lightbox.hidden = true;
      imgLightbox.src = '';
      document.body.style.overflow = '';
      if (elementoComFoco) elementoComFoco.focus();
    }

    /** Navega para a próxima/anterior imagem. */
    function navegar(direcao) {
      abrir(indiceAtual + direcao);
    }

    // Clique em cada item da galeria
    document.querySelectorAll('.gallery__item').forEach((item) => {
      item.addEventListener('click', () => {
        itensVisiveis = obterItensVisiveis();
        abrir(itensVisiveis.indexOf(item));
      });

      // Permite abrir com o teclado (Enter/Espaço) — acessibilidade
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault();
          item.click();
        }
      });
    });

    // Botões de fechar (X e fundo escuro)
    lightbox.querySelectorAll('[data-lightbox-close]').forEach((botao) => {
      botao.addEventListener('click', fechar);
    });

    if (btnAnterior) btnAnterior.addEventListener('click', () => navegar(-1));
    if (btnProximo) btnProximo.addEventListener('click', () => navegar(1));

    // Controles pelo teclado
    document.addEventListener('keydown', (evento) => {
      if (lightbox.hidden) return;

      switch (evento.key) {
        case 'Escape':     fechar();          break;
        case 'ArrowLeft':  navegar(-1);       break;
        case 'ArrowRight': navegar(1);        break;
        case 'Home':       abrir(0);          break;
        case 'End':        abrir(itensVisiveis.length - 1); break;
      }
    });

    // Navegação por gesto de deslizar (telas touch)
    let toqueInicialX = 0;
    lightbox.addEventListener('touchstart', (evento) => {
      toqueInicialX = evento.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (evento) => {
      const diferenca = evento.changedTouches[0].screenX - toqueInicialX;
      if (Math.abs(diferenca) < 55) return; // Ignora toques curtos
      navegar(diferenca > 0 ? -1 : 1);
    }, { passive: true });
  }

  /* ============================================================
     7. FORMULÁRIO DE CONTATO (VALIDAÇÃO E ENVIO)
     ============================================================ */
  function iniciarFormulario() {
    const formulario = document.getElementById('form-contato');
    const feedback = document.getElementById('form-feedback');
    if (!formulario) return;

    const campos = {
      nome:     formulario.querySelector('#nome'),
      telefone: formulario.querySelector('#telefone'),
      email:    formulario.querySelector('#email'),
      assunto:  formulario.querySelector('#assunto'),
      mensagem: formulario.querySelector('#mensagem')
    };

    /** Exibe a mensagem de erro de um campo. */
    function mostrarErro(input, mensagem) {
      const wrapper = input.closest('.form__field');
      const caixaErro = wrapper.querySelector('.form__error');
      wrapper.classList.add('is-invalid');
      wrapper.classList.remove('is-valid');
      input.setAttribute('aria-invalid', 'true');
      if (caixaErro) caixaErro.textContent = mensagem;
    }

    /** Limpa a mensagem de erro e marca o campo como válido. */
    function mostrarSucessoCampo(input) {
      const wrapper = input.closest('.form__field');
      const caixaErro = wrapper.querySelector('.form__error');
      wrapper.classList.remove('is-invalid');
      wrapper.classList.add('is-valid');
      input.setAttribute('aria-invalid', 'false');
      if (caixaErro) caixaErro.textContent = '';
    }

    /** Aplica a máscara de telefone brasileiro: (00) 00000-0000 */
    function aplicarMascaraTelefone(valor) {
      const digitos = valor.replace(/\D/g, '').slice(0, 11);
      if (digitos.length <= 2)  return digitos.replace(/(\d{0,2})/, '($1');
      if (digitos.length <= 6)  return digitos.replace(/(\d{2})(\d{0,4})/, '($1) $2');
      if (digitos.length <= 10) return digitos.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      return digitos.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    if (campos.telefone && CONFIG.mascaraTelefone) {
      campos.telefone.addEventListener('input', () => {
        campos.telefone.value = aplicarMascaraTelefone(campos.telefone.value);
      });
    }

    /** Valida um único campo. Retorna true quando está preenchido corretamente. */
    function validarCampo(input) {
      const valor = input.value.trim();

      // Campo obrigatório vazio
      if (!valor) {
        mostrarErro(input, 'Este campo é obrigatório.');
        return false;
      }

      // Validações específicas
      if (input.type === 'email') {
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
        if (!emailValido) {
          mostrarErro(input, 'Informe um e-mail válido.');
          return false;
        }
      }

      if (input.type === 'tel') {
        const digitos = valor.replace(/\D/g, '');
        if (digitos.length < CONFIG.telefoneDigitosMin) {
          mostrarErro(input, 'Informe um telefone com DDD.');
          return false;
        }
      }

      if (input.id === 'nome' && valor.length < 3) {
        mostrarErro(input, 'Informe seu nome completo.');
        return false;
      }

      if (input.id === 'mensagem' && valor.length < 10) {
        mostrarErro(input, 'Escreva uma mensagem com pelo menos 10 caracteres.');
        return false;
      }

      mostrarSucessoCampo(input);
      return true;
    }

    // Valida cada campo assim que o usuário sai dele
    Object.values(campos).forEach((input) => {
      if (!input) return;
      input.addEventListener('blur', () => validarCampo(input));
      input.addEventListener('input', () => {
        // Remove o erro enquanto digita, para não "gritar" com o usuário
        const wrapper = input.closest('.form__field');
        if (wrapper && wrapper.classList.contains('is-invalid')) {
          wrapper.classList.remove('is-invalid');
        }
      });
    });

    /** Exibe a mensagem geral (sucesso, erro ou aviso). */
    function exibirFeedback(tipo, texto) {
      if (!feedback) return;
      feedback.className = 'form__feedback is-visible is-' + tipo;
      feedback.textContent = texto;
    }

    /** Envia os dados para o serviço/backend configurado. */
    async function enviarFormulario(dados) {
      // Enquanto nenhum endpoint estiver configurado, o envio real não ocorre.
      // Para ativar, preencha CONFIG.formularioEndpoint no topo deste arquivo
      // (ou o atributo action do formulário no index.html).
      const endpoint = CONFIG.formularioEndpoint || formulario.getAttribute('action');

      if (!endpoint || endpoint === '#') {
        exibirFeedback(
          'info',
          'Formulário validado com sucesso! O envio ainda não está ativo: ' +
          'configure a integração em script.js (CONFIG.formularioEndpoint) ou ' +
          'no atributo action do formulário no index.html.'
        );
        return;
      }

      try {
        const resposta = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: dados
        });

        if (resposta.ok) {
          exibirFeedback('success', 'Mensagem enviada com sucesso! Em breve entraremos em contato.');
          formulario.reset();
          Object.values(campos).forEach((input) => {
            if (!input) return;
            const wrapper = input.closest('.form__field');
            if (wrapper) wrapper.classList.remove('is-valid');
          });
        } else {
          exibirFeedback('error', 'Não foi possível enviar sua mensagem agora. Tente novamente em instantes.');
        }
      } catch (erro) {
        exibirFeedback('error', 'Falha de conexão. Verifique sua internet ou fale conosco pelo WhatsApp.');
      }
    }

    // Envio do formulário
    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();

      // Anti-spam: campo oculto preenchido = robô
      const honeypot = formulario.querySelector('[name="_honey"]');
      if (honeypot && honeypot.value) return;

      // Valida todos os campos
      let formularioValido = true;
      let primeiroErro = null;

      Object.values(campos).forEach((input) => {
        if (!input) return;
        const valido = validarCampo(input);
        if (!valido && !primeiroErro) primeiroErro = input;
        formularioValido = formularioValido && valido;
      });

      if (!formularioValido) {
        exibirFeedback('error', 'Verifique os campos destacados e tente novamente.');
        if (primeiroErro) primeiroErro.focus();
        return;
      }

      // Envia (ou orienta sobre a configuração do envio)
      const botao = formulario.querySelector('.form__submit');
      if (botao) {
        botao.disabled = true;
        botao.querySelector('.form__submit-text').textContent = 'Enviando...';
      }

      const dados = new FormData(formulario);

      enviarFormulario(dados).finally(() => {
        if (botao) {
          botao.disabled = false;
          botao.querySelector('.form__submit-text').textContent = 'Enviar mensagem';
        }
      });
    });
  }

  /* ============================================================
     8. BOTÃO FLUTUANTE "VOLTAR AO TOPO"
     ============================================================ */
  function iniciarBotaoTopo() {
    const botao = document.getElementById('btn-topo');
    if (!botao) return;

    const alternarVisibilidade = () => {
      botao.classList.toggle('is-visible', window.scrollY > CONFIG.topoVisivelApos);
    };

    botao.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', alternarVisibilidade, { passive: true });
    alternarVisibilidade();
  }

  /* ============================================================
     9. UTILITÁRIOS E INICIALIZAÇÃO
     ============================================================ */

  /** Atualiza automaticamente o ano no rodapé. */
  function atualizarAno() {
    const alvo = document.getElementById('ano-atual');
    if (alvo) alvo.textContent = new Date().getFullYear();
  }

  /** Inicializa todos os módulos quando o DOM estiver pronto. */
  function iniciar() {
    atualizarAno();
    aoRolarHeader();
    iniciarScrollSpy();
    iniciarReveal();
    iniciarFiltrosGaleria();
    iniciarLightbox();
    iniciarFormulario();
    iniciarBotaoTopo();

    // Efeito do menu ao rolar (com listener passivo para melhor desempenho)
    window.addEventListener('scroll', aoRolarHeader, { passive: true });
  }

  // Executa a inicialização assim que o documento estiver carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
